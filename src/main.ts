import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsClientAdapter } from './modules/currency-data-feed/ws-client.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsClientAdapter(app));
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
