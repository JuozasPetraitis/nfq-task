import { IsEmail, IsString, Matches } from 'class-validator';
import { Service } from '../../model/specialist.model';

export class BookVisitDto {
  @IsEmail()
  email: string;
}
