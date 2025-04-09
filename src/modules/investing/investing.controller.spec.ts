import { Test, TestingModule } from '@nestjs/testing';
import { InvestingController } from './investing.controller';
import { InvestingService } from './investing.service';

describe('InvestingController', () => {
  let controller: InvestingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestingController],
      providers: [InvestingService],
    }).compile();

    controller = module.get<InvestingController>(InvestingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
