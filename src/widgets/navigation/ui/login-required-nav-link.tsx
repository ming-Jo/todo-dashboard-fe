import { NavLink } from 'react-router-dom';
import type { LucideProps } from 'lucide-react';
import type { ComponentType, MouseEvent } from 'react';

import { cn } from '@/shared';

type NavigationLinkClassNameParams = {
  isActive: boolean;
};

type LoginRequiredNavLinkProps = {
  to: string;
  label: string;
  isLoggedIn: boolean;
  icon: ComponentType<LucideProps>;
  className: (params: NavigationLinkClassNameParams) => string;
  end?: boolean;
};

export const LoginRequiredNavLink = ({
  to,
  label,
  isLoggedIn,
  icon: Icon,
  className,
  end = false,
}: LoginRequiredNavLinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (isLoggedIn) {
      return;
    }

    event.preventDefault();
  };

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(className({ isActive }), !isLoggedIn && 'group relative cursor-not-allowed')
      }
      onClick={handleClick}
      aria-disabled={!isLoggedIn}
    >
      <Icon
        size={16}
        aria-hidden='true'
      />
      {label}
      {!isLoggedIn && (
        <span className='bg-content-primary text-background pointer-events-none invisible absolute top-full left-1/2 z-10 mt-1 -translate-x-1/2 rounded px-2 py-1 text-[11px] whitespace-nowrap group-focus-within:visible group-hover:visible'>
          로그인 후 이용 가능합니다
        </span>
      )}
    </NavLink>
  );
};
