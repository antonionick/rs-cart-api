import { Test, TestingModule } from '@nestjs/testing';
import { OrderDatabaseService } from './order-database.service';

describe('OrderDatabaseService', () => {
  let service: OrderDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderDatabaseService],
    }).compile();

    service = module.get<OrderDatabaseService>(OrderDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
