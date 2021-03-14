import { Module } from '@nestjs/common';
import { User } from './entities/User';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserService } from './services/UserService';
import { UserController } from './controllers/UserController';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constans";
import AuthService from "./services/AuthService";
import JwtStrategy from "./strategies/jwt.strategy";
import AuthController from "./controllers/AuthController";

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }
    })
  ],
  providers: [UserService, AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
  controllers: [UserController, AuthController],
})
export class AuthModule {}
