/* 마크다운 → HTML 변환기 (한국어판)
 *
 * 의존성 (CDN):
 *  - marked  : 마크다운 → HTML 파서
 *  - DOMPurify : XSS 방어 sanitize
 *  - highlight.js : 코드 블록 하이라이팅
 */

(function () {
  "use strict";

  const STORAGE_KEY = "md2html-kr:input";
  const THEME_KEY = "md2html-kr:theme";
  const DEBOUNCE_MS = 120;

  const $ = (sel) => document.querySelector(sel);
  const input = $("#markdown-input");
  const preview = $("#preview");
  const sourceEl = $("#source");
  const sourceCode = $("#source-code");
  const charCount = $("#char-count");
  const tabs = document.querySelectorAll(".tab");
  const toast = $("#toast");

  // marked 설정 (GFM + breaks + highlight)
  const renderer = new marked.Renderer();
  renderer.link = (href, title, text) => {
    const safeHref = String(href || "").trim();
    const safe = /^(https?:|mailto:|#|\/)/i.test(safeHref) ? safeHref : "#";
    const t = title ? ` title="${escapeHtml(title)}"` : "";
    return `<a href="${escapeHtml(safe)}"${t} rel="noopener noreferrer" target="_blank">${text}</a>`;
  };

  marked.setOptions({
    gfm: true,
    breaks: true,
    renderer,
    highlight: (code, lang) => {
      if (window.hljs && lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(code, { language: lang }).value;
        } catch (_) {}
      }
      return escapeHtml(code);
    },
  });

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function render(md) {
    const raw = marked.parse(md || "");
    const clean = DOMPurify.sanitize(raw, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "rel"],
    });
    preview.innerHTML = clean;
    sourceCode.textContent = clean;
    if (window.hljs) {
      hljs.highlightElement(sourceCode);
      preview.querySelectorAll("pre code").forEach((el) => {
        try {
          hljs.highlightElement(el);
        } catch (_) {}
      });
    }
  }

  function updateCharCount(value) {
    const n = value.length.toLocaleString("ko-KR");
    charCount.textContent = `${n}자`;
  }

  let pending = null;
  function scheduleRender() {
    if (pending) cancelAnimationFrame(pending);
    pending = requestAnimationFrame(() => {
      const value = input.value;
      updateCharCount(value);
      render(value);
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch (_) {}
    });
  }

  let debounceId = null;
  input.addEventListener("input", () => {
    if (debounceId) clearTimeout(debounceId);
    debounceId = setTimeout(scheduleRender, DEBOUNCE_MS);
  });

  // 탭 전환 (미리보기 ↔ 소스)
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const which = tab.dataset.tab;
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });
      const showPreview = which === "preview";
      preview.classList.toggle("is-active", showPreview);
      preview.hidden = !showPreview;
      sourceEl.classList.toggle("is-active", !showPreview);
      sourceEl.hidden = showPreview;
    });
  });

  // 복사 / 다운로드
  $("#copy-html").addEventListener("click", async () => {
    const html = sourceCode.textContent;
    try {
      await navigator.clipboard.writeText(html);
      showToast("HTML이 복사되었습니다");
    } catch (_) {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = html;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        showToast("HTML이 복사되었습니다");
      } catch (e) {
        showToast("복사에 실패했습니다");
      }
      ta.remove();
    }
  });

  $("#download-html").addEventListener("click", () => {
    const fullDoc = wrapFullHtml(sourceCode.textContent);
    const blob = new Blob([fullDoc], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `markdown-${timestamp()}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("다운로드를 시작합니다");
  });

  function wrapFullHtml(body) {
    return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>변환된 문서</title>
<style>
  body { font-family: -apple-system, "Pretendard", sans-serif; max-width: 760px; margin: 2.5rem auto; padding: 0 1.25rem; line-height: 1.7; color: #1f2937; }
  pre { background: #0f172a; color: #e2e8f0; padding: 1rem; border-radius: 8px; overflow-x: auto; }
  code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #e5e7eb; padding: 0.5rem 0.75rem; text-align: left; }
  blockquote { border-left: 4px solid #c4b5fd; margin: 0; padding: 0.25rem 1rem; color: #4b5563; background: #f5f3ff; }
</style>
</head>
<body>
${body}
</body>
</html>`;
  }

  function timestamp() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return (
      d.getFullYear() +
      pad(d.getMonth() + 1) +
      pad(d.getDate()) +
      "-" +
      pad(d.getHours()) +
      pad(d.getMinutes())
    );
  }

  // 토스트
  let toastId = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-visible");
    if (toastId) clearTimeout(toastId);
    toastId = setTimeout(() => toast.classList.remove("is-visible"), 1800);
  }

  // 샘플 / 초기화
  let sampleCache = null;
  async function loadSample() {
    if (sampleCache) return sampleCache;
    try {
      const r = await fetch("sample.md", { cache: "no-store" });
      if (!r.ok) throw new Error("sample.md fetch failed");
      sampleCache = await r.text();
    } catch (_) {
      sampleCache = `# 안녕하세요\n\n*마크다운*을 입력하면 **HTML**로 변환됩니다.\n\n- 항목 1\n- 항목 2\n\n\`\`\`js\nconsole.log("hi");\n\`\`\`\n`;
    }
    return sampleCache;
  }

  $("#load-sample").addEventListener("click", async () => {
    const text = await loadSample();
    input.value = text;
    scheduleRender();
    showToast("샘플을 불러왔습니다");
  });

  $("#clear-input").addEventListener("click", () => {
    input.value = "";
    scheduleRender();
    showToast("입력을 초기화했습니다");
  });

  // 테마 토글
  const themeBtn = $("#toggle-theme");
  const lightHljs = $("#hljs-light");
  const darkHljs = $("#hljs-dark");

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    themeBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
    const label = isDark ? "라이트 모드로 전환" : "다크 모드로 전환";
    themeBtn.setAttribute("aria-label", label);
    themeBtn.setAttribute("title", label);
    const themeIcon = themeBtn.querySelector(".theme-icon");
    if (themeIcon) themeIcon.textContent = isDark ? "☀" : "☾";
    const themeLabel = themeBtn.querySelector(".theme-label");
    if (themeLabel) themeLabel.textContent = label;
    if (lightHljs && darkHljs) {
      lightHljs.disabled = isDark;
      darkHljs.disabled = !isDark;
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {}
  }

  themeBtn.addEventListener("click", () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  // 초기 부팅
  (async function init() {
    let stored = "";
    try {
      stored = localStorage.getItem(STORAGE_KEY) || "";
    } catch (_) {}

    if (!stored) {
      stored = await loadSample();
    }
    input.value = stored;

    let savedTheme = "light";
    try {
      savedTheme = localStorage.getItem(THEME_KEY) || "light";
    } catch (_) {}
    if (savedTheme === "dark") applyTheme("dark");
    else applyTheme("light");

    scheduleRender();
  })();
})();
