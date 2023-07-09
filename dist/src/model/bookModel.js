"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const BookScheme = new mongoose_1.Schema({
    id: String,
    title: String,
    description: String,
    authors: String,
    favorite: String,
    fileCover: String,
    fileName: String,
    fileBook: String,
}, {
    versionKey: false,
    id: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});
exports.BookModel = (0, mongoose_1.model)('Book', BookScheme);
//# sourceMappingURL=bookModel.js.map