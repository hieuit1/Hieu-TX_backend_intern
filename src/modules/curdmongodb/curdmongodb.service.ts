import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Curdmongodb } from './curdmongodb.schema';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class CurdmongodbService {
  constructor(
    @InjectModel(Curdmongodb.name) private userModel: Model<Curdmongodb>,
  ) {}
  async createALLCURDProduct(
    name: string,
    description: string,
    price: number,
    date: string,
  ): Promise<Curdmongodb> {
    const existingProduct = await this.userModel.findOne({ name });
    if (existingProduct) {
      throw new BadRequestException('Product already exists');
    }
    const newProduct = new this.userModel({ name, description, price, date });
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
          { description: new RegExp(search, 'i') },
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
    updateProductDto: UpdateProductDto,
  ): Promise<Curdmongodb | null> {
    const updatedProduct = await this.userModel.findByIdAndUpdate(
      id,
      updateProductDto,
      {
        new: true, // Trả về dữ liệu mới sau khi update
        runValidators: true, // Validate dữ liệu trước khi update
      },
    );

    if (!updatedProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return updatedProduct;
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
