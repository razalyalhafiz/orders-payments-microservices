import { Test, TestingModule } from "@nestjs/testing"
import { SSEService } from "./sse.service"

describe("SSEService", () => {
  let service: SSEService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SSEService],
    }).compile()

    service = module.get<SSEService>(SSEService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
