import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService){}
    async signup(dto: AuthDto){
        const hashPass =  await bcrypt.hash(dto.password,12)
        try{
        const user =  await this.prisma.user.create({
                data:{
                    email:dto.email,
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
                email:dto.email
            }
           }
        )

        if(!user) throw new ForbiddenException('Credentials incorrect - no user found');
        
        const matchPass =  await bcrypt.compare(dto.password, user.hashPass)

        if(!matchPass) throw new ForbiddenException('Credentials incorrect - incorrect password');

        delete user.hashPass
        return user


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
          },
        });
    
        return updatedUser;
      }


}