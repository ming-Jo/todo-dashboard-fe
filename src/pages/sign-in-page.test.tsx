import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SignInPage } from './sign-in-page';
import { renderWithProviders } from '@/test/render-with-providers';

const authMocks = vi.hoisted(() => ({
  takeAuthErrorMessage: vi.fn(() => null),
  useSignInMutation: vi.fn(() => ({
    isPending: false,
    mutateAsync: vi.fn().mockResolvedValue({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    }),
  })),
}));

vi.mock('@/entities/auth', async () => {
  const actual = await vi.importActual<typeof import('@/entities/auth')>('@/entities/auth');
  return {
    ...actual,
    takeAuthErrorMessage: authMocks.takeAuthErrorMessage,
    useSignInMutation: authMocks.useSignInMutation,
  };
});

describe('SignInPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authMocks.takeAuthErrorMessage.mockReturnValue(null);
    authMocks.useSignInMutation.mockReturnValue({
      isPending: false,
      mutateAsync: vi.fn().mockResolvedValue({
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      }),
    });
  });

  it('라벨을 렌더링하고 제출 버튼은 초기 상태에서 비활성화된다', () => {
    renderWithProviders(<SignInPage />);

    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인 하기' })).toBeDisabled();
  });

  it('유효성 검사 메시지를 표시하고 폼이 유효하면 제출 버튼을 활성화한다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignInPage />);

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const submitButton = screen.getByRole('button', { name: '로그인 하기' });

    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, '1234');

    expect(await screen.findByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
    expect(await screen.findByText('비밀번호는 8자 이상이어야 합니다.')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await user.clear(emailInput);
    await user.type(emailInput, 'qa-login@example.test');
    await user.clear(passwordInput);
    await user.type(passwordInput, 'QATestPass123');

    expect(submitButton).toBeEnabled();
  });

  it('로그인 실패 시 에러 메시지 모달을 표시한다', async () => {
    authMocks.useSignInMutation.mockReturnValue({
      isPending: false,
      mutateAsync: vi.fn().mockRejectedValue(new Error('로그인에 실패했습니다.')),
    });

    const user = userEvent.setup();
    renderWithProviders(<SignInPage />);

    await user.type(screen.getByLabelText('이메일'), 'invalid-login@example.test');
    await user.type(screen.getByLabelText('비밀번호'), 'QATestPass123');
    await user.click(screen.getByRole('button', { name: '로그인 하기' }));

    expect(await screen.findByRole('dialog', { name: '로그인 오류' })).toBeInTheDocument();
    expect(screen.getByText('로그인에 실패했습니다.')).toBeInTheDocument();
  });
});
