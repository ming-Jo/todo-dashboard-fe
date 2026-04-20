# Todo Dashboard

[![배포 URL](https://img.shields.io/badge/배포%20URL-🔗-0A66C2)](https://todo-dashboard-fe.vercel.app/)

`requirement.md`와 `openapi.yaml`을 기준으로 구현되었습니다.

**MSW**로 API를 모킹하며, **FSD(Feature-Sliced Design)** 레이어 구조를 사용합니다.

👉 [로그인 테스트 계정 (mock 유저)](#로그인-테스트-mock-유저)


## 기술 스택

| 구분                  | 기술                                           |
| --------------------- | ------------------------------------------------- |
| 런타임 | React 18, TypeScript |
| 빌드·번들 | Vite, pnpm |
| 배포 | Vercel |
| 아키텍처 | FSD(Feature-Sliced Design) |
| API mocking | MSW (`public/mockServiceWorker`) | 
| state, fetch | TanStack Query, fetch 기반 HTTP 클라이언트 |
| style | Tailwind CSS 4 |
| form | react-hook-form | 
| 테스트 | Vitest, Playwright |

## 시작하기

```bash
pnpm install
pnpm run dev
```

- 개발 서버 URL: `http://localhost:5173`

## 스크립트

| 명령 | 설명 |
| ---- | ------------------ |
| `pnpm run dev` | Vite 개발 서버 |
| `pnpm run build` | TypeScript 검사 후 프로덕션 빌드 |
| `pnpm run preview` | 빌드 결과 미리보기 |
| `pnpm run lint` | ESLint |
| `pnpm run format` / `pnpm run format:check` | Prettier 포맷 / 검사 |
| `pnpm run test` / `pnpm run test:watch` | Vitest 1회 실행 / 감시 모드 |
| `pnpm run e2e` | Playwright E2E (최초 1회 `pnpm exec playwright install`) |

## 문서 (`docs/*.md`)

추가 정보는 아래의 문서를 참고하세요.

| 파일                                              | 내용                                                         |
| ------------------------------------------------- | ------------------------------------------------------------ |
| [DEVELOPMENT_PLAN.md](docs/DEVELOPMENT_PLAN.md)   | 구현 목표, 기술 결정, FSD 디렉터리, 단계별 계획, 테스트 전략 |
| [TEST_MOCK_FIXTURE.md](docs/TEST_MOCK_FIXTURE.md) | MSW mock 계정, 토큰·쿠키 규칙, 회원정보 fixture        |
| [AI_USAGE.md](docs/AI_USAGE.md)                   | 에이전트·AI 활용 범위 및 검증 체크리스트                     |

## 로그인 테스트 (mock 유저)

(참고) [TEST_MOCK_FIXTURE.md](docs/TEST_MOCK_FIXTURE.md)

| 항목     | 값                      |
| -------- | ----------------------- |
| 이메일   | `qa-login@example.test` |
| 비밀번호 | `QATestPass123`         |

## 주요 라우트

- `/` — 대시보드 (`numOfTask`, `numOfRestTask`, `numOfDoneTask`)
- `/sign-in` — 로그인
- `/task` — 할 일 목록(가상 스크롤·무한 스크롤)
- `/task/:id` — 할 일 상세·삭제
- `/user` — 회원정보

