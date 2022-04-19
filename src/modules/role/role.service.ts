import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Status } from 'src/common/enum';
import { Repository } from 'typeorm';

import { CreateRoleDto, ReadRoleDto, UpdateRoleDto } from './dtos';
import { Role } from './entities';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ){}

    async getRoles(): Promise<ReadRoleDto[]>{
        
        const roles: Role[] = await this.roleRepository.find({ where: {status: 'ACTIVO'} });

        return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
    }
    
    async getRole(id: number): Promise<ReadRoleDto>{
        if(!id){
            throw new BadRequestException("id must be sent");
        }

        const role: Role = await this.roleRepository.findOne(id, { where: {status: 'ACTIVO'} });

        if(!role){
            throw new NotFoundException("Resource not found");
        }

        return plainToClass(ReadRoleDto, role);
    }

    async createRole(role: Partial<CreateRoleDto>): Promise<ReadRoleDto>{
        const savedRole: Role = await this.roleRepository.save(role);
        return plainToClass(ReadRoleDto, savedRole);
    }

    async updateRole(roleId: number, role: Partial<UpdateRoleDto>): Promise<ReadRoleDto>{
        const foundRole: Role = await this.roleRepository.findOne(roleId, { where: { status: Status.ACTIVO }});

        if(!foundRole){
            throw new NotFoundException("This role does not exist");
        }

        foundRole.name = role.name;
        foundRole.description = role.description;

        const updateRole: Role = await this.roleRepository.save(foundRole);
        
        return plainToClass(ReadRoleDto, updateRole);
    }

    async deleteRole(id: number): Promise<void>{
        const roleExists = await this.roleRepository.findOne(id, { where: {status: 'ACTIVO'} });

        if(!roleExists){
            throw new NotFoundException("Resource not found");
        }

        await this.roleRepository.update(id, { status: 'INACTIVO' });
    }
}
