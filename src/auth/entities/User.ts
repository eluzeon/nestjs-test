import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;
  @Property()
  username: string;
  @Property()
  password: string;

  constructor(id: number = 0, username: string = "", password: string = "") {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}
