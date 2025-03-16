import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            error: error.constraints
              ? Object.values(error.constraints).join(', ')
              : 'Invalid input',
          })),
        );
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
