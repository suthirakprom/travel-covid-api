import { Injectable } from '@nestjs/common';

@Injectable()
export class CovidService {
  getCovidAll(): Array<any> {
    var axios = require('axios').default;

    var options = {
      method: 'GET',
      url: 'https://worldometers.p.rapidapi.com/api/coronavirus/all/',
      headers: {
        'x-rapidapi-host': 'worldometers.p.rapidapi.com',
        'x-rapidapi-key': 'b8af34ec5amshf1127a2c70c1af1p1e70efjsn6c8cff007dbb',
      },
    };

    let data = axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });

    return data;
  }
}
