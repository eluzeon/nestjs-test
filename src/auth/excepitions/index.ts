import { AppException } from "../../exception.filter";

export class UsernameAlreadyTaken extends AppException {
  constructor(message?: string) {
    super(20002, message)
  }
}
