import React from 'react';

interface TextBlockProps {
  title: string;
  description: string;
  price: number;
}

export const TextBlock = ({ title, description, price }: TextBlockProps) => {
  const formattedPrice = price.toFixed(2);
  return (
    <div className="flex flex-col gap-[20px] py-[20px]">
      <h1 className="text-green-500 font-bold text-center text-[30px] md:text-[20px] lg:text-[25px]">
        {title}
      </h1>
      <p className="text-gray-600 text-center font-light md:text-[14px] lg:text-[18px]">
        {description}
      </p>
      <p className="text-gray-700 text-center font-bold md:text-[16px] lg:text-[20px]">
        Total price: £{formattedPrice}
      </p>
    </div>
  );
};
