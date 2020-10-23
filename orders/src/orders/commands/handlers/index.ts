import { CreateOrderHandler } from "./create-order.handler"
import { CancelOrderHandler } from "./cancel-order.handler"
import { ConfirmOrderHandler } from "./confirm-order.handler"
import { DeliverOrderHandler } from "./deliver-order.handler"

export const CommandHandlers = [
  CreateOrderHandler,
  CancelOrderHandler,
  ConfirmOrderHandler,
  DeliverOrderHandler,
]
