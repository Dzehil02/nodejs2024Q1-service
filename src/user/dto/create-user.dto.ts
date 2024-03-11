import { User } from 'db-store/types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements Partial<User> {
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
