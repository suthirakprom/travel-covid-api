import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { query } from 'express';
import { stringify } from 'querystring';

let apiKey = '';

@Injectable()
export class EntryRestrictionService {
  constructor(private httpService: HttpService) {}

  async getApiKey() {
    const res = await this.httpService
      .post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        stringify({
          grant_type: 'client_credentials',
          client_id: process.env.AMADEUS_CLIENT_ID,
          client_secret: process.env.AMADEUS_CLIENT_SECRET,
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

  async getEntry(country: string) {
    try {
      const res = await this.getEntryRestrictionData(country);
      return res;
    } catch {
      await this.getApiKey();
      const res = await this.getEntryRestrictionData(country);
      return res;
    }
  }

  async getEntryRestrictionData(country: string) {
    const res = await this.httpService
      .get(
        `https://test.api.amadeus.com/v1/duty-of-care/diseases/covid19-area-report?countryCode=${country}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      )
      .toPromise();
    return res.data.data.areaAccessRestriction.entry;
  }
}
