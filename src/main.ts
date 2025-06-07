import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsOptions } from './config/cors.config';
import { JwtAuthGuard } from './config/jwt/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Chỉ cho phép các properties được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Throw error nếu có properties không được định nghĩa
    }),
  );
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
