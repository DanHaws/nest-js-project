import { Cat } from './cat.interface';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}
