import { cn } from '@/shared';

interface DetailFieldProps {
  label: string;
  valueClassName?: string;
  children: React.ReactNode;
}

export const DetailField = ({ label, valueClassName, children }: DetailFieldProps) => (
  <div>
    <p className='text-content-secondary text-sm font-bold'>{label}</p>
    <p className={cn('text-content-secondary mt-1 text-base', valueClassName)}>{children}</p>
  </div>
);
