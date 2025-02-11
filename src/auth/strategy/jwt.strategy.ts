import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Payload } from "@prisma/client/runtime/library";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";



@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,'jwt'
)
{
    
    constructor(config: ConfigService,private prisma:PrismaService ) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
          
          secretOrKey: config.get<string>('JWT_SECRET'), 
        });
      }

      async validate(payload: {sub:number,email:string})
      {
        const user = await this.prisma.user.findUnique({
            where:{ 
                id:payload.sub
            }}
        )
        delete user.hashPass
        console.log(user)
        return user
      }

   
    
   
    
}