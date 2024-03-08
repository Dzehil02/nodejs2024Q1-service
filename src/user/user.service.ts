import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from '../../db-store/store';
import { createPassword } from 'src/helpers/createPassword';
import { checkModelById } from 'src/helpers/modelValidators';

@Injectable()
export class UserService {
    getUser(id: string) {
        return checkModelById(id, users);
    }
    create(createUserDto: CreateUserDto) {
        const newUser = {
            id: createPassword(),
            ...createUserDto,
            version: 1,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        users.push(newUser);
        const resUser = { ...newUser };
        delete resUser.password;
        return resUser;
    }

    findAll() {
        return users;
    }

    findOne(id: string) {
        const user = this.getUser(id);
        return user;
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        const user = this.getUser(id);
        if (user.password !== updateUserDto.oldPassword) {
            throw new ForbiddenException('Old password is wrong');
        }
        user.password = updateUserDto.newPassword;
        user.updatedAt = Date.now();
        user.version = user.version + 1;
        const resUser = { ...user };
        delete resUser.password;
        return resUser;
    }

    remove(id: string) {
        const user = this.getUser(id);
        users.splice(users.indexOf(user), 1);
    }
}
