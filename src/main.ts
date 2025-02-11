import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true //doent allow the elements not defined in dto to be passed in the req
    }))
  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
