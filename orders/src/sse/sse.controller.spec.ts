import { Test, TestingModule } from "@nestjs/testing"
import { SSEController } from "./sse.controller"
import { SSEService } from "./sse.service"

describe("SSEController", () => {
  let controller: SSEController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SSEController],
      providers: [SSEService],
    }).compile()

    controller = module.get<SSEController>(SSEController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })
})
