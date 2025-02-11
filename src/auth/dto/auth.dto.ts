//this is to create an interface for the request body because  by using @Body , we get access to the body but not the structure of the request body

import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password:string

    firstName: string
    lastName: string
}