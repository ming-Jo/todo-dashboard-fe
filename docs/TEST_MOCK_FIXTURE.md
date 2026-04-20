# MSW mock: 로그인 계정 · 회원정보 · 토큰

로컬 개발 환경 · Vitest · Playwright에서 아래 파일을 기반으로 로그인, 회원정보를 검증하도록 구현되었습니다.

(제공된 openapi 파일에 회원가입 API 부재)

- `src/mocks/fixtures/*.ts`
- `src/mocks/handlers/*.ts`

<br />

## 1. mock 계정 (로그인 성공)

| 항목     | 값                      |
| -------- | ----------------------- |
| 이메일   | `qa-login@example.test` |
| 비밀번호 | `QATestPass123`         |

- **200**
  - `POST /api/sign-in` 요청 body의 `email`·`password`가 mock 계정과 일치할 때만 토큰 응답
- **400**
  - `이메일 또는 비밀번호가 올바르지 않습니다.` 에러 메시지 응답

<br />

## 2. 토큰 처리 (MSW + 클라이언트)

### 2.1 액세스 토큰 (`accessToken`)

- mock-access-token (`MOCK_AUTH.token.accessToken`)
- **로그인 성공 시**: 응답 JSON(`AuthTokenResponse`)으로 내려오며, memory에 저장
- **`GET /api/user`**:
  - 200: 요청 헤더 `Authorization`와 `Bearer mock-access-token`가 일치
  - 401: `인증이 필요합니다.` 에러 메시지 응답

### 2.2 리프레시 토큰 (`refreshToken`)

- mock-refresh-token (`MOCK_AUTH.token.refreshToken`)
- **로그인 성공 시**: MSW가 응답 헤더 Set-Cookie로 `token=<refreshToken>` 형태의 쿠키 응답
- **`POST /api/refresh`**:
  - 200: 요청 헤더 `Cookie` 또는 `document.cookie`에서 token과 `MOCK_AUTH.token.refreshToken` 일치
  - 401: `세션이 만료되었거나 유효하지 않습니다.` 에러 메시지 응답

### 2.3 리프레시 실패 (테스트 전용)

- 응답: 요청 헤더 `x-mock-refresh: fail`이 있으면 `400`, `errorMessage`: `토큰 갱신에 실패했습니다.`
- 인증 재시도·세션 만료 UI 등을 테스트할 때 사용

<br />

## 3. 회원정보 (mock 사용자)

- **전제**: 위 2.1의 엑세스 토큰 검증을 성공한 경우에만 반환
- **응답**: `GET /api/user` 성공 시 `MOCK_USER`
  ```js
  name: '홍길동';
  memo: 'MSW 기반 테스트 유저입니다.';
  ```

<br />

## mock 관련 파일

| 역할            | 경로                                  |
| --------------- | ------------------------------------- |
| 계정·토큰 상수  | `src/mocks/fixtures/auth.fixture.ts`  |
| 회원정보 상수   | `src/mocks/fixtures/user.fixture.ts`  |
| 로그인·리프레시 | `src/mocks/handlers/auth.handlers.ts` |
| 회원정보        | `src/mocks/handlers/user.handlers.ts` |
