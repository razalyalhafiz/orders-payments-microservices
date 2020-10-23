import { Redisk } from "redisk"
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs"
import { OrderCancelledEvent } from "../impl/order-cancelled.event"
import { Order } from "src/orders/entities/order.entity"
import { OrderState } from "src/enums/order-state.enum"

@ViewUpdaterHandler(OrderCancelledEvent)
export class OrderCancelledUpdater
  implements IViewUpdater<OrderCancelledEvent> {
  constructor(private readonly redisk: Redisk) {}

  async handle(event: OrderCancelledEvent) {
    const { id } = event
    const order = await this.redisk.getOne(Order, id)
    order.state = OrderState.CANCELLED
    await this.redisk.save<Order>(order)
  }
}
