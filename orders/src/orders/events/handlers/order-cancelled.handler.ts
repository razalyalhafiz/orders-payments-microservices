import { IEventHandler } from "@nestjs/cqrs"
import { EventsHandler } from "@nestjs/cqrs/dist/decorators/events-handler.decorator"
import { OrderCancelledEvent } from "../impl/order-cancelled.event"
import { OrdersService } from "src/orders/orders.service"

@EventsHandler(OrderCancelledEvent)
export class OrderCancelledHandler
  implements IEventHandler<OrderCancelledEvent> {
  constructor(private readonly ordersService: OrdersService) { }

  handle(event: OrderCancelledEvent) {
    this.ordersService.removeFromDeliveryQueue(event.id)
    this.ordersService.sendEventToClient(event)
  }
}
