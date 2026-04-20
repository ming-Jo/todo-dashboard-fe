# 구현 플랜

## 목표

- `requirement.md`와 `openapi.yaml`을 기준으로 구현

## 기술 결정(사전 확정)

- React 버전: **18 선택**
  - 이유: 라이브러리(TanStack Query, react-hook-form, 가상 스크롤 라이브러리)와 조합 시 생태계 안정성이 높음
- API 처리: **MSW 기반 mocking + openapi 스키마 준수 응답**
  - 이유: 별도 백엔드 없이도 명세 기반 동작/에러/무한스크롤/404 시나리오를 안정적으로 재현 가능
- 아키텍처: **FSD(Feature-Sliced Design) 구조**
  - 이유: 기능·도메인·공통을 분리해 결합도를 낮추고, 레이어·import 규칙으로 의존 방향이 분명해져 유지보수와 협업에 유리함

## 구현 원칙

- 구현은 openapi 스펙 준수 범위(`/api/sign-in`, `/api/refresh`, `/api/user`, `/api/dashboard`, `/api/task`, `/api/task/:id`)에서 진행 (임의 추가하지 않을 것)
- 로그인 가능 계정/회원정보는 mock fixture 규칙으로 정의하여 재현 가능하게 유지
- 페이지/기능 구현 전 타입(API/도메인/뷰모델)을 먼저 확정하고 이후 구현에서 재사용
- 주요 페이지 기능은 구현과 테스트(Vitest/RTL/MSW) 코드를 추가하여 회귀를 차단

## 구현 범위

- 앱 초기 셋업(pnpm, Vite React+TS, eslint/prettier, Tailwind 4, 폰트)
- FSD 폴더 구조 수립(`app`, `pages`, `widgets`, `features`, `entities`, `shared`)
- 인증 플로우(로그인, 토큰 저장, 인증 상태 기반 GNB/LNB)
- 페이지 구현
  - 대시보드(`/`): numOfTask, numOfRestTask, numOfDoneTask
  - 로그인(`/sign-in`): 라벨/검증/버튼 활성화 조건/에러 모달
  - 목록(`/task`): 카드 목록, 가상 스크롤, 무한 스크롤, 상세 이동
  - 상세(`/task/:id`): 상세 조회, 404 empty state+목록 복귀 버튼, 삭제 확인 모달
  - 회원정보(`/user`): 사용자 정보 렌더링
- AI 활용 문서: `AI_USAGE.md` 작성

## 디렉토리 구조 (FSD)

- src/app: 라우터, QueryClient, 전역 Provider, 앱 진입점
- src/pages: route 단위
- src/widgets/navigation: GNB/LNB
- src/features/auth: sign-in form, auth guard
- src/features/task: task list virtual/infinite, task delete confirm
- src/entities/task: task 모델/쿼리
- src/entities/user: user 모델/쿼리
- src/shared: 공통 라우트 상수, 공통 api fetch/type/error, 공통 UI 등
- src/mocks: MSW 핸들러/fixture

## 단계별 실행 계획

1. 프로젝트 초기 설정
   - pnpm 기반 React+TS 프로젝트 생성, Tailwind 4 연결
   - eslint/prettier 설정(요구 옵션 반영)
   - Pretendard 폰트 및 디자인 토큰(예: `primary`, `disabled`) 정의

2. 앱 기반/아키텍처 구성
   - FSD 디렉토리 생성 및 import 규칙 정리
   - 라우터(`/`, `/sign-in`, `/task`, `/task/:id`, `/user`) 구성
   - QueryClient/에러 바운더리/기본 레이아웃(GNB/LNB) 구성

3. API + MSW mocking
   - openapi.yaml 스키마 기준 타입/응답 인터페이스 정의
   - `/api/sign-in`, `/api/user`, `/api/dashboard`, `/api/task`, `/api/task/:id`, `DELETE /api/task/:id` 핸들러 작성
   - 400/401/404 에러 시나리오 포함
   - 명세 외 API(회원가입/할일 생성/수정) 미구현

4. 타입 설계(type/interface)
   - `interface`: 확장 가능성이 있는 객체 정의(User, TaskItem, TaskDetail, ErrorResponse 등)
   - `type`: 유니온/별칭/조합(TaskStatus, ApiResult, AuthState 등)
   - API 타입과 UI 타입을 분리하고 필요한 경우 mapper 함수에서 변환 책임을 단일화

5. 인증 및 네비게이션
   - 로그인 상태에 따라 아이콘/경로 분기(로그인 아이콘 vs 회원정보 아이콘)
   - 로그인 성공 시 토큰 저장 및 로그인 외 API 접근 허용
   - 인증 실패 시 에러 처리 규칙 일원화

6. 페이지 기능 구현
   - 대시보드: numOfTask/numOfRestTask/numOfDoneTask 표시
   - 로그인: react-hook-form 검증(email 패턴, password 규칙), 버튼 활성화 제어, 실패 모달(`errorMessage`)
   - 목록: 무한 스크롤 + 가상 렌더링, 카드(title/memo), 상세 이동
   - 상세: 데이터 조회, 404 empty state, 삭제 확인 모달(id 일치 검증)
   - 회원정보: name/memo 표시

7. 검증 및 문서 작성
   - lint/format 통과, 주요 사용자 시나리오 수동 검증
   - `AI_USAGE.md` 작성(도구/모델/적용 범위/핵심 프롬프트/최종 검증)

## 테스트 전략

- 단위/컴포넌트: Vitest + React Testing Library + user-event
- API 시나리오: MSW 핸들러를 앱 실행과 테스트에서 공통 사용
- E2E: Playwright로 핵심 사용자 흐름만 선별 검증

## 검증 체크리스트

- FSD 구조 준수
- 로그인 폼 라벨/검증/버튼 비활성 조건 충족
- 로그인 실패 시 API `errorMessage` 모달 표시
- 목록 가상 스크롤과 무한 스크롤 동시 충족
- 상세 404 처리 및 목록 복귀 UX 제공
- 삭제 모달 입력값 일치 시에만 api 호출 가능
- mock 계정 정책 문서만으로 로그인/회원정보 조회 재현 가능
