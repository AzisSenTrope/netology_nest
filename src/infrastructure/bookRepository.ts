import {injectable} from "inversify";
import "reflect-metadata";

import {BookModel} from '../model/bookModel'

@injectable()
export class BookRepository {
  async createBook(bookData: BookItem) {
    try {
      return await BookModel.create({...bookData});
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getBook(id: string) {
    try {
      return await BookModel.findById(id).select('-__v');
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getBooks() {
    try {
      return await BookModel.find().select('-__v');
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async updateBook(id: string, bookData: BookItem) {
    try {
     return  await BookModel.findByIdAndUpdate(id, {...bookData});
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async deleteBook(id: string) {
    try {
      return await BookModel.deleteOne({_id: id});
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
