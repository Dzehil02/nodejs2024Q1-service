import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { createPassword } from 'src/utils/createPassword';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkEntityById } from 'src/utils/modelValidators';
import { transformUserResponse, transformUsersResponse } from 'src/utils/transformUsersResponse';
import { User } from 'src/types/types';
import { User as UserPrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { compare, hash } from 'bcrypt';

config();
const CRYPT_SALT = Number(process.env.CRYPT_SALT) || 10;

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}
    async getUser(id: string): Promise<UserPrismaClient> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
        return checkEntityById(id, user);
    }
    async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const { login, password } = createUserDto;
        const hashedPassword = await this.hashPassword(password);

        const newUser = {
            id: createPassword(),
            login,
            password: hashedPassword,
        };

        const resUser = await this.prismaService.user.create({ data: newUser });
        return transformUserResponse(resUser);
    }

    async findAll(): Promise<Omit<User, 'password'>[]> {
        const users = await this.prismaService.user.findMany();
        return transformUsersResponse(users);
    }

    async findOne(id: string): Promise<Omit<User, 'password'>> {
        const user = await this.getUser(id);
        const resUser = { ...user };
        return transformUserResponse(resUser);
    }

    async update(id: string, updatePasswordDto: UpdatePasswordDto): Promise<Omit<User, 'password'>> {
        const user = await this.getUser(id);

        const { password } = user;
        const { oldPassword, newPassword } = updatePasswordDto;
        const passwordEquals = await compare(oldPassword, password);

        if (!passwordEquals) {
            throw new ForbiddenException('Old password is wrong');
        }

        const hashedNewPassword = await this.hashPassword(newPassword);

        const updatedUser = await this.prismaService.user.update({
            where: { id },
            data: {
                password: hashedNewPassword,
                version: user.version + 1,
            },
        });

        const resUser = { ...updatedUser };
        return transformUserResponse(resUser);
    }

    async remove(id: string): Promise<void> {
        const user = await this.getUser(id);
        await this.prismaService.user.delete({ where: { id: user.id } });
    }

    private hashPassword(password: string): Promise<string> {
        return hash(password, CRYPT_SALT);
    }
}
