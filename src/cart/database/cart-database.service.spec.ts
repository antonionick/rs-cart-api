import { Test, TestingModule } from '@nestjs/testing';
import { CartDatabaseService } from './cart-database.service';

describe('CartDatabaseService', () => {
  let service: CartDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartDatabaseService],
    }).compile();

    service = module.get<CartDatabaseService>(CartDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
