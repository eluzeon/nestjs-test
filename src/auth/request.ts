import { Request } from 'express';
import { User } from "./entities/User";

// Custom app Request interface with
// authenticated user
// @UseGuards is required when used
export interface AuthRequest extends Request {
  user: User
}

export interface GenericRequest extends Request {
  user: User | undefined
}
