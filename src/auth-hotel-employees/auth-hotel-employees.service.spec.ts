import { Test, TestingModule } from '@nestjs/testing';
import { AuthHotelEmployeesService } from './auth-hotel-employees.service';

describe('AuthHotelEmployeesService', () => {
  let service: AuthHotelEmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthHotelEmployeesService],
    }).compile();

    service = module.get<AuthHotelEmployeesService>(AuthHotelEmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
