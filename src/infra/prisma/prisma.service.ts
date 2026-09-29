import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaSeeder } from 'prisma/seed';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  public constructor(private readonly configService: ConfigService) {
    const pool = new Pool({
      //user:configService.getOrThrow<string>('POSTGRES_USER'), 
      //password:configService.getOrThrow<string>('POSTGRES_PASSWORD'), 
      //database:configService.getOrThrow<string>('POSTGRES_DB'),
      //host: configService.getOrThrow<string>('POSTGRES_HOST'),
      //port: Number(configService.getOrThrow<string>('POSTGRES_PORT')),

      connectionString: configService.getOrThrow<string>('DATABASE_URL'),
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      max: 10,
    });
    const adapter = new PrismaPg(pool);
    
    super({ adapter });
  }

  public async onModuleInit() {
    try {
      const time = new Date().getMilliseconds();
      this.logger.log(`Initialization database...`);
      await this.$connect();
      this.logger.log(
        `Database initialized (${new Date().getMilliseconds() - time}ms)`,
      );
      
      await this.seeding();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Database disconnected');
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async seeding() {
    try {
      const time = new Date().getMilliseconds();
      this.logger.log(`Seeding database...`);
      await PrismaSeeder(this);
      this.logger.log(
        `Database seeded (${new Date().getMilliseconds() - time}ms)`,
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
