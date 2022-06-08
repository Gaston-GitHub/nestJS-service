import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { User } from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('create')
  create(@Body() userDTO: UserDTO): Promise<User> {
    return this.usersService.create(userDTO);
  }
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  async findById(@Param() param): Promise<User> {
    return this.usersService.findById(param.id);
  }
}
