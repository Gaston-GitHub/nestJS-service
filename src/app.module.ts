import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesController } from './images/images.controller';
import { ImagesService } from './images/images.service';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users/roles.guard';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get('database.uri')}`,
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({ dest: './uploads' }),
    ImagesModule,
    AuthModule,
  ],
  // controllers: [ImageController],
  controllers: [ImagesController],
  providers: [
    ImagesService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
