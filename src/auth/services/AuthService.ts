import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { User } from "../entities/User";
import { UserService } from "./UserService";
import { hashPassword } from "../crypto";
import { SignedUserDto } from "../dto/SignedUserDto";


@Injectable()
export default class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async validateUser(
    username: string, password: string
  ): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === await hashPassword(password)) {
      return user
    }
    return null;
  }

  async login(user: User): Promise<SignedUserDto> {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      id: user.id,
      username: user.username
    };
  }
}