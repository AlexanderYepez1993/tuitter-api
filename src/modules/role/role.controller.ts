import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateRoleDto, ReadRoleDto, UpdateRoleDto } from './dtos';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
    
    constructor(private readonly roleService: RoleService){}

    @Get()
    getRoles(): Promise<ReadRoleDto[]>{
        return this.roleService.getRoles();
    }

    @Get(':RoleId')
    getRole(@Param() RoleId: number): Promise<ReadRoleDto>{
        return this.roleService.getRole(RoleId);
    }

    @Post()
    createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto>{
        return this.roleService.createRole(role);
    }

    @Patch(':RoleId')
    updateRole(@Param() RoleId: number, @Body() role: Partial<UpdateRoleDto>): Promise<ReadRoleDto>{
        return this.roleService.updateRole(RoleId, role);
    }

    @Delete(':RoleId')
    deleteRole(@Param() RoleId: number): Promise<void>{
        return this.roleService.deleteRole(RoleId);
    }
}
