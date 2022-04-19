import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateRoleDto {
    @IsOptional()
    @IsString()
    @MaxLength(50, { message: 'This name is not valid' })
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(100, { message: 'This description is not valid' })
    description: string;
}