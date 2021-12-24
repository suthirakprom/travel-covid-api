import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AirTicketService {
  async getAirTicket(): Promise<any> {
    var axios = require('axios').default;

    var options = {
      method: 'GET',
      url: 'https://test.api.amadeus.com/v2/shopping/flight-offers',
      params: {
        originLocationCode: 'PNH',
        destinationLocationCode: 'TYO',
        departureDate: '2021-12-25',
        adults: 1,
        nonStop: false,
        currencyCode: 'USD',
        max: 250,
      },
      headers: {
        Authorization: `Bearer MclB76esI77QEV7YfkE8rtYS3fts`,
      },
    };

    const response = axios
      .request(options)
      .then(function (response: any) {
        return response.data;
      })
      .catch(function (error: any) {
        throw new HttpException(error.response.data, error.response.status);
      });
    return response;
  }
}
