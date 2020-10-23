import { Redisk } from "redisk"
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs"
import { OrderConfirmedEvent } from "../impl/order-confirmed.event"
import { Order } from "src/orders/entities/order.entity"
import { OrderState } from "src/enums/order-state.enum"

@ViewUpdaterHandler(OrderConfirmedEvent)
export class OrderConfirmedUpdater
  implements IViewUpdater<OrderConfirmedEvent> {
  constructor(private readonly redisk: Redisk) {}

  async handle(event: OrderConfirmedEvent) {
    const { id } = event
    const order = await this.redisk.getOne(Order, id)
    order.state = OrderState.CONFIRMED
    await this.redisk.save<Order>(order)
  }
}
