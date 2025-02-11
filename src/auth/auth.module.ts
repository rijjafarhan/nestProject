import {Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { PrismaModule } from 'src/prisma/prisma.module'
@Module({ 
   
    imports: [PrismaModule], // ✅ Import PrismaModule, NOT PrismaService
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
