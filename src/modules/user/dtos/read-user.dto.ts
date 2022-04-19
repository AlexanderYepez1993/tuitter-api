import { IsEmail, IsNumber } from "class-validator";
import { Type } from "class-transformer";

import { ReadUserDetailsDto } from "./read-user-details.dto";

export class ReadUserDto{
    @IsNumber()
    readonly id: number;

    @IsEmail()
    readonly email: string;

    @Type(type => ReadUserDetailsDto)
    readonly details: ReadUserDetailsDto;
}