import { StorableEvent } from "event-sourcing-nestjs"
import { OrderState } from "src/enums/order-state.enum"

export class OrderCreatedEvent extends StorableEvent {
  eventAggregate = "order"
  eventVersion = 1

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly state: OrderState,
    public readonly created: Date
  ) {
    super()
  }
}
