---
name: Lumina Script
source: Stitch MCP (project 2334690004632950325, screen 84cd92da2fce465bbf707c160dd5a95b)
generated: 2026-05-23
---

# Lumina Script Design System

## 컨셉
미니멀, 모던 코퍼레이트. 개발자/작가를 위한 "디지털 페이퍼" 미학. 컨텐츠가 주인공이 되도록 장식을 최소화.

## 색상 토큰

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| primary | #630ed4 | 진한 강조 (호버, 활성) |
| primary-container | #7c3aed | 기본 강조 (브랜드, 주요 버튼) |
| secondary | #4b41e1 | 인디고 보조 |
| secondary-container | #645efb | 인디고 컨테이너 |
| surface / background | #f8f9fa | 워크스페이스 배경 (연회색) |
| surface-container-lowest | #ffffff | 카드/패널 (순백) |
| surface-container-low | #f3f4f5 | 인풋, 툴바 배경 |
| on-surface | #191c1d | 본문 텍스트 |
| on-surface-variant | #4a4455 | 라벨/보조 텍스트 |
| outline | #7b7487 | 본 보더 |
| outline-variant | #ccc3d8 | 약한 보더 |
| error | #ba1a1a | 에러 상태 |

### 다크모드 미러
- 배경: #0b1020, 패널: #111827
- 강조: #a78bfa (밝은 보라), 컨테이너: #1e1b4b

## 타이포그래피

- **Headline**: Geist 600/700 — 한글은 Pretendard로 대체
- **Body**: Inter 400/500 — 한글은 Pretendard
- **Mono/Label**: JetBrains Mono — 한글 대체 시 D2Coding 또는 시스템 모노

| 토큰 | 폰트 | 사이즈 | 가중치 | 행간 |
| --- | --- | --- | --- | --- |
| display | Geist | 48 | 700 | 1.1 |
| headline-lg | Geist | 32 | 600 | 1.2 |
| headline-md | Geist | 24 | 600 | 1.3 |
| body-lg | Inter | 18 | 400 | 1.6 |
| body-md | Inter | 16 | 400 | 1.6 |
| code | JetBrains Mono | 14 | 400 | 1.5 |
| label-sm | Geist | 12 | 500 | 1 |

## 형태

- 표준 둥근 모서리: `12px` (0.75rem)
- 중첩 내부 요소: 8px
- 칩/배지: 999px (필 모양)

## 그림자 / 깊이

- Ambient: `0 4px 20px rgba(0,0,0,0.04)` — 패널을 배경에서 살짝 띄움
- Hover: 약간 진해짐
- 1px 미세 보더 #e5e7eb — 고대비 라인 대신

## 레이아웃

- 컨테이너 최대: 1440px
- 거터: 24px
- 데스크톱 마진: 32px / 모바일 마진: 16px
- 메인 워크스페이스: 50:50 분할 (좌 에디터 / 우 미리보기)
- 모바일: 스택 또는 탭 인터페이스로 리플로우

## 컴포넌트 규칙

- **Primary 버튼**: 보라 배경, 흰 텍스트, 12px 라운드, 호버 시 그림자
- **Secondary 버튼**: 인디고 틴트 배경 + 인디고 텍스트, 보더만 (그림자 없음)
- **에디터 패널**: 모노스페이스, 라인 넘버 없음 (미니멀)
- **미리보기 카드**: 흰색, 12px 라운드, Inter
- **인풋 포커스**: 보더가 보라로 전환, 외곽 글로우 그림자
- **툴바**: 프로스티드 글래스 또는 #f9fafb 배경
- **칩/태그**: 필 모양, 작은 Geist 라벨, 대문자

## 적용 매핑 (이 프로젝트)

- `--accent` ← #7c3aed (primary-container)
- `--accent-strong` ← #630ed4 (primary)
- `--bg` ← #f8f9fa (surface)
- `--bg-elev` ← #ffffff (surface-container-lowest)
- `--bg-input` ← #ffffff
- `--fg` ← #191c1d (on-surface)
- `--fg-muted` ← #4a4455 (on-surface-variant)
- `--border` ← #e5e7eb (스펙 그림자/보더 가이드)
- `--radius` ← 12px
- `--shadow` ← `0 4px 20px rgba(0,0,0,0.04)` (Ambient)

## 한국어 적응

- 한글 헤드라인은 Pretendard SemiBold/Bold로 Geist 대체 (한글 미지원 보완)
- 자간/행간: 한글은 letter-spacing 0, line-height 1.7로 약간 늘림 (영문 1.6 대비)
- 본문 최소 16px (가독성 기준)
