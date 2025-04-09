import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvestingModule } from './modules/investing/investing.module';
import { CoinbaseModule } from './modules/coinbase/coinbase.module';
import { CurrencyDataFeedModule } from './modules/currency-data-feed/currency-data-feed.module';

@Module({
  imports: [InvestingModule, CoinbaseModule, CurrencyDataFeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
