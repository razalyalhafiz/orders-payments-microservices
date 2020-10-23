import { Injectable, Logger, Req, Res } from '@nestjs/common';
import { Request, Response } from 'nestjs-sse';

interface SSEClient {
  id: number;
  res: Response;
}

@Injectable()
export class SSEService {
  private clients: SSEClient[] = [];
  private readonly logger = new Logger(SSEService.name)

  connect(@Res() res: Response, @Req() req: Request): void {
    const clientId = Date.now();
    const newClient = {
      id: clientId,
      res: res,
    };
    this.clients.push(newClient);
    this.logger.verbose(`${clientId} connection opened`);

    req.on('close', () => {
      this.logger.verbose(`${clientId} connection closed`);
      this.clients = this.clients.filter(c => c.id !== clientId);
    });
  }

  write(data: any) {
    this.clients.forEach(client =>
      client.res.sse(`data: ${JSON.stringify(data)}\n\n`),
    );
  }
}
