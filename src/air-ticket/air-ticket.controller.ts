import { Controller, Get } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { AirTicketService } from './air-ticket.service';

@ApiSecurity('api_key', ['api_key'])
@Controller()
export class AirTicketController {
  constructor(private readonly airTicketService: AirTicketService) {}

  @Get('air-ticket-info')
  async getAirTicket(): Promise<any> {
    return await this.airTicketService.getAirTicket();
  }
}
