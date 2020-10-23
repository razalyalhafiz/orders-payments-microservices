import { Entity } from "redisk"
import { Primary } from "redisk"
import { Property } from "redisk"
import { OrderState } from "src/enums/order-state.enum"

@Entity("order")
export class Order {
  @Primary()
  @Property()
  public readonly id: string

  @Property()
  public name: string

  @Property()
  public email: string

  @Property()
  public state: string

  @Property({ indexed: true })
  public readonly created: Date

  constructor(
    id: string,
    name: string,
    email: string,
    state: OrderState,
    created: Date
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.state = state
    this.created = created
  }
}
