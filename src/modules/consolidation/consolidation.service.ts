import { Injectable } from '@nestjs/common';
import { CoinbaseService } from '../coinbase/coinbase.service';
import { InvestingService } from '../investing/investing.service';
import { CurrencyDataFeedService } from '../currency-data-feed/currency-data-feed.service';

export type currentValidLinkType =
  | 'coinBaseData'
  | 'investingData'
  | 'currencyDataFeedData';
@Injectable()
export class ConsolidationService {
  private currentValidLink: currentValidLinkType;
  constructor(
    private readonly coinbaseService: CoinbaseService,
    private readonly investingService: InvestingService,
    private readonly currencyDataFeedService: CurrencyDataFeedService,
  ) {}

  getCurrentValidLink(): string {
    return this.currentValidLink;
  }

  setCurrentValidLink(link: currentValidLinkType): void {
    this.currentValidLink = link;
  }

  async getConsolidatedData() {
    try {
      const coinBaseData = await this.coinbaseService.getUsdtData();
      const investingData = await this.investingService.getUsdtData();
      const currencyDataFeedData =
        await this.currencyDataFeedService.getUsdtData();

      return {
        lastUpdate: new Date(),
        currentValidLink: this.currentValidLink || 'investingData',
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
