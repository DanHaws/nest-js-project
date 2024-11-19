import clsx from 'clsx';
import React from 'react';

type Variant = 'primary' | 'secondary';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  title: string;
}

export const Button = ({
  className,
  title,
  variant = 'primary',
  type = 'button',
  ...props
}: Props) => {
  const variantStyles = clsx({
    'bg-green-700 text-white hover:opacity-75': variant === 'primary',
    'bg-white text-green-700 border-green-700 hover:opacity-75':
      variant === 'secondary',
  });

  return (
    <button
      type={type}
      aria-label={title}
      className={clsx(
        'flex rounded-md text-[14px] px-[5px] sm:text-[18px] sm:px-[50px] border-[1px] text-center w-full justify-center py-[10px] font-semibold text-nowrap transition-all duration-200',
        variantStyles,
        className
      )}
      {...props}
    >
      {title.toUpperCase()}
    </button>
  );
};
