import { Order } from '../models/Order';
import { OrderStatus } from '../enums/order-status.enum';

export class AddOrder {
  static readonly type = '[Order] Add';

  constructor(public payload: Order) { }
}

export class GetOrders {
  static readonly type = '[Order] Get';
}

export class UpdateOrderStatus {
  static readonly type = '[Order] Update Status';

  constructor(public payload: OrderStatus, public orderId: string) { }
}

export class SetSelectedOrder {
  static readonly type = '[Order] Set';

  constructor(public payload: Order) { }
}

export class CancelOrder {
  static readonly type = '[Order] Cancel';

  constructor(public orderId: string) { }
}
