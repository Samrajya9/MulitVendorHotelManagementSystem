import { Test, TestingModule } from '@nestjs/testing';
import { HotelEmployeesController } from './hotel-employees.controller';
import { HotelEmployeesService } from './hotel-employees.service';

describe('HotelEmployeesController', () => {
  let controller: HotelEmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelEmployeesController],
      providers: [HotelEmployeesService],
    }).compile();

    controller = module.get<HotelEmployeesController>(HotelEmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
