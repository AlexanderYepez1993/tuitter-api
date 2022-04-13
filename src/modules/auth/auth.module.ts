import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { Configuration } from '../../common/enum';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService){
        return {
          secret: config.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: 3600,
          },
        }
      }

    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
