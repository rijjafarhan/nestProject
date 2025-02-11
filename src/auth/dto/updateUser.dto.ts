import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()   // This field is optional for updating
  @IsString()
  firstName?: string;

  @IsOptional()   // This field is optional for updating
  @IsString()
  lastName?: string;

  @IsOptional()   // This field is optional for updating
  @IsEmail()
  email?: string;

  @IsOptional()   // This field is optional for updating
  @IsString()
  password?: string;
}
