import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetUsdtDataModel } from './model/get-usdt-data.model';

@Injectable()
export class CoinbaseService {
  async getUsdtData() {
    try {
      const spot = await axios.get<GetUsdtDataModel>(
        'https://api.coinbase.com/v2/prices/USD-BRL/spot',
      );
      const usdt = await axios.get<GetUsdtDataModel>(
        'https://api.coinbase.com/v2/prices/USDT-USD/spot',
      );

      return {
        usdtSpot: spot.data.data.amount,
        usdt: usdt.data.data.amount,
      };
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
