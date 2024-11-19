import { POUCH_PRICES } from 'src/comms/comms.service';

export interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: keyof typeof POUCH_PRICES;
}
