import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tuit } from './entities';
import { TuitController } from './tuit.controller';
import { TuitService } from './tuit.service';
import { User } from '../user/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Tuit, User])],
    controllers: [TuitController],
    providers: [TuitService],
})
export class TuitModule {}
