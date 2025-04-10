import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

interface GetUsdtDataResponse {
  status: boolean;
  currency: {
    currency: 'USD/BRL';
    value: '5.9021';
    change: '0.0784';
    change_percent: '1.35';
    weekly_change: '0.2415';
    weekly_change_percent: '4.27';
    monthly_change: '0.112';
    monthly_change_percent: '1.93';
    yearly_change: '-0.2825';
    yearly_change_percent: '-4.57';
    ask: '5.9032';
    bid: '5.9011';
    daily_lowest: '5.8187';
    daily_highest: '5.9126';
    open_today: '5.8237';
    date: '2025-04-10 17:40:11';
    type: 'original';
  }[];
}

@Injectable()
export class CurrencyDataFeedService {
  constructor(private readonly httpService: HttpService) {}
  async getUsdtData() {
    const { data } = await firstValueFrom(
      this.httpService
        .get<GetUsdtDataResponse>(
          'https://currencydatafeed.com/api/data.php?currency=USD/BRL&token=xex17elzxsaynyiikh7t',
        )
        .pipe(
          catchError((error) => {
            console.error('Error fetching data:', error);
            throw new Error('Failed to fetch data');
          }),
        ),
    );

    return {
      usdtSpot: Number(data.currency[0].value),
    };
  }
}
