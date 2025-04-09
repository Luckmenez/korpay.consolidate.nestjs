import {
  INestApplicationContext,
  WebSocketAdapter,
  WsMessageHandler,
} from '@nestjs/common';
import { fromEvent, Observable } from 'rxjs';
import { filter, map, mergeMap, share, takeUntil } from 'rxjs/operators';
import * as WebSocket from 'ws';

export class WsClientAdapter implements WebSocketAdapter {
  private client: WebSocket;

  constructor(private app: INestApplicationContext) {}

  create(): WebSocket {
    this.client = new WebSocket('wss://ws.currencydatafeed.com');
    return this.client;
  }

  bindClientConnect(server: any, callback: (event: WebSocket.Event) => void) {
    this.client.on('open', callback);
  }

  bindMessageHandlers(
    client: WebSocket,
    handlers: WsMessageHandler[],
    transform: (data: any) => Observable<any>,
  ) {
    const disconnect$ = fromEvent(client as any, 'close').pipe(
      share(),
      takeUntil(fromEvent(client as any, 'error')),
    );

    console.log('Client connected:', client);
    handlers.forEach(({ message, callback }) => {
      const source$ = fromEvent(client as any, 'message').pipe(
        map((event: WebSocket.MessageEvent) => {
          console.log('Received message:', event.data);
          return event.data.toString();
        }),
        mergeMap((payload: any) => transform(callback(payload))),
        filter((response: any) => response !== undefined),
        takeUntil(disconnect$),
      );

      source$.subscribe((response) => {
        client.send(JSON.stringify(response));
      });
    });
  }

  close(server: WebSocket.Server) {
    server.close();
  }
}
