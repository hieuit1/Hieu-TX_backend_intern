import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  private users: UserDto[] = [];

  constructor(private jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async registerUser(user: UserDto): Promise<UserDto> {
    const hashedPassword = await this.hashPassword(user.password);
    const newUser: UserDto = { ...user, password: hashedPassword };
    this.users.push(newUser);
    return newUser;
  }

  async login(user: UserDto) {
    const payload = { username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findUser(username: string): Promise<UserDto | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
