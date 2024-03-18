import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { readFile } from 'fs/promises';
import { join } from 'path';
import { serve, setup } from 'swagger-ui-express';
import { load } from 'js-yaml';
const PORT = process.env.PORT || 4000;

const YAML_SWAGGER_FILENAME = 'api.yaml';

const PATH_TO_YAML_FOLDER = './doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocument = load(
    await readFile(
      join(__dirname, PATH_TO_YAML_FOLDER, YAML_SWAGGER_FILENAME),
      'utf8',
    ),
  );

  app.use('/doc', serve, setup(swaggerDocument));

  await app.listen(PORT, () => {
    console.log('server started on port: ' + PORT);
  });
}
bootstrap();
