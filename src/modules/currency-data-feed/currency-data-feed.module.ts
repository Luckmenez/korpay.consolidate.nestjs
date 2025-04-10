import { Module } from '@nestjs/common';
import { CurrencyDataFeedService } from './currency-data-feed.service';
import { CurrencyDataFeedController } from './currency-data-feed.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CurrencyDataFeedController],
  providers: [CurrencyDataFeedService],
  exports: [CurrencyDataFeedService],
})
export class CurrencyDataFeedModule {}
