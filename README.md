# 🎬 Foocle

> 가게 사진만 올리면, 홍보용 숏폼 영상이 만들어집니다

리얼톤(Realthon) Foocle 팀 프론트엔드 레포지토리입니다.

<br>

## 주요 기능

| 기능 | 설명 |
|---|---|
| **숏폼 생성** | 업로드한 가게 이미지로 홍보 숏폼 영상 생성 |
| **영상 스타일 선택** | 생성할 영상의 스타일 지정 |
| **이미지 업로드** | 가이드 모달과 업로더 카드로 업로드 지원 |
| **가게 정보 · 큐레이션** | 가게 상세 정보 등록 및 조회 |
| **마이페이지** | 내가 만든 영상과 가게 정보 관리 |
| **카카오 로그인** | 소셜 로그인 및 토큰 기반 인증 |

<br>

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| Core | React 19, JavaScript, Vite 7 |
| 스타일링 | styled-components |
| 상태 관리 | Zustand, TanStack Query v5 (+ Devtools) |
| 네트워크 | Axios |
| UI | react-spinners, react-textarea-autosize |
| 배포 | Netlify (SPA 리다이렉트 설정 포함) |

<br>

## 시작하기

```bash
yarn install
yarn dev
```

| 명령 | 설명 |
|---|---|
| `yarn dev` | 개발 서버 실행 |
| `yarn build` | 프로덕션 빌드 |
| `yarn preview` | 빌드 결과 미리보기 |
| `yarn lint` | ESLint 검사 |

<br>

## 프로젝트 구조

```
src/
├── api/
│   ├── createshortform.js    숏폼 생성
│   ├── image.js              이미지 업로드
│   ├── store.js              가게 정보
│   ├── login.js · signup.js · logout.js · refresh.js
│   └── KakaoLoginCallback.jsx
├── components/    Header · Button · ImageUploaderCard · ImageGuideModal
│                  VideoModal · ProgressBar · LoadingOverlay · InstructionCard
└── assets/        img · video
```

### 인증 흐름

카카오 로그인 콜백으로 AccessToken / RefreshToken을 발급받고, `refresh.js`에서 만료 시 토큰을 갱신합니다.

<br>

## 배포

Netlify에 배포되며, `netlify.toml`의 리다이렉트 설정으로 SPA 라우팅을 처리합니다.

<br>

## 팀

| GitHub |
|---|
| [@seongwwww](https://github.com/seongwwww) |
| [@hyeryunYou](https://github.com/hyeryunYou) |
