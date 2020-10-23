import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateOrderCommand } from "../impl/create-order.command"
import { OrderCreatedEvent } from "src/orders/events/impl/order-created.event"
import { StoreEventBus } from "event-sourcing-nestjs"
import { UidGenerator } from "src/common/uid-generator"
import { DateFactory } from "src/common/date.factory"
import { OrderState } from "src/enums/order-state.enum"

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly eventBus: StoreEventBus,
    private readonly uid: UidGenerator,
    private readonly dateFactory: DateFactory
  ) {}

  async execute(command: CreateOrderCommand) {
    const { name, email } = command
    const id = this.uid.generate()
    const event = new OrderCreatedEvent(
      id,
      name,
      email,
      OrderState.CREATED,
      this.dateFactory.now()
    )
    this.eventBus.publish(event)
    return event
  }
}
