import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findById(id: string): Promise<User> {
    return id.match(/^[0-9a-fA-F]{24}$/)
      ? await this.userModel.findOne({ _id: id })
      : null;
  }

  async create(user: UserDTO) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
