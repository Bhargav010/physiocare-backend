import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';

export interface HealthResponse {
  status: 'ok';
  uptimeSeconds: number;
  timestamp: string;
}

/** Liveness check for UptimeRobot and the deploy pipeline. A database check joins in PC-103. */
@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
  @Get()
  check(): HealthResponse {
    return {
      status: 'ok',
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
