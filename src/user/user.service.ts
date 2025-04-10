import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { DbService } from 'src/db/db.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly dbService: DbService,
  ) { }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();
    const user = users.find(user => user.username === loginUserDto.username && user.password === loginUserDto.password);
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }
    return user;
  }

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read();
    const user = users.find(user => user.username === registerUserDto.username);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const newUser: User = new User();
    newUser.username = registerUserDto.username;
    newUser.password = registerUserDto.password;
    users.push(newUser);
    await this.dbService.write(users);
    return newUser;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
