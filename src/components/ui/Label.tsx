import React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string;
};

export function Label({ className = '', ...props }: LabelProps) {
  return (
    <label className={`block text-m font-medium ${className}`} {...props} />
  );
}
