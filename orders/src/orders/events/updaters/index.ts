import { OrderCreatedUpdater } from "./order-created.updater"
import { OrderCancelledUpdater } from "./order-cancelled.updater"
import { OrderConfirmedUpdater } from "./order-confirmed.updater"
import { OrderDeliveredUpdater } from "./order-delivered.updater"

export const StateUpdaters = [
  OrderCreatedUpdater,
  OrderCancelledUpdater,
  OrderConfirmedUpdater,
  OrderDeliveredUpdater,
]
