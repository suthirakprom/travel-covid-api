import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { AirTicketService } from './air-ticket.service';
import { AirTicketDto } from './dto/air-ticket.dto';

@ApiSecurity('api_key', ['api_key'])
@Controller()
export class AirTicketController {
  constructor(private readonly airTicketService: AirTicketService) {}

  @Post('air-ticket-info')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async getAirTicket(@Body() airTicketDto: AirTicketDto): Promise<any> {
    return await this.airTicketService.getAirTicket(airTicketDto);
  }

  @Post('search-air-ticket')
  async searchAirTicket(@Body() airTicketDto: AirTicketDto): Promise<any> {
    return await this.airTicketService.searchAirTicket(airTicketDto);
  }
}
