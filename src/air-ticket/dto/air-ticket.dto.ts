import { IsDate, IsDateString, IsNotEmpty, Length } from 'class-validator';

export class AirTicketDto {
  @IsNotEmpty()
  @Length(3, 3, {
    message: 'source must be equal to 3 characters',
  })
  source: string;

  @IsNotEmpty()
  @Length(3, 3, {
    message: 'destination must be equal to 3 characters',
  })
  destination: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
