import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { jwtConstants } from "../constans";
import LoginDto from "../dto/LoginDto";
import { User } from "../entities/User";
import { UserService } from "../services/UserService";

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: LoginDto): Promise<User> {
    const user = await this.userService.findByUsername(payload.username) ;
    if (!user) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    return user
  }
}