import { IsDateString, IsEmail, IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';

export class CreateEventDto {
  readonly name: string;
  readonly age: number;
  readonly email: string;
}

export class UpdateEventDto {
  readonly name?: string;
  readonly age?: number;
  readonly email?: string;
}

export class EventDto {
  // @IsString({ message : "Please enter a vlid name"})
  // @Matches(/^[A-Za-z]+$/,{message: "Please enter a valid name"})
  @IsString({ message : "Please enter a vlid name"})
  fullname: string;

  @IsNotEmpty({ message : "Id must be number"})
  id: number;

  @IsString({ message : "Password must be string"})
  password: string;

  @IsEmail({})
  username: string;
    name: string;
}

export class CoorDto {
  @IsString()
  @Matches(/^[a-zA-Z\s]*$/, { message: 'Name field should not contain any numbers' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/[@#$&]/, { message: 'Password must contain one of the special characters (@, #, $, &)' })
  password: string;

  @IsDateString({}, { message: 'Date must be a valid date type' })
  date: Date;

  @IsUrl({}, { message: 'Social media link must be a valid URL' })
  socialMediaLink: string;
}

export class loginDto {
  @IsNotEmpty() username: string;
  @IsNotEmpty() password: string; 
}

export class EventUpdateDto {
  @IsEmail()
  'username': string;
  'address': string;
}
