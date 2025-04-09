import { Module } from '@nestjs/common';
import { InvestingService } from './investing.service';
import { InvestingController } from './investing.controller';

@Module({
  controllers: [InvestingController],
  providers: [InvestingService],
})
export class InvestingModule {}
