import { IsNotEmpty, MinLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty({
        message: 'Username is required',
    })
    username: string;

    @IsNotEmpty({
        message: 'Password is required',
    })
    password: string;
}