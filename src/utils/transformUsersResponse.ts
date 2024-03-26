import { User as UserPrismaClient } from '@prisma/client';
import { User } from 'src/types/types';

export const transformUserResponse = (resUser: UserPrismaClient): Omit<User, 'password'> => {
    delete resUser.password;
    return {
        ...resUser,
        createdAt: new Date(resUser.createdAt).getTime(),
        updatedAt: new Date(resUser.updatedAt).getTime(),
    };
};

export const transformUsersResponse = (resUsers: UserPrismaClient[]): Omit<User, 'password'>[] => {
    return resUsers.map((user) => {
        delete user.password;
        return {
            ...user,
            createdAt: new Date(user.createdAt).getTime(),
            updatedAt: new Date(user.updatedAt).getTime(),
        };
    });
};
