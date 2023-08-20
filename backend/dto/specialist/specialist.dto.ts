import { IsEmail, IsString, Matches } from 'class-validator';
import { Service } from '../../model/specialist.model';

export class SpecialistDto {
  @IsString()
  @Matches(/^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/, {
    message:
      'Full name should have at least 3 letters for first and last name, separated by a space',
  })
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  service: Service;
}
