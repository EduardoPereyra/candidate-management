import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Candidate } from '../candidates/entities/candidate.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'), // Railway proporciona esta variable
        entities: [Candidate],
        synchronize: true, // Para desarrollo - cambiar a false en producción
        ssl: true, // Railway requiere SSL
        extra: {
          ssl: {
            rejectUnauthorized: false, // Importante para Railway
          },
        },
        logging: ['query', 'error'], // Ver queries en consola
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
