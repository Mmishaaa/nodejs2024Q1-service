import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);

  // app.useGlobalPipes(new ValidationPipe());

  console.log('server started on port: ' + PORT);
}
bootstrap();
