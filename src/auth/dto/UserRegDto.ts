import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserRegDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @ApiProperty({ required: false })
  fistName?: string;
  @ApiProperty({ required: false })
  lastName?: string;


  constructor(username: string, password: string, fistName: string, lastName: string) {
    this.username = username;
    this.password = password;
    this.fistName = fistName;
    this.lastName = lastName;
  }
}
