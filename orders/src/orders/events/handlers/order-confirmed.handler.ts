import { IEventHandler } from "@nestjs/cqrs"
import { EventsHandler } from "@nestjs/cqrs/dist/decorators/events-handler.decorator"
import { OrderConfirmedEvent } from "../impl/order-confirmed.event"
import { OrdersService } from "src/orders/orders.service"
import { OrderState } from "src/enums/order-state.enum"

@EventsHandler(OrderConfirmedEvent)
export class OrderConfirmedHandler
  implements IEventHandler<OrderConfirmedEvent> {
  constructor(private readonly ordersService: OrdersService) { }

  handle(event: OrderConfirmedEvent) {
    this.ordersService.addToDeliveryQueue(event.id)
    this.ordersService.sendEventToClient(event)
  }
}
