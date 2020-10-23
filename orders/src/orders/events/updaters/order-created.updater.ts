import { Redisk } from "redisk"
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs"
import { OrderCreatedEvent } from "../impl/order-created.event"
import { Order } from "src/orders/entities/order.entity"

@ViewUpdaterHandler(OrderCreatedEvent)
export class OrderCreatedUpdater implements IViewUpdater<OrderCreatedEvent> {
  constructor(private readonly redisk: Redisk) {}

  async handle(event: OrderCreatedEvent) {
    const { id, name, email, state, created } = event
    await this.redisk.save<Order>(new Order(id, name, email, state, created))
  }
}
