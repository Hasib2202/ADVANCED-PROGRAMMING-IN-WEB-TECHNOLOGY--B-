import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class CreateVolunteerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Matches(/^\d+$/, { message: 'Phone number must contain only numbers' })
  phoneNumber: string;
}

export class VolunteerDto {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Full name should not be empty' })
  @Matches(/^[a-zA-Z\s]*$/, { message: 'Full name should not contain any numbers' })
  fullName?: string;

  @IsNumber({}, { message: 'Phone number should only contain digits' })
  phone: number;
}

export class UpdatePhoneDto {
  // @IsNumber({}, { message: 'Phone number should only contain digits' })
  phone: number;
}