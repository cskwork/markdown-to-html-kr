# 마크다운 → HTML 변환기 (한국어판)

[markdowntohtml.com](https://markdowntohtml.com/)의 기능을 클론하고 [Stitch MCP](https://stitch.withgoogle.com/)로 디자인을 재구성한 정적 웹앱. 한국어 UI, 실시간 변환, 클립보드 복사, HTML 다운로드를 지원합니다.

## 라이브 데모
👉 https://cskwork.github.io/markdown-to-html-kr/

## 주요 기능
- 좌측 마크다운 입력 ↔ 우측 HTML 실시간 미리보기 (50:50 분할)
- 미리보기 ↔ HTML 소스 보기 탭 전환
- 클립보드 복사 / `.html` 파일 다운로드 (스타일이 적용된 완전한 HTML 문서)
- GFM 지원: 표, 체크박스, 코드 블록, 자동 링크
- 코드 블록 신택스 하이라이팅 (highlight.js)
- 다크 모드 토글 (저장됨)
- 입력값 자동 저장 (localStorage)
- 모바일 반응형 (1열 스택 레이아웃)

## 보안
사용자 입력 마크다운을 [DOMPurify](https://github.com/cure53/DOMPurify)로 정화한 후 렌더링합니다. `<script>`, `javascript:` URL 등은 차단됩니다.

## 기술 스택
| 항목 | 사용 |
| --- | --- |
| 변환 | [marked](https://github.com/markedjs/marked) v12 |
| Sanitize | [DOMPurify](https://github.com/cure53/DOMPurify) v3.1.6 |
| 신택스 하이라이팅 | [highlight.js](https://highlightjs.org/) v11.10 |
| 한글 폰트 | [Pretendard](https://github.com/orioncactus/pretendard) |
| 디자인 | [Stitch MCP](https://stitch.withgoogle.com/) — Lumina Script 디자인 시스템 |
| 호스팅 | GitHub Pages (정적) |

빌드 도구 없이 `index.html` + `styles.css` + `app.js` 만으로 동작합니다.

## 로컬 실행
```bash
git clone https://github.com/cskwork/markdown-to-html-kr.git
cd markdown-to-html-kr
python3 -m http.server 8000
# http://localhost:8000 접속
```

## 디자인 토큰
[design/lumina-script.md](design/lumina-script.md) 참고. Stitch MCP가 생성한 "Lumina Script" 디자인 시스템을 한국어 환경에 맞게 매핑했습니다.

## 파일 구조
```
markdown-to-html-kr/
├── index.html          진입점
├── styles.css          Lumina Script 토큰 적용 스타일
├── app.js              변환 / 미리보기 / 복사 / 다운로드 로직
├── sample.md           초기 샘플 마크다운
├── .nojekyll           Jekyll 빌드 비활성 (GitHub Pages용)
├── design/
│   ├── lumina-script.md      Stitch 디자인 토큰 문서
│   └── stitch-screenshot.png Stitch가 생성한 디자인 스크린샷
└── REQUIREMENTS.md     요구사항 / 비요구사항
```

## 출처
- markdowntohtml.com — UI/UX 컨셉 참고
- Stitch MCP — 디자인 시스템 생성

## 라이선스
MIT
