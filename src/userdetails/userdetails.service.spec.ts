import { Test, TestingModule } from '@nestjs/testing';
import { UserdetailsService } from './userdetails.service';

describe('UserdetailsService', () => {
  let service: UserdetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserdetailsService],
    }).compile();

    service = module.get<UserdetailsService>(UserdetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
