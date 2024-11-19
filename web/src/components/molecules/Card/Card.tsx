import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col md:flex-row md:justify-center max-w-[1570px] md:items-between items-center px-[20px] py-[40px] md:pr-[20px] md:p-0 gap-[20px] bg-white border-gray-300 border-[1px] rounded-md relative',
        className
      )}
    >
      {children}
    </div>
  );
};
