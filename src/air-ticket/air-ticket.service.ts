import { HttpException, Injectable } from '@nestjs/common';
import { AirTicketDto } from './dto/air-ticket.dto';
const axios = require('axios').default;
const qs = require('qs');

@Injectable()
export class AirTicketService {
  private async getAccessToken(): Promise<any> {
    const accessOptions = {
      method: 'POST',
      url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
      data: qs.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    };

    const token = axios
      .request(accessOptions)
      .then((access_response: any) => {
        return access_response.data['access_token'];
      })
      .catch((error: any) => {
        throw new HttpException(error.response.data, error.response.status);
      });
    return token;
  }

  async getAirTicket(airTicketDto: AirTicketDto): Promise<any> {
    const token = await this.getAccessToken();

    const options = {
      method: 'GET',
      url: 'https://test.api.amadeus.com/v2/shopping/flight-offers',
      params: {
        originLocationCode: airTicketDto.originLocationCode,
        destinationLocationCode: airTicketDto.destinationLocationCode,
        departureDate: airTicketDto.departureDate,
        adults: airTicketDto.adults,
        returnDate: airTicketDto.returnDate,
        children: airTicketDto.children,
        infants: airTicketDto.infants,
        travelClass: airTicketDto.travelClass,
        includedAirlineCodes: airTicketDto.includedAirlineCodes,
        excludedAirlineCodes: airTicketDto.excludedAirlineCodes,
        nonStop: airTicketDto.nonStop,
        currencyCode: airTicketDto.currencyCode,
        maxPrice: airTicketDto.maxPrice,
        max: airTicketDto.max,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const airdata = axios
      .request(options)
      .then((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw new HttpException(error.response.data, error.response.status);
      });
    return airdata;
  }
}
