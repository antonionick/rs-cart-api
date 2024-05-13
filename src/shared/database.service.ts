import { Client } from 'pg';

export class DatabaseService {
  private static client: Client;

  static async getClient(): Promise<Client> {
    if (this.client) {
      return this.client;
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

      return this.client;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}
