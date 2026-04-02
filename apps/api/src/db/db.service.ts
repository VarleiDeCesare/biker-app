import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { db, pool } from '.';

@Injectable()
export class DrizzleService implements OnApplicationShutdown {
  readonly db = db;

  async onApplicationShutdown(): Promise<void> {
    await pool.end();
  }
}
