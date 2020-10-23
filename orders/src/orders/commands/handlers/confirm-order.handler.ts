import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ConfirmOrderCommand } from "../impl/confirm-order.command"
import { StoreEventBus } from "event-sourcing-nestjs"
import { DateFactory } from "src/common/date.factory"
import { OrderConfirmedEvent } from "src/orders/events/impl/order-confirmed.event"

@CommandHandler(ConfirmOrderCommand)
export class ConfirmOrderHandler
  implements ICommandHandler<ConfirmOrderCommand> {
  constructor(
    private readonly eventBus: StoreEventBus,
    private readonly dateFactory: DateFactory
  ) {}

  async execute(command: ConfirmOrderCommand) {
    const { id } = command
    const event = new OrderConfirmedEvent(id, this.dateFactory.now())
    this.eventBus.publish(event)
    return event
  }
}
