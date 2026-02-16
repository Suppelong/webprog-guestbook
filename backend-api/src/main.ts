import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // This line is essential for the Frontend to talk to the Backend!
app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://webprog-guestbook.vercel.app' // 👈 Make sure this matches your Vercel link EXACTLY
  ],
});

  await app.listen(3000);
}
bootstrap();