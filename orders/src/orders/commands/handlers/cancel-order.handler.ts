import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CancelOrderCommand } from "../impl/cancel-order.command"
import { StoreEventBus } from "event-sourcing-nestjs"
import { DateFactory } from "src/common/date.factory"
import { OrderCancelledEvent } from "src/orders/events/impl/order-cancelled.event"

@CommandHandler(CancelOrderCommand)
export class CancelOrderHandler implements ICommandHandler<CancelOrderCommand> {
  constructor(
    private readonly eventBus: StoreEventBus,
    private readonly dateFactory: DateFactory
  ) {}

  async execute(command: CancelOrderCommand) {
    const { id, reason } = command
    const event = new OrderCancelledEvent(id, reason, this.dateFactory.now())
    this.eventBus.publish(event)
    return event
  }
}
