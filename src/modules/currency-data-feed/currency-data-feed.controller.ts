import { Controller, Get } from '@nestjs/common';
import { CurrencyDataFeedService } from './currency-data-feed.service';

@Controller('currency-data-feed')
export class CurrencyDataFeedController {
  constructor(
    private readonly currencyDataFeedService: CurrencyDataFeedService,
  ) {}

  @Get('usdt')
  getUsdtData() {
    return this.currencyDataFeedService.getUsdtData();
  }
}
