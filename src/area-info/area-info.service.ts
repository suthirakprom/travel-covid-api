import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { stringify } from 'querystring';

@Injectable()
export class AreaInfoService {
  constructor(private httpService: HttpService) {}

  async getApiKey(): Promise<string> {
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
    return res.data.access_token;
  }

  async areaRegulation(countryCode: string) {
    const apiKey = await this.getApiKey();
    countryCode = countryCode.toUpperCase();
    try {
      const areaInfo = await this.httpService
        .get(
          `https://test.api.amadeus.com/v1/duty-of-care/diseases/covid19-area-report?countryCode=${countryCode}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          },
        )
        .toPromise();
      const data = areaInfo.data.data;
      const response: object = {
        area: data.area,
        areaPolicy: data.areaPolicy,
        transportation: data.areaAccessRestriction.transportation,
        tracingApplication: data.areaAccessRestriction.tracingApplication,
        mask: data.areaAccessRestriction.mask,
      };

      return response;
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
