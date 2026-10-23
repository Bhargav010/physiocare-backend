import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { configureApp } from './app.setup.js';
import { AppConfig } from './config/app-config.service.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  configureApp(app);

  const config = app.get(AppConfig);
  await app.listen(config.port);

  Logger.log(`PhysioCare API listening on port ${config.port} (${config.nodeEnv})`, 'Bootstrap');
}

await bootstrap();
