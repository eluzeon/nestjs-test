import { hash } from 'bcrypt';

const SALT = "$2b$10$0o/vhIcskVEDqajsNXonKO"

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, SALT);
}
