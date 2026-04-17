import { expect, test } from '@playwright/test';

test.describe('SignInPage e2e', () => {
  test('로그인 페이지 확인 및 실패 시 에러 모달 확인', async ({ page }) => {
    await page.goto('/sign-in');

    await expect(page.getByLabel('이메일')).toBeVisible();
    await expect(page.getByLabel('비밀번호')).toBeVisible();
    await expect(page.getByRole('button', { name: '제출' })).toBeDisabled();

    await page.getByLabel('이메일').fill('invalid-login@example.test');
    await page.getByLabel('비밀번호').fill('QATestPass123');
    await page.getByRole('button', { name: '제출' }).click();

    await expect(page.getByRole('dialog', { name: '로그인 오류' })).toBeVisible();
    await expect(page.getByText('이메일 또는 비밀번호가 올바르지 않습니다.')).toBeVisible();
  });
});
