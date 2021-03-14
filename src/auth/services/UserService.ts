import { Injectable } from '@nestjs/common';
import {
  EntityRepository, wrap
} from "@mikro-orm/core";
import { User } from '../entities/User';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserRegDto } from '../dto/UserRegDto';
import { hashPassword } from '../crypto';
import { UsernameAlreadyTaken } from "../excepitions";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async list(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async register(userDto: UserRegDto): Promise<User> {
    const dbUser = await this.userRepository.findOne({
      username: userDto.username
    });
    if (dbUser) {
      // if username is taken
      throw new UsernameAlreadyTaken(
        "This username is already taken"
      );
    }
    const user = new User();
    wrap(user).assign(userDto);
    user.password = await hashPassword(userDto.password);
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ username });
  }
}
