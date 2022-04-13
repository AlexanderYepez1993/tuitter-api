import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";

import { Configuration } from "src/common/enum";
import { AuthRepository } from "../auth.repository";
import { IJwtPayload } from "../jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(AuthRepository) private readonly authRepository: AuthRepository
        ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get(Configuration.JWT_SECRET),
        });
    }

    async validate(payload: IJwtPayload){
        const { username } = payload;
        const user = await this.authRepository.findOne({
            where: { username, status: 'ACTIVO' },
        });

        if(!user){
            throw new UnauthorizedException();
        }

        return payload;
    }
}