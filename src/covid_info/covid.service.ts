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

  async getCovidByCountry(country_code: string): Promise<any | undefined> {
    var axios = require('axios').default;
    var countries = require("i18n-iso-countries")
    var nameCode = require('../../country_code.json')

    var cname;
    if (country_code.length > 2){
      cname = nameCode[countries.alpha3ToAlpha2(country_code.toUpperCase())]
    } else {
      cname = nameCode[country_code.toUpperCase()]
    }

    var options = {
      method: 'GET',
      url: 'https://worldometers.p.rapidapi.com/api/coronavirus/country/' + cname,//countries.getName(country, "en", {select: "alias"}),
      headers: {
        'x-rapidapi-host': 'worldometers.p.rapidapi.com',
        'x-rapidapi-key': 'b8af34ec5amshf1127a2c70c1af1p1e70efjsn6c8cff007dbb',
      },
    };

    const connection = axios
      .request(options)
      .then(function (response) {
        const covidInfoByCountry = response.data;
        return covidInfoByCountry;
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



  async getCovidHistory(country: string,lastdays:string):Promise<any>{
  
    var axios = require('axios').default;
    var countries = require("i18n-iso-countries")
    var nameCode = require('../../country_code.json')

    var cname;
    if (country.length > 2){
      cname = nameCode[countries.alpha3ToAlpha2(country.toUpperCase())]
    } else {
      cname = nameCode[country.toUpperCase()]
    }
        

    var options = {
      method: 'GET',
      url: "https://disease.sh/v3/covid-19/historical/"+cname+"?lastdays="+lastdays,
    };

    const connection = axios
    .request(options)
    .then(function (response) {
      const covidInfoByCountry = response.data;
      return covidInfoByCountry;
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
