export interface Payment {
  paymentId: string;
  orderId: string;
  state: string;
  timestamp: Date;
}
