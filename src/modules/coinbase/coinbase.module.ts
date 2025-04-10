import { Module } from '@nestjs/common';
import { CoinbaseService } from './coinbase.service';
import { CoinbaseController } from './coinbase.controller';

@Module({
  controllers: [CoinbaseController],
  providers: [CoinbaseService],
  exports: [CoinbaseService],
})
export class CoinbaseModule {}
