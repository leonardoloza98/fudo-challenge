'use client';

interface DateDisplayProps {
  date: string | Date;
  className?: string;
}

export function DateDisplay({ date, className = 'text-gray-400 text-xs' }: DateDisplayProps) {
  return (
    <span className={className}>
      {new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}
    </span>
  );
} 