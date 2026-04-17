import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignInErrorModal, SignInForm } from '@/widgets/sign-in';

import { takeAuthErrorMessage, useSignInMutation } from '@/entities/auth';

import { getErrorMessage, ROUTE, useModal } from '@/shared';

export const SignInPage = () => {
  const navigate = useNavigate();

  const {
    isOpen: isErrorModalOpen,
    openModal: openErrorModal,
    closeModal: closeErrorModal,
  } = useModal();

  const { mutateAsync: signInMutate, isPending: isPendingSignIn } = useSignInMutation();

  const [authMessage] = useState<string | null>(() => takeAuthErrorMessage());
  const [modalMessage, setModalMessage] = useState('');

  const handleCloseErrorModal = () => {
    closeErrorModal();
    setModalMessage('');
  };

  const handleSignIn = async (values: { email: string; password: string }) => {
    try {
      await signInMutate(values);
      navigate(ROUTE.DASHBOARD);
    } catch (error) {
      setModalMessage(getErrorMessage(error));
      openErrorModal();
    }
  };

  return (
    <>
      <SignInForm
        authMessage={authMessage}
        isSubmitting={isPendingSignIn}
        onSubmit={handleSignIn}
      />

      {isErrorModalOpen && (
        <SignInErrorModal
          message={modalMessage}
          onClose={handleCloseErrorModal}
        />
      )}
    </>
  );
};
