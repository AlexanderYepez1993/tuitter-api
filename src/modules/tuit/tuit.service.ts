import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from './dtos';
import { Tuit } from './entities';
import { User } from '../user/entities';

@Injectable()
export class TuitService {
    
    constructor(
        @InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async getTuits({ limit, offset }: PaginationQueryDto): Promise<Tuit[]>{
        return await this.tuitRepository.find({ 
            relations: ['user'], 
            skip: offset, 
            take:limit 
        });
    }

    async getTuit(id: number): Promise<Tuit>{
        const tuit: Tuit = await this.tuitRepository.findOne(id, { relations: ['user'] });

        if(!tuit){
            throw new NotFoundException("Resource not found");
        }

        return tuit;
    }

    async createTuit({ message/* , user */ }: CreateTuitDto): Promise<Tuit>{
        const tuit: Tuit = this.tuitRepository.create({ message/* , user */ });
        return this.tuitRepository.save(tuit);
    }

    async updateTuit(id: number, { message }: UpdateTuitDto): Promise<Tuit>{
        const tuit: Tuit = await this.tuitRepository.preload({
            id,
            message,
        });

        if(!tuit){
            throw new NotFoundException("Resource not found");
        }

        return this.tuitRepository.save(tuit);
    }

    async removeTuit(id: number): Promise<void>{
        const tuit: Tuit = await this.tuitRepository.findOne(id);
        
        if(!tuit){
            throw new NotFoundException("Resource not found");
        }

        this.tuitRepository.remove(tuit);
    }
}
