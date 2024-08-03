import { Test, TestingModule } from '@nestjs/testing';
import { AuthHotelEmployeesController } from './auth-hotel-employees.controller';
import { AuthHotelEmployeesService } from './auth-hotel-employees.service';

describe('AuthHotelEmployeesController', () => {
  let controller: AuthHotelEmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthHotelEmployeesController],
      providers: [AuthHotelEmployeesService],
    }).compile();

    controller = module.get<AuthHotelEmployeesController>(AuthHotelEmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
