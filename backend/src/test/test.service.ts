import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Define a simple schema for testing
export interface TestDocument {
  name: string;
}

@Injectable()
export class TestService {
  constructor(
    @InjectModel('Test') private readonly testModel: Model<TestDocument>,
  ) {}

  // Create a new test document
  async createTest(name: string): Promise<TestDocument> {
    const newTest = new this.testModel({ name });
    return newTest.save();
  }

  // Find all test documents
  async findAllTests(): Promise<TestDocument[]> {
    return this.testModel.find().exec();
  }
}
