//this is to create an interface for the request body because  by using @Body , we get access to the body but not the structure of the request body

import { IsEmail, IsNotEmpty, IsString,IsEnum ,IsOptional} from "class-validator"
import { Role } from '@prisma/client';
export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password:string

    @IsEnum(Role) 
    role: Role;

    @IsOptional()
    @IsString()
    firstName: string

    @IsOptional()
    @IsString()
    lastName: string
}