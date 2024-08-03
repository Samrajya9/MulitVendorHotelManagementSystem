import { Test, TestingModule } from '@nestjs/testing';
import { HotelEmployeesService } from './hotel-employees.service';

describe('HotelEmployeesService', () => {
  let service: HotelEmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelEmployeesService],
    }).compile();

    service = module.get<HotelEmployeesService>(HotelEmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
