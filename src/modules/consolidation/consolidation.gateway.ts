import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ConsolidationService } from './consolidation.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
})
export class ConsolidationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ConsolidationGateway.name);
  private intervalId: NodeJS.Timeout;

  constructor(private readonly consolidationService: ConsolidationService) {}

  afterInit() {
    this.logger.log('WebSocket Gateway initialized');
    this.startSendingUpdates();
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  private startSendingUpdates() {
    this.intervalId = setInterval(() => {
      void (async () => {
        try {
          const consolidatedData =
            await this.consolidationService.getConsolidatedData();
          this.server.emit('update', consolidatedData);
        } catch (error) {
          this.logger.error('Error sending consolidated data:', error);
        }
      })();
    }, 5000);
  }

  onModuleDestroy() {
    clearInterval(this.intervalId);
  }
}
