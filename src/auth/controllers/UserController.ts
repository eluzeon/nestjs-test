import { Body, Controller, Get, Post,  UseGuards } from "@nestjs/common";
import { User } from '../entities/User';
import { User as UserDeco } from '../decorators/user';
import { UserService } from '../services/UserService';
import { UserRegDto } from '../dto/UserRegDto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard, OptionalJwtGuard } from "../gurads/jwt.guard";

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(OptionalJwtGuard)
  async list(
    @UserDeco() user: User | undefined
  ): Promise<User[]> {
    if (user) {
      console.log(`This request is authorized by ${user.username}`)
    } else {
      console.log("Unauthenticated request")
    }
    return await this.userService.list();
  }

  @Post()
  @ApiBadRequestResponse({
    description: "This username already taken"
  })
  @ApiBadRequestResponse({ description: "Username is too short" })
  async register(
    @Body() userDto: UserRegDto
  ): Promise<User> {
    return await this.userService.register(userDto);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  me(
    @UserDeco() user: User
  ): User {
    return user;
  }
}
