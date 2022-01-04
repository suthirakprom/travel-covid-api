import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class AirTicketDto {
  @IsNotEmpty()
  @ApiProperty()
  @Length(3, 3, {
    message: 'source must be equal to 3 characters',
  })
  originLocationCode: string;

  @IsNotEmpty()
  @ApiProperty()
  @Length(3, 3, {
    message: 'destination must be equal to 3 characters',
  })
  destinationLocationCode: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDateString()
  departureDate: string;

  @IsNotEmpty()
  @IsInt()
  adults: number = 1;

  @IsOptional()
  @IsDateString()
  returnDate: string;

  @IsOptional()
  @IsInt()
  children: string;

  @IsOptional()
  @IsInt()
  infants: string;

  @IsOptional()
  @IsString()
  @IsIn(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'])
  travelClass: string;

  @IsOptional()
  @IsString()
  includedAirlineCodes: string;

  @IsOptional()
  @IsString()
  excludedAirlineCodes: string;

  @IsOptional()
  @IsBoolean()
  nonStop: boolean = false;

  @IsOptional()
  @IsString()
  currencyCode: string = 'USD';

  @IsOptional()
  @IsInt()
  maxPrice: number;

  @IsOptional()
  @IsInt()
  max: number = 250;
}
