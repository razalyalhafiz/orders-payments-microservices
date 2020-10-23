import { IEventHandler } from "@nestjs/cqrs"
import { EventsHandler } from "@nestjs/cqrs/dist/decorators/events-handler.decorator"
import { OrderDeliveredEvent } from "../impl/order-delivered.event"
import { OrdersService } from "src/orders/orders.service"

@EventsHandler(OrderDeliveredEvent)
export class OrderDeliveredHandler
  implements IEventHandler<OrderDeliveredEvent> {
  constructor(private readonly ordersService: OrdersService) { }

  handle(event: OrderDeliveredEvent) {
    this.ordersService.sendEventToClient(event)
  }
}
