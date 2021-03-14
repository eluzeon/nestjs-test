import { AuthGuard } from "@nestjs/passport";


export class JwtGuard extends AuthGuard('jwt') {}

export class OptionalJwtGuard extends AuthGuard('jwt') {

  // @ts-ignore: ts can't find this method on type
  // just ignore this line: trust it works)
  handleRequest(err, user, info, context) {
    return user;
  }

}