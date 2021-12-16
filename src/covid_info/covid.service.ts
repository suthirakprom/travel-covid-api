import { Injectable } from '@nestjs/common';

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
        const allCovidInfo = response.data
        // const last_update = allCovidInfo['last_update']
        // const USA = allCovidInfo['data'][1]
        // console.log(USA)
        // console.log(last_update)
        console.log(allCovidInfo)
        return allCovidInfo;
      })
      .catch(function (error) {
        console.error(error);
      });

      return connection
  }
}
