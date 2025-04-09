import { Controller, Get } from '@nestjs/common';
import { InvestingService } from './investing.service';

@Controller('investing')
export class InvestingController {
  constructor(private readonly investingService: InvestingService) {}

  @Get('usdt')
  getUsdtData() {
    return this.investingService.getUsdtData();
  }
}
