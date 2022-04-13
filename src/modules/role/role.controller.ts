import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Role } from './entities';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
    
    constructor(private readonly roleService: RoleService){}

    @Get()
    async getRoles(): Promise<Role[]>{
        const roles = await this.roleService.getRoles();
        return roles;
    }

    @Get(':id')
    async getRole(@Param() id: number): Promise<Role>{
        const role = await this.roleService.getRole(id);
        return role;
    }

    @Post()
    async createRole(@Body() role: CreateRoleDto): Promise<Role>{
        const createdRole = await this.roleService.createRole(role);
        return createdRole;
    }

    @Patch(':id')
    async updateRole(@Param() id: number, @Body() role: UpdateRoleDto): Promise<void>{
        const updatedRole = await this.roleService.updateRole(id, role);
        return updatedRole;
    }

    @Delete(':id')
    async deleteRole(@Param() id: number): Promise<boolean>{
        await this.roleService.deleteRole(id);
        return true;
    }
}
