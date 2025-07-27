'use client';

import { type ReactNode } from 'react';

interface ActionButtonProps {
  onClick: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  title: string;
  variant?: 'default' | 'danger' | 'warning' | 'success';
  children: ReactNode;
}

const variantStyles = {
  default: 'hover:text-blue-400 hover:bg-blue-500/10',
  danger: 'hover:text-red-400 hover:bg-red-500/10',
  warning: 'hover:text-yellow-400 hover:bg-yellow-500/10',
  success: 'hover:text-green-400 hover:bg-green-500/10'
};

export function ActionButton({
  onClick,
  disabled = false,
  title,
  variant = 'default',
  children
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 text-gray-400 rounded-md transition-colors duration-200 ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
} 