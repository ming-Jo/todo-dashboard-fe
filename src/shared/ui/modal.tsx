import { useEffect } from 'react';
import type { MouseEvent, PropsWithChildren } from 'react';

type ModalProps = PropsWithChildren<{
  ariaLabel?: string;
  ariaLabelledBy?: string;
  maxWidthClassName?: string;
  panelClassName?: string;
  onClose?: () => void;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}>;

export const Modal = ({
  ariaLabel,
  ariaLabelledBy,
  maxWidthClassName = 'max-w-md',
  panelClassName,
  onClose,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  children,
}: ModalProps) => {
  const mergedPanelClassName = [
    'bg-layer w-full rounded-xl border p-5 shadow-sm',
    maxWidthClassName,
    panelClassName,
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    if (!onClose || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEscape, onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!onClose || !closeOnBackdropClick) return;

    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='bg-layer-overlay fixed inset-0 z-50 flex items-center justify-center p-4'
      onMouseDown={handleBackdropClick}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={mergedPanelClassName}
      >
        {children}
      </div>
    </div>
  );
};
