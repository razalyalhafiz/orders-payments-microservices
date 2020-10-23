import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { DeliverOrderCommand } from "../impl/deliver-order.command"
import { StoreEventBus } from "event-sourcing-nestjs"
import { DateFactory } from "src/common/date.factory"
import { OrderDeliveredEvent } from "src/orders/events/impl/order-delivered.event"

@CommandHandler(DeliverOrderCommand)
export class DeliverOrderHandler
  implements ICommandHandler<DeliverOrderCommand> {
  constructor(
    private readonly eventBus: StoreEventBus,
    private readonly dateFactory: DateFactory
  ) {}

  async execute(command: DeliverOrderCommand) {
    const { id } = command
    const event = new OrderDeliveredEvent(id, this.dateFactory.now())
    this.eventBus.publish(event)
    return event
  }
}
