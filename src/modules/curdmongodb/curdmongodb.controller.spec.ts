import { Test, TestingModule } from '@nestjs/testing';
import { CurdmongodbController } from './curdmongodb.controller';

describe('CurdmongodbController', () => {
  let controller: CurdmongodbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurdmongodbController],
    }).compile();

    controller = module.get<CurdmongodbController>(CurdmongodbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
