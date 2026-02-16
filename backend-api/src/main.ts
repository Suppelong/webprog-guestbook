import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // This line is essential for the Frontend to talk to the Backend!
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();