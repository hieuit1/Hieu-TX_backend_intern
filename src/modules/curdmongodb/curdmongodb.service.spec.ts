import { Test, TestingModule } from '@nestjs/testing';
import { CurdmongodbService } from './curdmongodb.service';

describe('CurdmongodbService', () => {
  let service: CurdmongodbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurdmongodbService],
    }).compile();

    service = module.get<CurdmongodbService>(CurdmongodbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
