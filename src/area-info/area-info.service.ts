import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AreaInfoService {
  constructor(private httpService: HttpService) {}
  async areaRegulation(countryCode: string): Promise<object> {
    try {
      const areaInfo = await this.httpService
        .get(`https://api.canitravel.net/api/v1/countries/${countryCode}`, {
          headers: {
            Authorization: `Bearer ${process.env.CANITRAVEL_TOKEN}`,
          },
        })
        .toPromise();
      const data = areaInfo.data.data.travel_status;
      const res = {
        summary_text: data.summary_text,
        result_text: data.result_text,
        is_mask_required: data.is_mask_required,
        is_mask_required_text: data.is_mask_required_text,
        quarantine: data.quarantine,
        covid_test_before_departure: data.covid_test_before_departure,
        full_info_text_html: data.full_info_text_html,
      };

      return res;
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
