import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import AuthService from "../services/AuthService";
import LoginDto from "../dto/LoginDto";
import { SignedUserDto } from "../dto/SignedUserDto";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("auth")
@Controller('auth')
export default class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto
  ): Promise<SignedUserDto> {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password
    );
    if (!user) {
      throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);
    }
    return this.authService.login(user);
  }
}