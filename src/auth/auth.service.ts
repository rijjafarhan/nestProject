import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService, private jwt:JwtService,private config: ConfigService){}

    async signup(dto: AuthDto){
        const hashPass =  await bcrypt.hash(dto.password,12)
        try{
           
        const user =  await this.prisma.user.create({
                data:{
                    email:dto.email,
                    role:dto.role,
                    hashPass
                },
        })
        delete user.hashPass
        return user
    }
    catch(error)
    {
        if(error instanceof PrismaClientKnownRequestError)
        {
            if(error.code ==='P2002')
            {
                throw new ForbiddenException('Credentials already taken');

            }
        }

    }
    }

    async signin(dto:AuthDto){
        const user = await this.prisma.user.findUnique(
           {
            where:{
                email:dto.email, 
                role:dto.role
            }
           }
        )

        if(!user) throw new ForbiddenException('Credentials incorrect - no user found');
        
        const matchPass =  await bcrypt.compare(dto.password, user.hashPass)

        if(!matchPass) throw new ForbiddenException('Credentials incorrect - incorrect password');

        delete user.hashPass
        return this.signToken(user.id,user.email)


    }

    async getUsers() {
        
        const users = await this.prisma.user.findMany();
        return users;
      }
      
    async updateUser(id: number, dto: UpdateUserDto) {
        
        const updatedUser = await this.prisma.user.update({
          where: { id },
          data: {

            firstName: dto.firstName,
            lastName: dto.lastName,
            role: dto.role
          },
        });
    
        return updatedUser;
      }

      async signToken(
        userId: number,
        email: string
      ): Promise<{ access_token: string} > {
        const payload = {
          sub: userId,
          email
        };
      
        const secret = this.config.get('JWT_SECRET');
      
        const token = await this.jwt.signAsync(payload, {
          expiresIn: '10m', 
          secret
        });
        return {
            access_token:token
        }
      }
      


}