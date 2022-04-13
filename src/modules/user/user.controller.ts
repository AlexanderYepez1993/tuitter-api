import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoleType } from '../../common/enum';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { User } from './entities';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    
    constructor(private readonly userService: UserService){}

    @UseGuards(AuthGuard())
    @Get()
    async getUsers(): Promise<User[]>{
        const users = await this.userService.getUsers();
        return users;
    }

    @Get(':id')
    // @Roles(RoleType.ADMIN)
    // @UseGuards(AuthGuard(), RoleGuard)
    async getUser(@Param() id: number): Promise<User>{
        const user = await this.userService.getUser(id);
        return user;
    }

    @Post()
    async createUser(@Body() user: User): Promise<User>{
        const createdUser = await this.userService.createUser(user);
        return createdUser;
    }

    @Patch(':id')
    async updateUser(@Param() id: number, @Body() user: User): Promise<void>{
        const updatedUser = await this.userService.updateUser(id, user);
        return updatedUser;
    }

    @Delete(':id')
    async deleteUser(@Param() id: number): Promise<boolean>{
        await this.userService.deleteUser(id);
        return true;
    }

    @Post('setRole/:userId/:roleId')
    async SetRoleToUser(@Param('userId') userId: number, @Param('roleId') roleId: number): Promise<boolean>{
        return this.userService.setRoleToUser(userId, roleId);
    }
}
