import { IsEmail } from 'class-validator';

export class BookVisitDto {
  @IsEmail()
  email: string;
}
