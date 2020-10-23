import { OrderStatus } from '../enums/order-status.enum';

export interface Order {
  id: string;
  name: string;
  email: string;
  state: OrderStatus;
  created: Date;
}
