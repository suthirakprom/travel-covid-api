import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, SerializeOptions } from '@nestjs/common';
import { Country, CountryDocument } from './schemas/country.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Collection, Model } from 'mongoose';

@Injectable()
export class EntryRestrictionService {
  constructor(
    private httpService: HttpService,
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
  ) {}

  async getEntryRestrictionByCountry(
    country: string,
    source: string,
    vaccinated: boolean,
  ) {
    country = country.toUpperCase();
    source = source.toUpperCase();
    const data: any = await this.countryModel.findOne({
      destination_iso: country,
    });
    let destinationData;
    try {
      data.destinations.forEach(async (destination) => {
        if (
          destination.departure_iso == source &&
          String(destination.is_vaccinated) == String(vaccinated)
        ) {
          let today = new Date();
          let date =
            today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate();
          let oldDate = new Date(destination.date);
          let newDate = new Date(date);
          let differences =
            (newDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24);
          if (differences >= 14) {
            destinationData = await this.getEntryRestrictionFromCanITravel(
              country,
              source,
              vaccinated,
            );
          } else {
            destinationData = destination;
          }
        }
      });
      if (!destinationData) {
        destinationData = await this.getEntryRestrictionFromCanITravel(
          country,
          source,
          vaccinated,
        );
      }
      data.destinations = undefined;
    } catch {
      destinationData = await this.getEntryRestrictionFromCanITravel(
        country,
        source,
        vaccinated,
      );
    }
    let newData = {
      destination_name: data.destination_name,
      destination_iso: data.destination_iso,
      ...destinationData,
    };
    return newData;
  }

  async getEntryRestrictionFromCanITravel(
    country: string,
    source: string,
    vaccinated: boolean,
  ) {
    const destination = await this.httpService
      .get(
        `https://api.canitravel.net/api/v1/countries/${country}?from=${source}&passport=${source}&vaccinated=${vaccinated}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CANITRAVEL_API_KEY}`,
          },
        },
      )
      .toPromise();
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    let data = {
      ...destination.data.data.travel_status,
      date: date,
    };
    await this.countryModel.findOneAndUpdate(
      { destination_iso: country },
      {
        $addToSet: {
          destinations: data,
        },
      },
    );
    return data;
  }

  async getEntryRestriction() {
    const countries: any = await this.countryModel.find();
    const newCountries = [];
    countries.forEach((country) => {
      newCountries.push({
        country: country.destination_name,
        iso: country.destination_iso,
        status: country.travel_status.result_text,
      });
    });
    return newCountries;
  }
}
