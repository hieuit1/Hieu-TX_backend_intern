import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser( name: string, email: string, password: string): Promise<User> {
    const newUser = new this.userModel({ name, email, password });
    return await newUser.save();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error('Error finding user:', error);
      throw new Error('Database error');
    }
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
      if (!updatedUser) {
        throw new Error(`User with id ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Database error');
    }
  }

  async deleteUser(id: string): Promise<User | null> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      if (!deletedUser) {
        throw new Error(`User with id ${id} not found`);
      }
      return deletedUser;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Database error');
    }
  }
}