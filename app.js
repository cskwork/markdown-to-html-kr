/* 
 * 마크다운 ➔ HTML 변환기 — 프리미엄 스크립트 엔진
 * 드래그 분할 레이아웃, 서식 있는 복사(Rich Copy), 한국어 통계 분석기, 4종 프리미엄 다운로드 테마
 */

(function () {
  "use strict";

  // 로컬 스토리지 키 정의
  const STORAGE_KEY = "md2html-kr:input";
  const APP_THEME_KEY = "md2html-kr:app-theme";
  const PREVIEW_THEME_KEY = "md2html-kr:preview-theme";
  const DEBOUNCE_MS = 100;

  // DOM 유틸리티
  const $ = (sel) => document.querySelector(sel);
  
  // DOM 요소 선택
  const input = $("#markdown-input");
  const preview = $("#preview");
  const sourceEl = $("#source");
  const sourceCode = $("#source-code");
  const tabs = document.querySelectorAll(".tab");
  const toast = $("#toast");
  const workspace = $("#workspace");
  const paneInput = $("#pane-input");
  const splitDivider = $("#split-divider");
  
  // 헤더 툴바 컨트롤
  const templateSelect = $("#template-select");
  const importBtn = $("#import-btn");
  const fileInput = $("#file-input");
  const clearBtn = $("#clear-input");
  const themeToggleBtn = $("#toggle-theme");
  
  // 프리뷰 테마 셀렉터
  const previewThemeSelect = $("#preview-theme-select");
  
  // 복사 및 다운로드
  const copyHtmlBtn = $("#copy-html");
  const copyRichBtn = $("#copy-rich");
  const downloadHtmlBtn = $("#download-html");
  
  // 전체화면 토글 버튼
  const fullscreenButtons = document.querySelectorAll(".btn-fullscreen");

  // 통계 디스플레이
  const statChars = $("#stat-chars");
  const statWords = $("#stat-words");
  const statLines = $("#stat-lines");
  const statTime = $("#stat-time");

  // 4종 한국어 맞춤 마크다운 템플릿 정의
  const TEMPLATES = {
    basic: `# 🚀 마크다운 ➔ HTML 프리미엄 변환기

이곳에 **마크다운(Markdown)** 문서를 입력하면, 우측에서 *실시간*으로 깔끔하게 변환된 HTML 미리보기가 생성됩니다!

---

## 🎨 4가지 스타일 테마 제공
우측 상단의 테마 드롭다운을 통해 출력 결과의 **디자인 스타일**을 자유롭게 변경할 수 있습니다:
1. **GitHub 스타일**: 개발자에게 친숙한 공식 GFM(GitHub Flavored Markdown) 테마
2. **모던 미니멀**: 여백이 강조된 깔끔한 영문 Inter & 한글 Pretendard 모던 테마
3. **따뜻한 세피아**: 오랜 독서에도 눈이 편안한 솔라라이즈드 미색 종이 질감 테마
4. **클래식 세리프**: 에디토리얼 명조 서체가 적용된 격식 있는 아날로그 매거진 테마

> 💡 **다운로드 꿀팁!**
> 선택된 스타일 테마는 HTML 다운로드 시 **문서 내부에 자동으로 포함**되어 저장됩니다. 내보낸 파일도 웹 브라우저에서 동일한 스타일로 열립니다!

---

## 🛠️ 주요 생산성 도구
- **서식 복사**: 단순 HTML 텍스트가 아닌, 스타일이 입혀진 **서식 있는 텍스트(Rich Text)**로 클립보드에 복사되어 **Notion, Gmail, MS Word, Slack**에 복사-붙여넣기 시 서식이 완벽 유지됩니다.
- **가져오기 (.md)**: 사용자가 가지고 있는 로컬 마크다운(\`.md\`, \`.txt\`) 파일을 직접 업로드하여 편집할 수 있습니다.
- **실시간 문서 통계**: 한국어 읽기 속도(분당 300자) 분석을 포함한 실시간 자수/단어수/라인수 통계를 제공합니다.
- **유연한 레이아웃**: 가운데 세로 구분선(디바이더)을 마우스나 터치로 좌우 드래그하여 에디터 영역 비율을 변경해 보세요.

---

## 📊 표 및 체크리스트 예시

| 기능명 | 지원 여부 | 프리미엄 여부 |
| :--- | :---: | :---: |
| 실시간 렌더링 (Debounced) | ✔ 지원됨 | ✨ 프리미엄 |
| XSS 보안 정화 (DOMPurify) | ✔ 지원됨 | ✨ 안전함 |
| 드래그 레이아웃 조절 | ✔ 지원됨 | ✨ 고급 기능 |
| 서식 포함 클립보드 복사 | ✔ 지원됨 | ✨ 독점 기능 |

- [x] HTML 코드 복사 및 다운로드
- [x] 실시간 자수 및 읽는 속도 통계
- [ ] 내가 쓴 마크다운으로 책 한 권 완성하기

---

## 💻 코드 하이라이트 (syntax highlighting)

\`\`\`javascript
// 실시간 통계 계산 로직 일부
function calculateStatistics(text) {
  const chars = text.length;
  const lines = text ? text.split('\\n').length : 0;
  const cleanText = text.replace(/[#*_\\-\`|\\[\\]()]/g, '');
  const words = cleanText.trim().split(/\\s+/).filter(w => w.length > 0).length;
  const readMinutes = Math.ceil(chars / 300); // 한국어 분당 300자 기준
  
  return { chars, words, lines, readMinutes };
}
\`\`\`
`,
    
    resume: `# 📄 [이력서] 홍길동 (HONG GILDONG)
> **끊임없이 학습하며 직관적인 사용자 경험을 빚어내는 3년 차 프론트엔드 엔지니어입니다.**

---

## 🛠️ Tech Stacks
* **Frontend**: HTML5, CSS3, JavaScript (ES6+), React, Next.js, TypeScript, TailwindCSS
* **State & Build**: Redux Toolkit, React Query, Webpack, Vite
* **Tools & Devops**: Git, GitHub, Docker, AWS S3, Vercel

---

## 💼 Work Experience

### **(주)미래정보기술 — 프론트엔드 개발자**
*2024.03 ~ 현재 (재직 중)*
- **주요 성과**:
  - 기업용 관리자 대시보드 시스템(React)의 UI 컴포넌트 라이브러리 설계 및 구축.
  - 레거시 코드 리팩토링 및 가상 스크롤(Virtual Scroll) 도입을 통한 대용량 데이터 로딩 렌더링 성능 **45% 개선**.
  - 프론트엔드 유닛 테스트 커버리지 **80% 확보** 및 빌드 스피드 향상.

### **스타트업 에이비씨디 — 주니어 개발자**
*2023.01 ~ 2024.02 (1년 2개월)*
- **주요 성과**:
  - 커머스 서비스(Next.js) 신규 프론트엔드 기능 개발 및 접근성(A11y) 가이드 준수.
  - 검색 페이지의 다이내믹 필터 연동 성능 튜닝 및 이미지 지연 로딩 최적화로 **LCP 성능 1.2초 단축**.

---

## 🎓 Education
- **한국대학교** 컴퓨터공학부 학사 졸업 (2019.03 ~ 2023.02)
- **부트캠프 코드스쿼드** 웹 프론트엔드 과정 수료 (2022.07 ~ 2022.12)

---

## 🏆 Certifications & Awards
- **정보처리기사** (한국산업인력공단, 2023.06)
- **오픈소스 컨트리뷰톤** 프론트엔드 부문 우수상 수상 (과학기술정보통신부, 2022.11)
`,

    report: `# 📋 주간 업무 보고 및 회의록

**회의 일시**: 2026년 5월 24일 (월요일) 10:00 ~ 11:30  
**참석자**: 김철수(PM), 이영희(FE), 박민수(BE), 최지원(QA)  
**회의 장소**: 화상 회의실 (Zoom)

---

## 🎯 이번 주 스프린트 핵심 마일스톤

> 💡 **주요 목표**: 버전 1.2 정식 릴리즈 배포 준비 및 안정성 검증

### 1. 프론트엔드 (FE) 파트
- [x] 반응형 분할 화면 드래그 디바이더 인터페이스 버그 픽스
- [x] 서식 복사 클립보드 ClipboardItem 복사 예외 처리 보완
- [ ] 다크모드/라이트모드 전체화면 시 CSS 그림자 렌더링 최적화

### 2. 백엔드 (BE) 파트
- [x] 정적 HTML 익스포트 API 보안 인증 리팩토링
- [x] 동시 동기화 요청 처리를 위한 Redis 세션 성능 스케일업
- [ ] 데이터베이스 인덱스 튜닝 및 느린 쿼리 최적화

---

## 📊 부서별 업무 진척도 현황

| 부서 | 담당 작업 | 진척율 | 현황 |
| :--- | :--- | :---: | :---: |
| **PM** | 서비스 기획서 v1.2 확정 및 QA 시나리오 싱크 | 100% | **완료** |
| **FE** | 신규 글래스모피즘 UI 통합 및 반응형 검증 | 90% | **진행중** |
| **BE** | 대용량 백엔드 트래픽 병목 쿼리 개선 | 75% | **진행중** |
| **QA** | 전체 마크다운 파싱 시나리오 회귀 테스트 수행 | 50% | **진행중** |

---

## 📢 차주 주요 논의 및 결정 필요 사항
1. **Lighthouse 접근성 스코어 95+ 달성 계획**: 스크린 리더용 아리아 라벨 마크업 표준화 검토.
2. **배포 일정 조율**: QA 회귀 테스트 결과에 따른 롤백 플랜 수립 여부 확정.
`,

    blog: `# 💡 웹 성능을 결정짓는 핵심 지표 LCP와 최적화 전략

*작성일: 2026.05.23 | 카테고리: Web Development | 작성자: Tech Writer*

---

사용자가 웹사이트를 방문했을 때 "이 사이트는 정말 빠르다!"라고 느끼게 만드는 요소는 무엇일까요? 과거에는 단순 로딩 완료 시간(Window Load Event)을 기준으로 삼았지만, 현대 웹에서는 사용자가 **실제 느끼는 시각적 안정성과 체감 속도**를 훨씬 중요하게 생각합니다.

그 중심에 서 있는 것이 바로 **LCP (Largest Contentful Paint)** 지표입니다.

---

## 1. LCP (Largest Contentful Paint) 란 무엇인가?

LCP는 구글의 Core Web Vitals 중 하나로, **페이지가 로드되기 시작한 시점부터 뷰포트 내에 있는 가장 큰 텍스트 블록이나 이미지 엘리먼트가 화면에 렌더링될 때까지의 시간**을 측정합니다.

> 📌 **LCP의 기준 범위**
> - **Good (우수)**: 2.5초 이하
> - **Needs Improvement (개선 필요)**: 2.5초 초과 ~ 4.0초 이하
> - **Poor (매우 미흡)**: 4.0초 초과

---

## 2. 주요 병목 원인과 최적화 전략

LCP 성능을 저하시키는 가장 흔한 3가지 요소와 그 해결책은 다음과 같습니다.

### A. 느린 서버 응답 시간 (TTFB 지연)
서버가 자원을 전달하는 속도가 느리면 화면 렌더링도 늦어집니다.
- **해결책**: 데이터베이스 쿼리를 최적화하거나, CDN을 활용하여 캐시된 데이터를 전송하고, 가까운 물리 서버에서 요청을 처리하도록 구성합니다.

### B. 렌더 차단 리소스 (JS & CSS)
HTML 본문을 파싱하기 전에 큰 크기의 동기적 스크립트나 스타일시트를 로드하면 브라우저는 화면을 그리지 못하고 멈춥니다.

\`\`\`html
<!-- ❌ 좋지 않은 방법 (렌더링을 차단함) -->
<script src="heavy-library.js"></script>

<!-- 🚀 권장하는 방법 (비동기 및 지연 로딩 수행) -->
<script src="heavy-library.js" defer></script>
\`\`\`

### C. 이미지 용량 및 로딩 우선순위 미흡
화면에서 가장 넓은 영역을 차지하는 요소가 보통 '히어로 이미지'인 경우가 많습니다.
- **해결책**: WebP, AVIF 등의 차세대 이미지 포맷을 적용하고, \`fetchpriority="high"\` 속성을 명시하여 다른 자원보다 먼저 다운로드되도록 지정합니다.

\`\`\`html
<img src="hero.webp" alt="메인 이미지" fetchpriority="high">
\`\`\`

---

## 3. 마치며

LCP 최적화는 단순히 구글의 검색 상위 노출(SEO)을 위해서만 필요한 것이 아닙니다. 이 지표를 관리하면 이탈률이 급감하고 사용자 전환율이 높아지는 비즈니스적 쾌거를 동시에 거둘 수 있습니다. 오늘 당장 우리 사이트의 크롬 개발자 도구의 Lighthouse 탭을 열고 측정해 보세요!
`
  };

  // marked.js 렌더러 정의 (커스텀 앵커 타겟 및 XSS 보호 지원)
  const renderer = new marked.Renderer();
  renderer.link = (href, title, text) => {
    const safeHref = String(href || "").trim();
    // 안전한 프로토콜 검사
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

  // HTML 이스케이프 함수
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // 실시간 마크다운 파싱 및 프리뷰/소스코드 주입
  function render(md) {
    const raw = marked.parse(md || "");
    const clean = DOMPurify.sanitize(raw, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "rel"],
    });
    
    // 프리뷰와 소스코드 영역 갱신
    preview.innerHTML = clean;
    sourceCode.textContent = clean;
    
    // highlight.js 코드 블록 구문 하이라이트 트리거
    if (window.hljs) {
      hljs.highlightElement(sourceCode);
      preview.querySelectorAll("pre code").forEach((el) => {
        try {
          hljs.highlightElement(el);
        } catch (_) {}
      });
    }
  }

  // 글자수, 단어수, 라인수, 읽기 예상 속도 통계 계산
  function updateStatistics(value) {
    const charCount = value.length;
    statChars.textContent = charCount.toLocaleString("ko-KR");
    
    const lines = value ? value.split('\n').length : 0;
    statLines.textContent = lines.toLocaleString("ko-KR");

    // 마크다운 문장 부호들을 제거한 본문 단어 추출
    const cleanText = value.replace(/[#*_\-`|\[\]()]/g, '');
    const words = cleanText.trim().split(/\s+/).filter(w => w.length > 0).length;
    statWords.textContent = words.toLocaleString("ko-KR");

    // 한국어 읽기 속도 (분당 약 300글자 읽기 기준)
    const readMinutes = Math.ceil(charCount / 300);
    statTime.textContent = readMinutes > 1 ? `${readMinutes}분` : "1분 미만";
  }

  // requestAnimationFrame 기반 디바운스 렌더 스케줄러
  let pending = null;
  function scheduleRender() {
    if (pending) cancelAnimationFrame(pending);
    pending = requestAnimationFrame(() => {
      const value = input.value;
      updateStatistics(value);
      render(value);
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch (_) {}
    });
  }

  // 에디터 입력 시 실시간 업데이트 감지
  let debounceId = null;
  input.addEventListener("input", () => {
    if (debounceId) clearTimeout(debounceId);
    debounceId = setTimeout(scheduleRender, DEBOUNCE_MS);
  });

  // 탭 전환 (미리보기 ↔ 소스코드)
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

      // 미리보기 탭일 때만 스타일 테마 셀렉터 노출
      const themeSelectorBox = $("#theme-selector-box");
      if (themeSelectorBox) {
        themeSelectorBox.style.display = showPreview ? "block" : "none";
      }
    });
  });

  // 복사 기능 1: HTML 순수 코드 복사
  copyHtmlBtn.addEventListener("click", async () => {
    const html = sourceCode.textContent;
    try {
      await navigator.clipboard.writeText(html);
      showToast("HTML 소스코드가 클립보드에 복사되었습니다!");
    } catch (_) {
      // 구형 브라우저 대체 텍스트 영역 복사
      const ta = document.createElement("textarea");
      ta.value = html;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        showToast("HTML 소스코드가 복사되었습니다!");
      } catch (e) {
        showToast("클립보드 복사에 실패했습니다.");
      }
      ta.remove();
    }
  });

  // 복사 기능 2: 스타일 포함 서식 복사 (Rich Text Copy)
  // 노션, Gmail, 워드 등 서식 인식이 필요한 앱 전용
  copyRichBtn.addEventListener("click", async () => {
    const html = preview.innerHTML;
    const plainText = preview.textContent;
    
    // 가져갈 때 기본 폰트 패밀리만 스타일 속성에 입혀 깔끔히 전송
    const styledHtml = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Pretendard', sans-serif; line-height: 1.7; color: #1f2937;">${html}</div>`;
    
    try {
      const htmlBlob = new Blob([styledHtml], { type: "text/html" });
      const textBlob = new Blob([plainText], { type: "text/plain" });
      
      const clipboardItem = new ClipboardItem({
        "text/html": htmlBlob,
        "text/plain": textBlob
      });
      
      await navigator.clipboard.write([clipboardItem]);
      showToast("스타일이 내장된 서식(Rich Text) 복사 완료! (노션/워드 붙여넣기용)");
    } catch (err) {
      console.error("서식 복사 에러:", err);
      showToast("서식 복사를 지원하지 않는 환경입니다. HTML 복사를 이용해 주세요.");
    }
  });

  // 다운로드 기능: 스타일이 내장된 독립 실행형 HTML 파일 다운로드
  downloadHtmlBtn.addEventListener("click", () => {
    const currentTheme = previewThemeSelect.value;
    const bodyContent = sourceCode.textContent;
    const fullHtmlDocument = wrapFullHtml(bodyContent, currentTheme);
    
    const blob = new Blob([fullHtmlDocument], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `markdown-${timestamp()}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("스타일이 적용된 HTML 다운로드 시작!");
  });

  // 4종 다운로드 스타일시트 번들 매핑
  const DOWN_THEME_CSS = {
    github: `
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; max-width: 820px; margin: 3rem auto; padding: 0 1.5rem; line-height: 1.65; color: #24292f; background: #ffffff; }
      h1, h2, h3, h4 { font-weight: 600; line-height: 1.25; margin-top: 24px; margin-bottom: 16px; color: #0f172a; }
      h1 { font-size: 2em; border-bottom: 1px solid #d8dee4; padding-bottom: 0.3em; }
      h2 { font-size: 1.5em; border-bottom: 1px solid #d8dee4; padding-bottom: 0.3em; }
      p { margin-bottom: 16px; }
      a { color: #0969da; text-decoration: none; }
      a:hover { text-decoration: underline; }
      ul, ol { padding-left: 2em; margin-bottom: 16px; }
      blockquote { padding: 0 1em; color: #57606a; border-left: .25em solid #d0d7de; margin: 0 0 16px 0; }
      code { padding: .2em .4em; font-size: 85%; background: rgba(175,184,193,0.2); border-radius: 6px; font-family: monospace; }
      pre { padding: 16px; overflow: auto; background: #0f172a; color: #f8fafc; border-radius: 8px; margin-bottom: 16px; }
      pre code { background: transparent; padding: 0; color: inherit; font-size: 100%; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
      th, td { padding: 6px 13px; border: 1px solid #d0d7de; }
      th { background-color: #f6f8fa; font-weight: 600; }
      tr:nth-child(even) { background-color: #f6f8fa; }
      hr { height: .25em; background-color: #d8dee4; border: 0; margin: 24px 0; }
    `,
    minimalist: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      body { font-family: 'Inter', -apple-system, sans-serif; max-width: 760px; margin: 4rem auto; padding: 0 2rem; line-height: 1.8; color: #334155; background: #f8fafc; }
      h1, h2, h3 { font-weight: 700; color: #0f172a; margin-top: 2em; margin-bottom: 0.6em; letter-spacing: -0.02em; }
      h1 { font-size: 2.25rem; line-height: 1.2; }
      h2 { font-size: 1.6rem; }
      p { margin-bottom: 1.4em; }
      a { color: #6366f1; text-decoration: none; font-weight: 500; border-bottom: 1px solid rgba(99, 102, 241, 0.2); }
      a:hover { color: #4f46e5; border-bottom-color: #4f46e5; }
      ul, ol { margin-bottom: 1.4em; padding-left: 1.5em; }
      blockquote { font-style: italic; border-left: 3px solid #6366f1; padding-left: 1.25rem; margin: 1.8em 0; color: #475569; }
      code { font-size: 0.9em; background: #e2e8f0; color: #4f46e5; padding: 0.2em 0.4em; border-radius: 4px; font-family: monospace; }
      pre { background: #0f172a; color: #f1f5f9; padding: 20px; border-radius: 12px; overflow-x: auto; margin: 1.8em 0; }
      pre code { background: transparent; padding: 0; color: inherit; }
      table { width: 100%; border-collapse: collapse; margin: 1.8em 0; }
      th, td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; text-align: left; }
      th { font-weight: 600; color: #0f172a; border-bottom: 2px solid #cbd5e1; }
      hr { border: 0; border-top: 1px dashed #cbd5e1; margin: 3em 0; }
    `,
    sepia: `
      body { font-family: -apple-system, sans-serif; max-width: 780px; margin: 3.5rem auto; padding: 0 1.5rem; line-height: 1.8; color: #433422; background-color: #fdf6e3; }
      h1, h2, h3 { font-weight: 700; color: #2e1d0c; margin-top: 1.8em; margin-bottom: 0.6em; }
      h1 { font-size: 2rem; border-bottom: 1px solid #ecdcb9; padding-bottom: 0.3em; }
      h2 { font-size: 1.5rem; border-bottom: 1px solid #ecdcb9; padding-bottom: 0.2em; }
      p { margin-bottom: 1.3em; }
      a { color: #b58900; text-decoration: none; border-bottom: 1px solid rgba(181, 137, 0, 0.3); }
      a:hover { color: #cb4b16; border-bottom-color: #cb4b16; }
      blockquote { margin: 1.6em 0; padding: 0.6em 1.25em; background: #f5ecc8; border-left: 4px solid #b58900; color: #584b3c; border-radius: 0 8px 8px 0; }
      code { background: #f6ecce; color: #b58900; padding: 0.15em 0.3em; border-radius: 4px; font-family: monospace; }
      pre { background: #073642; color: #93a1a1; padding: 18px; border-radius: 8px; overflow-x: auto; margin: 1.6em 0; }
      pre code { background: transparent; padding: 0; color: inherit; }
      table { width: 100%; border-collapse: collapse; margin: 1.6em 0; }
      th, td { padding: 10px 14px; border: 1px solid #ecdcb9; }
      th { background-color: #f5ecc8; font-weight: 700; }
      hr { border: 0; border-top: 1px solid #ecdcb9; margin: 2.5em 0; }
    `,
    serif: `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');
      body { font-family: 'Playfair Display', "Georgia", "Times New Roman", serif; max-width: 740px; margin: 4.5rem auto; padding: 0 2rem; line-height: 1.9; color: #111111; background: #ffffff; }
      h1, h2, h3 { font-family: 'Playfair Display', serif; font-weight: 700; color: #000000; margin-top: 2em; margin-bottom: 0.8em; text-align: center; }
      h1 { font-size: 2.4rem; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0; }
      h2 { font-size: 1.7rem; font-style: italic; }
      p { margin-bottom: 1.5em; text-align: justify; }
      a { color: #111111; text-decoration: underline; text-underline-offset: 4px; }
      blockquote { margin: 2.2em 1.5em; font-style: italic; font-size: 1.1em; line-height: 1.8; text-align: center; color: #3b3b3b; border: 0; padding: 12px 0; border-top: 1px solid #eeeeee; border-bottom: 1px solid #eeeeee; }
      code { font-size: 0.9em; background: #f3f4f6; color: #111111; padding: 0.2em 0.4em; border-radius: 2px; border: 1px solid #e5e7eb; font-family: monospace; }
      pre { background: #1f2937; color: #f9fafb; padding: 20px; border-radius: 4px; margin: 2em 0; }
      pre code { background: transparent; padding: 0; color: inherit; }
      table { width: 100%; border-collapse: collapse; margin: 2em 0; }
      th, td { padding: 12px 14px; border-top: 1px solid #dddddd; border-bottom: 1px solid #dddddd; }
      th { font-weight: 700; background-color: #f9fafb; }
      hr { border: 0; border-top: 1px solid #cccccc; width: 40%; margin: 3.5em auto; }
    `
  };

  // HTML 내보내기 템플릿 래퍼
  function wrapFullHtml(body, theme) {
    const selectedCss = DOWN_THEME_CSS[theme] || DOWN_THEME_CSS.github;
    const displayThemeName = theme === "github" ? "GitHub 스타일" :
                             theme === "minimalist" ? "모던 미니멀" :
                             theme === "sepia" ? "따뜻한 세피아" : "클래식 세리프";

    return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>변환된 문서 (${displayThemeName})</title>
<style>
  ${selectedCss}
  /* 체크박스 기본 지원 */
  ul li input[type="checkbox"] { margin-right: 8px; transform: translateY(1.5px); }
  img { max-width: 100%; border-radius: 8px; display: block; margin: 1.5em auto; }
</style>
</head>
<body>
${body}
</body>
</html>`;
  }

  // 타임스탬프 계산 함수 (다운로드 파일명 생성용)
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

  // 엘라스틱 토스트 알림 띄우기
  let toastId = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-visible");
    if (toastId) clearTimeout(toastId);
    toastId = setTimeout(() => toast.classList.remove("is-visible"), 2000);
  }

  // 로컬 마크다운 파일 로드 및 주입
  importBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      input.value = evt.target.result;
      scheduleRender();
      showToast(`문서 파일을 불러왔습니다: ${file.name}`);
      // 입력값 변경이 발생했으므로 템플릿 선택 드롭다운은 초기화
      templateSelect.selectedIndex = 0;
    };
    reader.onerror = () => {
      showToast("파일을 읽는 중에 오류가 발생했습니다.");
    };
    reader.readAsText(file);
    // 동일 파일 재업로드 시 핸들러 재동작을 위해 밸류 초기화
    e.target.value = "";
  });

  // 초기화 버튼 이벤트 바인딩
  clearBtn.addEventListener("click", () => {
    input.value = "";
    scheduleRender();
    showToast("마크다운 에디터를 초기화했습니다.");
    templateSelect.selectedIndex = 0;
  });

  // 템플릿 선택 박스 이벤트 연동
  templateSelect.addEventListener("change", () => {
    const val = templateSelect.value;
    if (TEMPLATES[val]) {
      input.value = TEMPLATES[val];
      scheduleRender();
      showToast(`${templateSelect.options[templateSelect.selectedIndex].text} 템플릿을 불러왔습니다!`);
    }
  });

  // 애플리케이션 다크모드/라이트모드 토글
  function applyAppTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    themeToggleBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
    
    const sunIcon = themeToggleBtn.querySelector(".theme-icon-sun");
    const moonIcon = themeToggleBtn.querySelector(".theme-icon-moon");
    
    if (sunIcon && moonIcon) {
      sunIcon.style.display = isDark ? "block" : "none";
      moonIcon.style.display = isDark ? "none" : "block";
    }

    // highlight.js 스키마 스위치
    const hljsLight = $("#hljs-light");
    const hljsDark = $("#hljs-dark");
    if (hljsLight && hljsDark) {
      hljsLight.disabled = isDark;
      hljsDark.disabled = !isDark;
    }

    try {
      localStorage.setItem(APP_THEME_KEY, theme);
    } catch (_) {}
  }

  themeToggleBtn.addEventListener("click", () => {
    const isDarkNow = document.documentElement.getAttribute("data-theme") === "dark";
    applyAppTheme(isDarkNow ? "light" : "dark");
  });

  // 프리뷰 영역 문서 스타일 테마 변경 관리
  function applyPreviewTheme(theme) {
    // 기존 모든 뷰어 테마 클래스 제거
    preview.classList.remove("theme-github", "theme-minimalist", "theme-sepia", "theme-serif");
    // 새 테마 클래스 추가
    preview.classList.add(`theme-${theme}`);
    previewThemeSelect.value = theme;
    
    try {
      localStorage.setItem(PREVIEW_THEME_KEY, theme);
    } catch (_) {}
  }

  previewThemeSelect.addEventListener("change", () => {
    applyPreviewTheme(previewThemeSelect.value);
    showToast(`미리보기 문서 테마가 변경되었습니다: ${previewThemeSelect.options[previewThemeSelect.selectedIndex].text}`);
  });

  // 분할 화면 좌우 드래그 리사이저 로직 구축
  let isResizing = false;

  const startResizing = (clientX) => {
    isResizing = true;
    workspace.classList.add("is-dragging");
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("touchmove", handleTouchDrag);
    document.addEventListener("mouseup", stopResizing);
    document.addEventListener("touchend", stopResizing);
  };

  const handleDrag = (e) => {
    if (!isResizing) return;
    const rect = workspace.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const totalW = rect.width;
    
    // 에디터 비율 최소 20%, 최대 80% 가이드 준수
    const percentage = Math.max(20, Math.min(80, (cursorX / totalW) * 100));
    paneInput.style.width = `calc(${percentage}% - 6px)`;
  };

  const handleTouchDrag = (e) => {
    if (!isResizing || e.touches.length === 0) return;
    const rect = workspace.getBoundingClientRect();
    const cursorX = e.touches[0].clientX - rect.left;
    const totalW = rect.width;
    
    const percentage = Math.max(20, Math.min(80, (cursorX / totalW) * 100));
    paneInput.style.width = `calc(${percentage}% - 6px)`;
  };

  const stopResizing = () => {
    if (!isResizing) return;
    isResizing = false;
    workspace.classList.remove("is-dragging");
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("touchmove", handleTouchDrag);
    document.removeEventListener("mouseup", stopResizing);
    document.removeEventListener("touchend", stopResizing);
  };

  splitDivider.addEventListener("mousedown", (e) => {
    e.preventDefault();
    startResizing(e.clientX);
  });

  splitDivider.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
      startResizing(e.touches[0].clientX);
    }
  });

  // 패널 개별 전체화면 모드 제어 로직
  fullscreenButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const targetPane = $(`#${targetId}`);
      if (!targetPane) return;

      const isFullScreen = targetPane.classList.toggle("is-fullscreen");
      btn.setAttribute("aria-pressed", isFullScreen ? "true" : "false");
      
      const maxIcon = btn.querySelector(".icon-maximize");
      const minIcon = btn.querySelector(".icon-minimize");

      if (maxIcon && minIcon) {
        maxIcon.style.display = isFullScreen ? "none" : "block";
        minIcon.style.display = isFullScreen ? "block" : "none";
      }

      showToast(isFullScreen ? "전체화면 모드를 활성화했습니다." : "전체화면 모드를 해제했습니다.");
    });
  });

  // 앱 최초 구동 부팅 로직
  (async function init() {
    let storedMarkdown = "";
    try {
      storedMarkdown = localStorage.getItem(STORAGE_KEY) || "";
    } catch (_) {}

    // 저장 기록이 없으면 기본 소개 가이드로 에디터를 채움
    if (!storedMarkdown) {
      storedMarkdown = TEMPLATES.basic;
    }
    input.value = storedMarkdown;

    // 저장되어 있던 다크/라이트모드 불러오기
    let savedAppTheme = "light";
    try {
      savedAppTheme = localStorage.getItem(APP_THEME_KEY) || "light";
    } catch (_) {}
    applyAppTheme(savedAppTheme);

    // 저장되어 있던 미리보기 문서 테마 불러오기
    let savedPreviewTheme = "github";
    try {
      savedPreviewTheme = localStorage.getItem(PREVIEW_THEME_KEY) || "github";
    } catch (_) {}
    applyPreviewTheme(savedPreviewTheme);

    // 최초 렌더 갱신
    scheduleRender();
  })();
})();
