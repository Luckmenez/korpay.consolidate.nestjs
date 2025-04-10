import { Test, TestingModule } from '@nestjs/testing';
import { ConsolidationGateway } from './consolidation.gateway';
import { ConsolidationService } from './consolidation.service';

describe('ConsolidationGateway', () => {
  let gateway: ConsolidationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsolidationGateway, ConsolidationService],
    }).compile();

    gateway = module.get<ConsolidationGateway>(ConsolidationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
