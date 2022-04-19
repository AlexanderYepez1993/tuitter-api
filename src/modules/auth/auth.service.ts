import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';

import { AuthRepository } from './repositories';
import { User } from '../user/entities';
import { SigninDto, SignupDto } from './dtos';
import { IJwtPayload } from './interfaces';
import { RoleType } from '../../common/enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService    
    ){}

    async signup(signupDto: SignupDto): Promise<void>{
        const { username, email } = signupDto;
        const userExists = await this.authRepository.findOne({
            where: [{ username },{ email }],
        });

        if(userExists){
            throw new ConflictException('username or email already exists');
        }

        return this.authRepository.signup(signupDto);
    }

    async signin(signinDto: SigninDto): Promise<{ token: string }>{
        const { username, password } = signinDto;
        const user: User = await this.authRepository.findOne({
            where: { username },
        });

        if(!user){
            throw new NotFoundException('user does not exist');
        }

        const isMatch = await compare(password, user.password);

        if(!isMatch){
            throw new UnauthorizedException('invalid credentials');
        }

        const payload: IJwtPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            roles: user.roles.map(r => r.name as RoleType)
        }

        const token = await this.jwtService.sign(payload);

        return { token };
    }
}
