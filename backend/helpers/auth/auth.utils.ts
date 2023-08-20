import { compare, genSalt, hash } from 'bcrypt';
import Jwt from 'jsonwebtoken';

export class AuthHelper {
  public async hashPassword(password: string): Promise<string> {
    if (!process.env.SECRET_KEY) {
      throw new Error(
        'Please define the SECRET_KEY environment variable inside .env'
      );
    }
    try {
      return await hash(password, process.env.SECRET_KEY);
    } catch (error) {
      console.error('Error in hashPassword:', error);
      throw error;
    }
  }

  public async comparePassword(
    password: string,
    passwordInDatabase: string
  ): Promise<boolean> {
    return await compare(password, passwordInDatabase);
  }

  public async generateJWT(id: string) {
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error(
        'Please define the JWT_SECRET_KEY environment variable inside .env'
      );
    }

    return Jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY);
  }
}
