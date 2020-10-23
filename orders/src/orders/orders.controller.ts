import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { GetOrdersQuery } from "./queries/impl"
import { Order } from "./entities/order.entity"
import { CreateOrderDto } from "./dtos/create-order.dto"
import { CreateOrderCommand } from "./commands/impl/create-order.command"
import { CancelOrderCommand } from "./commands/impl/cancel-order.command"
import { EventPattern } from "@nestjs/microservices"
import { ConfirmOrderCommand } from "./commands/impl/confirm-order.command"
import { AuthGuard } from "src/auth/auth.guard"

@Controller("api/v1/orders")
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return this.commandBus.execute(new CreateOrderCommand(dto.name, dto.email))
  }

  @UseGuards(AuthGuard)
  @Patch(":id/cancel")
  async cancel(@Param("id") id: string) {
    return this.commandBus.execute(
      new CancelOrderCommand(id, "cancelled by user")
    )
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(): Promise<Order> {
    return this.queryBus.execute(new GetOrdersQuery())
  }

  @EventPattern("payment_confirmed")
  async handlePaymentConfirmed(data: any) {
    this.commandBus.execute(new ConfirmOrderCommand(data.orderId))
  }

  @EventPattern("payment_declined")
  async handlePaymentDeclined(data: any) {
    this.commandBus.execute(
      new CancelOrderCommand(data.orderId, "payment_declined")
    )
  }
}
