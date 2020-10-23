import { Redisk } from "redisk"
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs"
import { OrderDeliveredEvent } from "../impl/order-delivered.event"
import { Order } from "src/orders/entities/order.entity"
import { OrderState } from "src/enums/order-state.enum"

@ViewUpdaterHandler(OrderDeliveredEvent)
export class OrderDeliveredUpdater
  implements IViewUpdater<OrderDeliveredEvent> {
  constructor(private readonly redisk: Redisk) {}

  async handle(event: OrderDeliveredEvent) {
    const { id } = event
    const order = await this.redisk.getOne(Order, id)
    order.state = OrderState.DELIVERED
    await this.redisk.save<Order>(order)
  }
}
