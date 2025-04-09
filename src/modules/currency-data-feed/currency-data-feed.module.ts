import { Module } from '@nestjs/common';
import { CurrencyDataFeedGateway } from './currency-data-feed.service';
import { CurrencyDataFeedController } from './currency-data-feed.controller';

@Module({
  controllers: [CurrencyDataFeedController],
  providers: [CurrencyDataFeedGateway],
})
export class CurrencyDataFeedModule {}
