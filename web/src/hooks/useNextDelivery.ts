import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API ?? 'http://localhost:3000';

interface NextDelivery {
  freeGift: boolean;
  message: string;
  title: string;
  totalPrice: number;
}

const fetchNextDelivery = async (userId: string): Promise<NextDelivery> => {
  const { data } = await axios.get(
    `${API_URL}/comms/your-next-delivery/${userId}`
  );
  return data;
};

export const useNextDelivery = (userId: string) => {
  return useQuery({
    queryKey: ['nextDelivery', userId], // Unique key for caching
    queryFn: () => fetchNextDelivery(userId), // Fetching function
    enabled: !!userId, // Only fetch when userId exists
  });
};
