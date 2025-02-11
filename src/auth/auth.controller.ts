import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { ParseIntPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService) {}
    
    @Post('signup')
    signup(@Body() dto:AuthDto){ //@Body gets the body of the request
       
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto:AuthDto){
        return this.authService.signin(dto)
    }

    @Get('getUsers')
    getUsers()
    {
        return this.authService.getUsers()
    }
    
    @Put('updateUser/:id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
         @Body() dto: UpdateUserDto) {
      return this.authService.updateUser(id, dto);
    }
}