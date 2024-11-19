import clsx from 'clsx';
import React from 'react';

interface Props {
  text: string;
  className?: string;
}

export const Badge = ({ text, className }: Props) => {
  const formattedText = text.trim().toUpperCase();
  return (
    <>
      {/* Mobile View */}
      <p
        className={clsx(
          'text-center md:hidden text-bold bg-pink-300 text-pink-900 px-[15px] py-[5px] absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform -rotate-[10deg]',
          className
        )}
      >
        {formattedText}
      </p>
      {/* Medium screens and larger */}
      <p
        className={clsx(
          'text-center hidden md:block text-bold bg-pink-300 text-pink-900 px-[15px] py-[5px] absolute top-0 right-0 translate-x-[10px] -translate-y-[10px] transform rotate-[10deg]',
          className
        )}
      >
        {formattedText}
      </p>
    </>
  );
};
