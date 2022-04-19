import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { ReadUserDto, UpdateUserDto } from './dtos';
import { Role } from '../role/entities';
import { Status } from '../../common/enum/status.enum';
import { User, UserDetails } from './entities';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ){}

    async getUsers(): Promise<ReadUserDto[]>{
        
        const users: User[] = await this.userRepository.find({ where: {status: Status.ACTIVO} });

        return users.map((user: User) => plainToClass(ReadUserDto, user));
    }
    
    async getUser(UserId: number): Promise<ReadUserDto>{
        if(!UserId){
            throw new BadRequestException("id must be sent");
        }

        const user: User = await this.userRepository.findOne(UserId, { where: {status: Status.ACTIVO} });

        if(!user){
            throw new NotFoundException("Resource not found");
        }

        return plainToClass(ReadUserDto, user);
    }

    /* 
    async createUser(user: User): Promise<User>{
        const details = new UserDetails();
        user.details = details;
        
        const defaultRole = await this.roleRepository.findOne({ where: { name: 'GENERAL'} });
        user.roles = [defaultRole];

        const savedUser: User = await this.userRepository.save(user);
        return savedUser;
    }
    */
 
    async updateUser(UserId: number, user: UpdateUserDto): Promise<ReadUserDto>{
        // await this.userRepository.update(UserId, user);
        const foundUser: User = await this.userRepository.findOne(UserId, { where: { status: Status.ACTIVO }});

        if(!foundUser){
            throw new NotFoundException("This user does not exist");
        }

        foundUser.username = user.username;
        foundUser.email = user.email;

        const updateUser: User = await this.userRepository.save(foundUser);
        
        return plainToClass(ReadUserDto, updateUser);
    }

    async deleteUser(UserId: number): Promise<void>{
        const userExist = await this.userRepository.findOne(UserId, { where: {status: Status.ACTIVO} });

        if(!userExist){
            throw new NotFoundException("Resource not found");
        }

        await this.userRepository.update(UserId, { status: Status.INACTIVO });
    }

    async setRoleToUser(userId: number, roleId: number): Promise<boolean>{
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
