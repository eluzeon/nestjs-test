import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GenericRequest } from "../request";

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<GenericRequest>();
    return request.user;
  }
)