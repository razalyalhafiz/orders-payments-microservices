import { Controller, Get, Res, Req } from "@nestjs/common"
import { Request, Response } from "nestjs-sse"
import { SSEService } from "./sse.service"

@Controller("sse")
export class SSEController {
  constructor(private readonly sseService: SSEService) {}

  @Get()
  connect(@Res() res: Response, @Req() req: Request): void {
    this.sseService.connect(res, req)
  }
}
