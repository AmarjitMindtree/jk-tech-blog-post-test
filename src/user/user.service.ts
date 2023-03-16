import { Injectable } from '@nestjs/common';
import { User } from '../entity/user';

@Injectable()
export class UserService {
  constructor() {}

  async findOneByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    return await User.create(user);
  }
}
