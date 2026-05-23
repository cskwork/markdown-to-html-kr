# Markdown → HTML 변환기 (한국어판) 요구사항

## 목표
markdowntohtml.com의 핵심 기능을 한국어 UI로 클론하고 Stitch MCP로 디자인을 재구성, GitHub Pages로 정적 호스팅한다.

## 원본 사이트 핵심 기능 (markdowntohtml.com)
1. **분할 레이아웃**: 좌측 마크다운 입력, 우측 변환 결과
2. **실시간 변환**: 입력하는 즉시 HTML 미리보기 갱신
3. **출력 모드 토글**: 렌더링된 미리보기 ↔ HTML 소스 코드 보기
4. **HTML 복사**: 클립보드 복사 버튼
5. **HTML 다운로드**: `.html` 파일로 저장
6. **샘플 마크다운**: 첫 진입 시 예시 마크다운 자동 로드
7. **GFM 지원**: 표, 체크박스, 펜스 코드 블록, 자동 링크

## 한국어판 추가 요구사항
- 모든 UI 문자열 한국어 (버튼, 라벨, 안내, 샘플 마크다운)
- 한글 폰트 가독성 우선 (Pretendard 또는 시스템 폰트 스택)
- 다크 모드 지원 (선택)
- 모바일 반응형 (1열 스택 레이아웃)

## 기술 스택 (정적 호스팅 호환)
- **변환 엔진**: `marked` (CDN) + `DOMPurify` (XSS 방어)
- **코드 하이라이트**: `highlight.js` (CDN)
- **빌드 도구 없음**: 순수 `index.html` + `styles.css` + `app.js`
- **호스팅**: GitHub Pages (정적)

## 비요구사항 (제외)
- 서버 사이드 변환
- 사용자 계정/저장소
- 마크다운 파일 업로드 (Phase 2 후보)
- 인쇄용 PDF 출력 (Phase 2 후보)

## 파일 구조 (목표)
```
markdown-to-html-kr/
├── index.html
├── styles.css
├── app.js
├── sample.md
├── README.md
└── .nojekyll
```

## 성공 기준
- [ ] 마크다운 입력 → 200ms 이내 HTML 갱신
- [ ] 복사/다운로드 동작 확인
- [ ] 미리보기 ↔ 소스 토글 동작
- [ ] 모바일 화면(<768px) 1열 레이아웃
- [ ] GitHub Pages URL 정상 접속
- [ ] Lighthouse 접근성 90+

## 보안
- 사용자 입력 마크다운 → HTML 변환 후 `DOMPurify.sanitize()` 필수
- `<script>` 차단, `javascript:` URL 차단

## 출처
- markdowntohtml.com (UI/UX 참고)
- marked: https://github.com/markedjs/marked
- DOMPurify: https://github.com/cure53/DOMPurify
