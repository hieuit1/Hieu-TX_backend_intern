import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Curdmongodb } from './curdmongodb.schema';

@Injectable()
export class CurdmongodbService {
  constructor(
    @InjectModel(Curdmongodb.name) private userModel: Model<Curdmongodb>,
  ) {}
  async createALLCURDProduct(
    name: string,
    email: string,
    password: string,
    age: number,
  ): Promise<Curdmongodb> {
    const newProduct = new this.userModel({ name, email, password, age });
    return await newProduct.save();
  }

  async getALLCURDProduct(
    page: number = 1,
    limit: number = 10,
    search?: string,
  ): Promise<{ data: Curdmongodb[]; total: number; totalPages: number }> {
    const skip = (page - 1) * limit;

    // Tạo bộ lọc tìm kiếm
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { name: new RegExp(search, 'i') },
          { email: new RegExp(search, 'i') },
        ],
      };
    }

    // Lấy dữ liệu có phân trang & tìm kiếm
    const data = await this.userModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.userModel.countDocuments(filter);
    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getProductById(id: string): Promise<Curdmongodb | null> {
    try {
      const product = await this.userModel.findById(id).exec();
      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }
      return product;
    } catch (error) {
      console.error('Error finding product:', error);
      throw new Error('Database error');
    }
  }

  async updateProductById(
    id: string,
    data: Partial<Curdmongodb>,
  ): Promise<Curdmongodb | null> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      if (!updatedUser) {
        throw new Error(`User with id ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Database error');
    }
  }

  async deleteProductById(id: string): Promise<string> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      if (!deletedUser) {
        throw new Error(`User with id ${id} not found`);
      }
      return 'Deleted successfully';
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Database error');
    }
  }
}
