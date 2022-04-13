import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Role } from './entities';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ){}

    async getRoles(): Promise<Role[]>{
        
        const roles: Role[] = await this.roleRepository.find({ where: {status: 'ACTIVO'} });

        return roles;
    }
    
    async getRole(id: number): Promise<Role>{
        if(!id){
            throw new BadRequestException("id must be sent");
        }

        const role: Role = await this.roleRepository.findOne(id, { where: {status: 'ACTIVO'} });

        if(!role){
            throw new NotFoundException("Resource not found");
        }

        return role;
    }

    async createRole(role: CreateRoleDto): Promise<Role>{
        const savedRole: Role = await this.roleRepository.save(role);
        return savedRole;
    }

    async updateRole(id: number, role: UpdateRoleDto): Promise<void>{
        await this.roleRepository.update(id, role);
    }

    async deleteRole(id: number): Promise<void>{
        const roleExists = await this.roleRepository.findOne(id, { where: {status: 'ACTIVO'} });

        if(!roleExists){
            throw new NotFoundException("Resource not found");
        }

        await this.roleRepository.update(id, { status: 'INACTIVO' });
    }
}
