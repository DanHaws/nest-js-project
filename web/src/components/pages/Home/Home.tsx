'use client';

import React from 'react';

import { Badge, Button } from '@/components/atoms';
import { Card, ResponsiveImage, TextBlock } from '@/components/molecules';
import { useNextDelivery } from '@/hooks/useNextDelivery';
import { useRouter } from 'next/navigation';

interface Props {
  userId: string;
}

export const Home = ({ userId }: Props) => {
  const router = useRouter();
  const { data, isLoading, error } = useNextDelivery(userId);

  if (isLoading) return <p>Loading...</p>; // very basic loading behaviour
  if (error instanceof Error) {
    if (error.message.includes('Request failed with status code 404')) {
      router.push('/404'); //very basic error handling, redirect to no data found page
    }
    return <p>Error: {error.message}</p>;
  }
  if (!data) return <p>There is no data associated with this ID</p>;
  const { freeGift, message, title, totalPrice } = data;

  return (
    <main className="flex flex-col min-h-screen items-center bg-gray-100 px-5 py-16">
      <Card>
        <ResponsiveImage
          src="/cat.png"
          alt="Image of tabby cat surrounded by Katkin cat food"
          desktopSize={{ width: 800, height: 800 }}
        />
        <div className="flex flex-col gap-5 py-5">
          <TextBlock title={title} description={message} price={totalPrice} />
          <div className="flex flex-row justify-center w-full gap-5">
            <Button title="See details" />
            <Button title="Edit delivery" variant="secondary" />
          </div>
          {freeGift && <Badge text="Free gift" />}
        </div>
      </Card>
    </main>
  );
};
