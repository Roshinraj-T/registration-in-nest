import { Test, TestingModule } from '@nestjs/testing';
import { UserdetailsController } from './userdetails.controller';
import { UserdetailsService } from './userdetails.service';

describe('UserdetailsController', () => {
  let controller: UserdetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserdetailsController],
      providers: [UserdetailsService],
    }).compile();

    controller = module.get<UserdetailsController>(UserdetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
