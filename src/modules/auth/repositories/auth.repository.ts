import { EntityRepository, getConnection, Repository } from "typeorm";
import { genSalt, hash } from "bcryptjs";

import { Role } from "../../role/entities";
import { RoleType } from "../../../common/enum";
import { SignupDto } from "../dto";
import { Tuit } from "../../tuit/entities";
import { User, UserDetails } from "../../user/entities";

@EntityRepository(User)
export class AuthRepository extends Repository<User>{

    async signup(signupDto: SignupDto){
        const { email, username, password } = signupDto;
        const user = new User();
        user.email = email;
        user.username = username;
        
        const roleRepository: Repository<Role> = getConnection().getRepository(Role);
        
        const defaultRole: Role = await roleRepository.findOne({ where: { name: RoleType.GENERAL } });
        user.roles = [defaultRole];

        const details = new UserDetails();
        user.details = details;

        const tuit = new Tuit();
        user.tuits = [tuit];

        const salt = await genSalt(10);
        user.password = await hash(password, salt);
        
        await this.save(user);
    }
}