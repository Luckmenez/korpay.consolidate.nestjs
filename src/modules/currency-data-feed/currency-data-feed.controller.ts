import { Controller, Get } from '@nestjs/common';
import { CurrencyDataFeedGateway } from './currency-data-feed.service';
// import { CurrencyDataFeedService } from './currency-data-feed.service';

@Controller('currency-data-feed')
export class CurrencyDataFeedController {
  constructor(
    private readonly currencyDataFeedService: CurrencyDataFeedGateway,
  ) {}

  @Get('usdt')
  getUsdtData() {
    return 'usdt';
  }
}
