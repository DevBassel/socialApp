import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow('DB_HOST'),
        port: config.getOrThrow('DB_PORT'),
        database: config.getOrThrow('DB_NAME'),
        username: config.getOrThrow('DB_USERNAME'),
        password: config.getOrThrow('DB_PASS'),
        synchronize: config.getOrThrow('DB_SYNC'),
        autoLoadEntities: true,
        logging: true,
        logger: 'file',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
