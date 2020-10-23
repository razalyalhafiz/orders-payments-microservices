import { OrderCreatedHandler } from "./order-created.handler"
import { OrderCancelledHandler } from "./order-cancelled.handler"
import { OrderConfirmedHandler } from "./order-confirmed.handler"
import { OrderDeliveredHandler } from "./order-delivered.handler"

export const EventHandlers = [
  OrderCreatedHandler,
  OrderCancelledHandler,
  OrderConfirmedHandler,
  OrderDeliveredHandler,
]
