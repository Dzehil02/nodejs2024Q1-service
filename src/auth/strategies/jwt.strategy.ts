import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from 'src/types/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);
    constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
    }

    async validate(payload: TokenPayload) {
        const user = await this.userService.findOne(payload.userId).catch((err) => {
            this.logger.error(err);
            return null;
        });
        if (!user) {
            throw new UnauthorizedException();
        }
        return payload;
    }
}
