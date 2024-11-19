import { Home } from '@/components/pages';
import { use } from 'react';

interface Props {
  params: Promise<{ userId: string }>;
}

export default function HomePage({ params }: Props) {
  const { userId } = use(params);

  return <Home userId={userId} />;
}
