import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CovidService {
  async getCovidAll(): Promise<any | undefined> {
    var axios = require('axios').default;

    var options = {
      method: 'GET',
      url: 'https://worldometers.p.rapidapi.com/api/coronavirus/all/',
      headers: {
        'x-rapidapi-host': 'worldometers.p.rapidapi.com',
        'x-rapidapi-key': 'b8af34ec5amshf1127a2c70c1af1p1e70efjsn6c8cff007dbb',
      },
    };

    const connection = axios
      .request(options)
      .then(function (response) {
        const allCovidInfo = response.data;
        return allCovidInfo;
      })
      .catch(function (error) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: error['response']['data'],
          },
          HttpStatus.FORBIDDEN,
        );
      });
    return connection;
  }
}
