import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { createPassword } from 'src/utils/createPassword';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkEntityById } from 'src/utils/modelValidators';
import { transformUserResponse, transformUsersResponse } from 'src/utils/transformUsersResponse';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}
    async getUser(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
        return checkEntityById(id, user);
    }
    async create(createUserDto: CreateUserDto) {
        const newUser = {
            id: createPassword(),
            ...createUserDto,
        };
        const resUser = await this.prismaService.user.create({ data: newUser });
        return transformUserResponse(resUser);
    }

    async findAll() {
        const users = await this.prismaService.user.findMany();
        return transformUsersResponse(users);
    }

    async findOne(id: string) {
        const user = await this.getUser(id);
        delete user.password;
        return user;
    }

    async update(id: string, updatePasswordDto: UpdatePasswordDto) {
        const user = await this.getUser(id);
        if (user.password !== updatePasswordDto.oldPassword) {
            throw new ForbiddenException('Old password is wrong');
        }
        const updatedUser = await this.prismaService.user.update({
            where: { id },
            data: {
                password: updatePasswordDto.newPassword,
                version: user.version + 1,
            },
        });
        const resUser = { ...updatedUser };
        return transformUserResponse(resUser);
    }

    async remove(id: string) {
        const user = await this.getUser(id);
        await this.prismaService.user.delete({ where: { id: user.id } });
    }
}
