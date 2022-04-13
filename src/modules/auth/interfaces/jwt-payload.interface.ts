import { RoleType } from "../../../common/enum";

export interface IJwtPayload{
    id: number;
    username: string;
    email: string;
    roles: RoleType[];
    iat?: Date;
}