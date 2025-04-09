import { Test, TestingModule } from '@nestjs/testing';
import { InvestingService } from './investing.service';

describe('InvestingService', () => {
  let service: InvestingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestingService],
    }).compile();

    service = module.get<InvestingService>(InvestingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
