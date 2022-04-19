import { createParamDecorator } from "@nestjs/common";
import { UserDto } from "../../user/dtos";

export const GetUser = createParamDecorator(
    (data, req): UserDto => {
        return req.user;
    },
);