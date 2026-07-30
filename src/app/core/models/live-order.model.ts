import { OrderStatus } from './order-status.model';

export interface LiveOrder {
  id: number;
  customer: string;
  items: string[];
  amount: number;
  status: OrderStatus;
}
