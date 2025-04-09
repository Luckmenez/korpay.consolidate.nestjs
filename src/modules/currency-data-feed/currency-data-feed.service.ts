import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';

@WebSocketGateway()
export class CurrencyDataFeedGateway {
  @WebSocketServer()
  server: WebSocket.Server;

  private readonly logger = new Logger(CurrencyDataFeedGateway.name);

  @SubscribeMessage('login')
  handleLogin(@MessageBody() data: string): string {
    this.logger.log(`Login event received: ${data}`);
    return `Login successful: ${data}`;
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(@MessageBody() pair: string): string {
    this.logger.log(`Subscribe event received for pair: ${pair}`);
    return `Subscribed to pair: ${pair}`;
  }
}
