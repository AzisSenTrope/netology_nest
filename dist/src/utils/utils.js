"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBooks = exports.TEST_RESPONSE = void 0;
const bookModel_1 = require("../model/bookModel");
exports.TEST_RESPONSE = { id: 1, mail: "test@mail.ru" };
function initBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield bookModel_1.BookModel.insertMany([
                {
                    title: 'book1',
                    description: 'description1',
                    authors: 'authors1',
                    favorite: 'favorite1',
                    fileCover: 'fileCover1',
                    fileName: 'fileName1',
                    fileBook: 'src/public/files/file1.pdf'
                },
                {
                    title: 'book2',
                    description: 'description2',
                    authors: 'authors2',
                    favorite: 'favorite2',
                    fileCover: 'fileCover2',
                    fileName: 'fileName2',
                    fileBook: 'src/public/files/file2.pdf'
                },
            ]);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.initBooks = initBooks;
//# sourceMappingURL=utils.js.map