import { Test, TestingModule } from '@nestjs/testing';
import { AuthHotelController } from './auth_hotel.controller';
import { AuthHotelService } from './auth_hotel.service';

describe('AuthHotelController', () => {
  let controller: AuthHotelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthHotelController],
      providers: [AuthHotelService],
    }).compile();

    controller = module.get<AuthHotelController>(AuthHotelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
