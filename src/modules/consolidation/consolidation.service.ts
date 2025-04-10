import { Injectable } from '@nestjs/common';
import { CoinbaseService } from '../coinbase/coinbase.service';
import { InvestingService } from '../investing/investing.service';
import { CurrencyDataFeedService } from '../currency-data-feed/currency-data-feed.service';

@Injectable()
export class ConsolidationService {
  constructor(
    private readonly coinbaseService: CoinbaseService,
    private readonly investingService: InvestingService,
    private readonly currencyDataFeedService: CurrencyDataFeedService,
  ) {}
  async getConsolidatedData() {
    try {
      const coinBaseData = await this.coinbaseService.getUsdtData();
      const investingData = await this.investingService.getUsdtData();
      const currencyDataFeedData =
        await this.currencyDataFeedService.getUsdtData();

      return {
        coinBaseData,
        investingData,
        currencyDataFeedData: {
          ...currencyDataFeedData,
          usdt: coinBaseData?.usdt,
        },
      };
    } catch (error) {
      console.error('Error fetching consolidated data:', error);
      throw error;
    }
  }
}
