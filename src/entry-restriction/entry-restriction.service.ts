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
      iso: country,
      vaccinated: vaccinated,
    });
    let destinationData;
    try {
      data.destinations.forEach(async (destination) => {
        if (destination.departure_iso == source) {
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
            await this.countryModel.updateOne(
              { _id: data._id },
              {
                $pullAll: { destinations: [destination] },
              },
            );
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
    } catch {
      destinationData = await this.getEntryRestrictionFromCanITravel(
        country,
        source,
        vaccinated,
      );
    }
    let newData = {
      country: data.country,
      iso: data.iso,
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
      { iso: country, vaccinated: vaccinated },
      {
        $addToSet: {
          destinations: data,
        },
      },
    );
    return data;
  }

  async getEntryRestriction(vaccinated) {
    const countries: any = await this.countryModel.find({
      vaccinated: vaccinated,
    });
    const newCountries = [];
    countries.forEach((country) => {
      newCountries.push({
        country: country.country,
        iso: country.iso,
        status: country.status,
      });
    });
    return newCountries;
  }
}
