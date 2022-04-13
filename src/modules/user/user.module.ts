import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { Role } from '../role/entities';
import { User, UserDetails } from './entities';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserDetails, Role]), 
        AuthModule
    ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
