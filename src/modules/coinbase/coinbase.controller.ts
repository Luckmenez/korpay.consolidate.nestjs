import { Controller, Get } from '@nestjs/common';
import { CoinbaseService } from './coinbase.service';

@Controller('coinbase')
export class CoinbaseController {
  constructor(private readonly coinbaseService: CoinbaseService) {}
  @Get('usdt')
  getUsdtData() {
    return this.coinbaseService.getUsdtData();
  }
}
