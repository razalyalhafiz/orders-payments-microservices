import { IEventHandler } from "@nestjs/cqrs"
import { EventsHandler } from "@nestjs/cqrs/dist/decorators/events-handler.decorator"
import { OrderCreatedEvent } from "../impl/order-created.event"
import { OrdersService } from "src/orders/orders.service"

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(private readonly ordersService: OrdersService) { }

  handle(event: OrderCreatedEvent) {
    this.ordersService.processPayment(event.id)
    this.ordersService.sendEventToClient(event)
  }
}
