import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelTransactionsService } from './hotel-transactions.service';
import { CreateHotelTransactionDto } from './dto/create-hotel-transaction.dto';
import { UpdateHotelTransactionDto } from './dto/update-hotel-transaction.dto';

@Controller('hotel-transactions')
export class HotelTransactionsController {
  constructor(private readonly hotelTransactionsService: HotelTransactionsService) {}

  @Post()
  create(@Body() createHotelTransactionDto: CreateHotelTransactionDto) {
    return this.hotelTransactionsService.create(createHotelTransactionDto);
  }

  @Get()
  findAll() {
    return this.hotelTransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelTransactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelTransactionDto: UpdateHotelTransactionDto) {
    return this.hotelTransactionsService.update(+id, updateHotelTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelTransactionsService.remove(+id);
  }
}
