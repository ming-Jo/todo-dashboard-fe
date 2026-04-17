import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDeleteTaskMutation, useTaskDetailQuery } from '@/entities/task';

import { getErrorMessage, ROUTE, useModal } from '@/shared';

import { formatDateTime } from '../lib';

import { TaskDeleteConfirmModal } from './task-delete-confirm-modal';
import { TaskDetailEmptyState } from './task-detail-empty-state';

interface TaskDetailProps {
  id: string;
}

export const TaskDetail = ({ id }: TaskDetailProps) => {
  const navigate = useNavigate();

  const { data: taskDetail } = useTaskDetailQuery(id);
  const {
    mutateAsync: deleteTaskMutate,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteTaskMutation();

  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const isDeleteConfirmMatched = deleteConfirmText.trim() === id;

  if (!taskDetail) {
    return <TaskDetailEmptyState description='요청하신 할 일을 찾을 수 없습니다.' />;
  }

  const { title, memo, registerDatetime } = taskDetail;
  const formattedRegisterDatetime = formatDateTime(registerDatetime);

  return (
    <section className='space-y-4'>
      <h1 className='text-content-primary text-xl font-semibold'>할 일 상세</h1>
      <article className='bg-layer-elevated space-y-4 rounded-xl border p-4'>
        <div>
          <p className='text-content-secondary text-sm'>제목</p>
          <p className='text-content-primary mt-1 text-base font-semibold'>{title}</p>
        </div>
        <div>
          <p className='text-content-secondary text-sm'>메모</p>
          <p className='text-content-primary mt-1 text-base whitespace-pre-wrap'>{memo}</p>
        </div>
        <div>
          <p className='text-content-secondary text-sm'>등록일시</p>
          <p className='text-content-primary mt-1 text-sm'>{formattedRegisterDatetime}</p>
        </div>
      </article>

      <div className='flex justify-end gap-2'>
        <Link
          to={ROUTE.TASK_LIST}
          className='bg-layer-elevated text-content-primary hover:bg-layer inline-flex rounded-md border px-3 py-2 text-sm font-medium transition'
        >
          목록으로 돌아가기
        </Link>
        <button
          type='button'
          className='bg-error text-error-foreground inline-flex rounded-md px-3 py-2 text-sm font-medium transition hover:opacity-90'
          onClick={() => {
            setDeleteConfirmText('');
            openDeleteModal();
          }}
        >
          삭제하기
        </button>
      </div>

      {isDeleteModalOpen && (
        <TaskDeleteConfirmModal
          taskId={id}
          confirmText={deleteConfirmText}
          onConfirmTextChange={setDeleteConfirmText}
          isConfirmMatched={isDeleteConfirmMatched}
          isDeleting={isDeleting}
          deleteErrorMessage={deleteError ? getErrorMessage(deleteError) : undefined}
          onClose={closeDeleteModal}
          onConfirm={async () => {
            await deleteTaskMutate(id);
            closeDeleteModal();
            await navigate(ROUTE.TASK_LIST);
          }}
        />
      )}
    </section>
  );
};
