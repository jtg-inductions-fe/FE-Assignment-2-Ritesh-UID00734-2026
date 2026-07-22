import { OrderStatus } from './order-status.enum';

export interface LiveOrder {
  id: number;
  customer: string;
  items: string[];
  amount: number;
  status: OrderStatus;
}
