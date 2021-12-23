import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { stringify } from 'querystring';

let apiKey = '';

@Injectable()
export class AreaInfoService {
  constructor(private httpService: HttpService) {}

  async getApiKey() {
    const res = await this.httpService
      .post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        stringify({
          grant_type: 'client_credentials',
          client_id: process.env.AMADEUS_API_KEY,
          client_secret: process.env.AMADEUS_API_SECRET,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .toPromise();
    apiKey = res.data.access_token;
  }
  async getArea(country: string) {
    console.log(country);
    try {
      const res = await this.getAreaInformationData(country);
      return res;
    } catch {
      await this.getApiKey();
      const res = await this.getAreaInformationData(country);
      return res;
    }
  }

  async getAreaInformationData(country: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const axios = require('axios').default;
    const options = {
      method: 'GET',
      url: `https://test.api.amadeus.com/v1/duty-of-care/diseases/covid19-area-report?countryCode=${country}`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };
    const conection = axios
      .request(options)
      .then(function (response) {
        const areaInfo = response.data;
        return areaInfo;
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
    return conection;
  }
}
