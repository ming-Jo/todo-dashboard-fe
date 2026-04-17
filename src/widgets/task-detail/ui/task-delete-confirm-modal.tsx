import { Modal } from '@/shared';

interface TaskDeleteConfirmModalProps {
  taskId: string;
  confirmText: string;
  onConfirmTextChange: (value: string) => void;
  isConfirmMatched: boolean;
  isDeleting: boolean;
  deleteErrorMessage?: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const TaskDeleteConfirmModal = ({
  taskId,
  confirmText,
  onConfirmTextChange,
  isConfirmMatched,
  isDeleting,
  deleteErrorMessage,
  onClose,
  onConfirm,
}: TaskDeleteConfirmModalProps) => (
  <Modal
    ariaLabelledBy='task-delete-dialog-title'
    maxWidthClassName='max-w-md'
    panelClassName='space-y-4'
    onClose={onClose}
  >
    <div>
      <h2
        id='task-delete-dialog-title'
        className='text-content-primary text-lg font-semibold'
      >
        삭제 확인
      </h2>
      <p className='text-content-secondary text-sm'>
        할 일을 삭제하려면 아래 입력창에 <strong>{taskId}</strong>를 입력해주세요.
      </p>
      <label className='text-content-secondary text-sm'>
        확인용 ID
        <input
          value={confirmText}
          onChange={(event) => onConfirmTextChange(event.target.value)}
          className='bg-background text-content-primary mt-1 block w-full rounded-md border px-3 py-2 text-sm'
          placeholder='예: 12'
        />
      </label>

      {deleteErrorMessage && <p className='text-error text-sm'>{deleteErrorMessage}</p>}

      <div className='mt-4 flex justify-end gap-2'>
        <button
          type='button'
          className='bg-layer-elevated text-content-primary hover:bg-layer rounded-md border px-3 py-2 text-sm font-medium transition'
          onClick={onClose}
          disabled={isDeleting}
        >
          취소
        </button>
        <button
          type='button'
          className='bg-error text-error-foreground rounded-md px-3 py-2 text-sm font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
          disabled={!isConfirmMatched || isDeleting}
          onClick={() => void onConfirm()}
        >
          {isDeleting ? '삭제 중...' : '삭제'}
        </button>
      </div>
    </div>
  </Modal>
);
