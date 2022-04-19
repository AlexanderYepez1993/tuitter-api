import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoleType } from '../../common/enum';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { ReadUserDto, UpdateUserDto } from './dtos';
import { User } from './entities';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    
    constructor(private readonly userService: UserService){}

    @UseGuards(AuthGuard())
    @Get()
    getUsers(): Promise<ReadUserDto[]>{
        return this.userService.getUsers();
    }

    @Get(':UserId')
    // @Roles(RoleType.ADMIN)
    // @UseGuards(AuthGuard(), RoleGuard)
    getUser(@Param() UserId: number): Promise<ReadUserDto>{
        return this.userService.getUser(UserId);
    }

    /*
    @Post()
    async createUser(@Body() user: User): Promise<User>{
        const createdUser = await this.userService.createUser(user);
        return createdUser;
    }
    */

    @Patch(':UserId')
    updateUser(@Param() UserId: number, @Body() user: UpdateUserDto): Promise<ReadUserDto>{
        return this.userService.updateUser(UserId, user);
    }

    @Delete(':UserId')
    deleteUser(@Param() UserId: number): Promise<void>{
        return this.userService.deleteUser(UserId);
    }

    @Post('setRole/:userId/:roleId')
    SetRoleToUser(@Param('userId') userId: number, @Param('roleId') roleId: number): Promise<boolean>{
        return this.userService.setRoleToUser(userId, roleId);
    }
}
