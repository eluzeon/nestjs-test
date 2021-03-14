export class SignedUserDto {
  id: number
  username: string
  accessToken: string


  constructor(id: number, username: string, accessToken: string) {
    this.id = id;
    this.username = username;
    this.accessToken = accessToken;
  }
}