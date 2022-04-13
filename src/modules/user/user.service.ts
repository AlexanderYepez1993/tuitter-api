import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../../common/enum/status.enum';
import { Repository } from 'typeorm';

import { Role } from '../role/entities';
import { User, UserDetails } from './entities';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ){}

    async getUsers(): Promise<User[]>{
        
        const users: User[] = await this.userRepository.find({ where: {status: Status.ACTIVO} });

        return users;
    }
    
    async getUser(id: number): Promise<User>{
        if(!id){
            throw new BadRequestException("id must be sent");
        }

        const user: User = await this.userRepository.findOne(id, { where: {status: Status.ACTIVO} });

        if(!user){
            throw new NotFoundException("Resource not found");
        }

        return user;
    }

    async createUser(user: User): Promise<User>{
        const details = new UserDetails();
        user.details = details;
        
        const defaultRole = await this.roleRepository.findOne({ where: { name: 'GENERAL'} });
        user.roles = [defaultRole];

        const savedUser: User = await this.userRepository.save(user);
        return savedUser;
    }

    async updateUser(id: number, user: User): Promise<void>{
        await this.userRepository.update(id, user);
    }

    async deleteUser(id: number): Promise<void>{
        const userExist = await this.userRepository.findOne(id, { where: {status: Status.ACTIVO} });

        if(!userExist){
            throw new NotFoundException("Resource not found");
        }

        await this.userRepository.update(id, { status: Status.INACTIVO });
    }

    async setRoleToUser(userId: number, roleId: number){
        const userExist = await this.userRepository.findOne(userId, { where: { status: Status.ACTIVO} });

        if(!userExist){
            throw new NotFoundException("User does not exist");
        }

        const roleExist = await this.roleRepository.findOne(roleId, { where: {status: Status.ACTIVO} });

        if(!roleExist){
            throw new NotFoundException("Role does not exist");
        }

        userExist.roles.push(roleExist);
        await this.userRepository.save(userExist);

        return true;
    }
}
