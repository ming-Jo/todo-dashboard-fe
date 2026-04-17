import { Modal } from '@/shared';

interface SignInErrorModalProps {
  message: string;
  onClose: () => void;
}

export const SignInErrorModal = ({ message, onClose }: SignInErrorModalProps) => {
  return (
    <Modal
      ariaLabel='로그인 오류'
      maxWidthClassName='max-w-sm'
      panelClassName='rounded-lg'
      onClose={onClose}
    >
      <div>
        <h2 className='text-content-primary text-base font-semibold'>로그인 실패</h2>
        <p className='text-content-secondary mt-2 text-sm'>{message}</p>
        <button
          type='button'
          className='bg-primary text-primary-foreground mt-4 w-full rounded-md px-3 py-2 text-sm font-medium'
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </Modal>
  );
};
