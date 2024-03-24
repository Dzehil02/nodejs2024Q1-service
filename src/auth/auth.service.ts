import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { Token, TokenPayload, UserTokens } from 'src/types/types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
    ) {}

    async signup(dto: CreateUserDto) {
        return await this.userService.create(dto).catch((err) => {
            this.logger.error(err);
            return null;
        });
    }

    async login(dto: CreateUserDto): Promise<UserTokens> {
        const user = await this.userService.findOneByLogin(dto.login).catch((err) => {
            this.logger.error(err);
            return null;
        });

        if (!user || !compareSync(dto.password, user.password)) {
            throw new ForbiddenException('Invalid login or password');
        }
        const tokens = this.generateTokens(user);

        return {
            userId: user.id,
            login: user.login,
            ...tokens,
        };
    }

    private generateTokens(user: User): Token {
        const payload: TokenPayload = { userId: user.id, login: user.login };
        const accessToken = 'Bearer ' + this.jwtService.sign(payload);
        const refreshToken =
            'Bearer ' +
            this.jwtService.sign(payload, {
                expiresIn: this.config.get('TOKEN_REFRESH_EXPIRE_TIME', '30h'),
                secret: this.config.get('JWT_SECRET_REFRESH_KEY'),
            });
        return {
            accessToken,
            refreshToken,
        };
    }
}
