import { Injectable } from '@nestjs/common';
import { CreateHotelTransactionDto } from './dto/create-hotel-transaction.dto';
import { UpdateHotelTransactionDto } from './dto/update-hotel-transaction.dto';

@Injectable()
export class HotelTransactionsService {
  create(createHotelTransactionDto: CreateHotelTransactionDto) {
    return 'This action adds a new hotelTransaction';
  }

  findAll() {
    return `This action returns all hotelTransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelTransaction`;
  }

  update(id: number, updateHotelTransactionDto: UpdateHotelTransactionDto) {
    return `This action updates a #${id} hotelTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelTransaction`;
  }
}
