import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { Redisk } from "redisk"
import { Order } from "src/orders/entities/order.entity"
import { CheckStatusQuery } from "../impl"

@QueryHandler(CheckStatusQuery)
export class CheckStatusHandler implements IQueryHandler<CheckStatusQuery> {
  constructor(private readonly redisk: Redisk) { }

  async execute(query: CheckStatusQuery) {
    const order = await this.redisk.getOne<Order>(Order, query.id)
    return { id: order.id, status: order.state }
  }
}
