import { Module } from '@nestjs/common';
import { ConsolidationService } from './consolidation.service';
import { ConsolidationGateway } from './consolidation.gateway';
import { CoinbaseModule } from '../coinbase/coinbase.module';
import { CurrencyDataFeedModule } from '../currency-data-feed/currency-data-feed.module';
import { InvestingModule } from '../investing/investing.module';
import { ConsolidationController } from './consolidation.controller';

@Module({
  controllers: [ConsolidationController],
  imports: [CoinbaseModule, CurrencyDataFeedModule, InvestingModule],
  providers: [ConsolidationGateway, ConsolidationService],
})
export class ConsolidationModule {}
