import { describe } from 'node:test';
import { AuthController } from './auth.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('auth controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
