import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class CartDatabaseService {
  private client: Client;

  public async connect(): Promise<void> {
    if (this.client) {
      return;
    }

    try {
      const client = new Client({
        host: process.env.host,
        port: Number(process.env.port),
        database: process.env.database,
        user: process.env.user,
        password: process.env.password,
        ssl: {
          rejectUnauthorized: false,
        },
      });

      await client.connect();

      this.client = client;

      console.log('connected');
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}
