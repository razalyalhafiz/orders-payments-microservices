import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { Redisk } from "redisk"
import { Order } from "src/orders/entities/order.entity"
import { GetOrdersQuery } from "../impl"

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(private readonly redisk: Redisk) {}

  async execute(query: GetOrdersQuery) {
    return await this.redisk.list<Order>(Order)
  }
}
