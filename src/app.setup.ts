import { INestApplication, VersioningType } from '@nestjs/common';
import { AppConfig } from './config/app-config.service.js';

/**
 * Applies routing and HTTP settings. Shared by main.ts and the e2e tests,
 * so tests hit exactly the routes production serves.
 *
 * Routes: /<API_PREFIX>/v1/<resource>, plus /health outside the prefix.
 */
export function configureApp(app: INestApplication): void {
  const config = app.get(AppConfig);

  app.setGlobalPrefix(config.apiPrefix, { exclude: ['health'] });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.enableCors({ origin: config.corsOrigins.length > 0 ? config.corsOrigins : false });
  app.enableShutdownHooks();
}
