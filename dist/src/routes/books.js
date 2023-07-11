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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const bookRepository_1 = require("../bookRepository");
const container_1 = require("../container");
const endpoints_1 = require("../endpoints/endpoints");
const express_1 = __importDefault(require("express"));
const file_1 = require("../middleware/file");
const utils_1 = require("../utils/utils");
const config_1 = require("../config");
const const_1 = require("../utils/const");
const delete_file_1 = require("../utils/delete-file");
const router = express_1.default.Router();
exports.router = router;
const Book = container_1.container.get(bookRepository_1.BookRepository);
router.get(endpoints_1.ENDPOINTS.BOOK_DOWNLOAD, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        console.log('id ', id);
        const book = yield Book.getBook(id);
        console.log('book ', book);
        if (!book) {
            res.status(const_1.STATUSES.NOT_FOUND);
            res.json('404 | страница не найдена');
            return;
        }
        res.download(config_1.dirname + '/' + book.fileBook, book.fileName);
    }
    catch (err) {
        res.status(const_1.STATUSES.SERVER_ERROR);
        res.json(err);
    }
}));
router.post(endpoints_1.ENDPOINTS.LOGIN, (req, res) => {
    res.json(utils_1.TEST_RESPONSE);
});
router.get(endpoints_1.ENDPOINTS.BOOKS, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log({ req });
        const books = yield Book.getBooks();
        res.json(books);
    }
    catch (err) {
        res.status(const_1.STATUSES.SERVER_ERROR);
        res.json(err);
    }
}));
router.get(endpoints_1.ENDPOINTS.BOOK_ID, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield Book.getBook(id);
        res.json(book);
    }
    catch (err) {
        res.status(const_1.STATUSES.SERVER_ERROR);
        res.json(err);
    }
}));
router.post(endpoints_1.ENDPOINTS.BOOKS, file_1.fileMulter.single('fileBook'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { file } = req;
    if (file) {
        const fileBook = file.path;
        try {
            const newBook = yield Book.createBook(Object.assign(Object.assign({}, req.body), { fileBook }));
            res.status(const_1.STATUSES.CREATED);
            res.json(newBook);
        }
        catch (err) {
            res.status(const_1.STATUSES.SERVER_ERROR);
            res.json(err);
        }
    }
}));
router.put(endpoints_1.ENDPOINTS.BOOK_ID, file_1.fileMulter.single('fileBook'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield Book.getBook(id);
        if (book) {
            const { file } = req;
            if (file) {
                (0, delete_file_1.deleteFile)(config_1.dirname + '/' + book.fileBook);
                const fileBook = file.path;
                const fileName = file.originalname;
                yield Book.updateBook(id, Object.assign(Object.assign({}, req.body), { fileName,
                    fileBook }));
            }
            else {
                yield Book.updateBook(id, Object.assign({}, req.body));
            }
            res.redirect(`/api/books/${id}`);
        }
    }
    catch (err) {
        res.status(const_1.STATUSES.SERVER_ERROR);
        res.json(err);
    }
}));
router.delete(endpoints_1.ENDPOINTS.BOOK_ID, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield Book.getBook(id);
        if (book) {
            yield Book.deleteBook({ _id: id });
            (0, delete_file_1.deleteFile)(config_1.dirname + '/' + book.fileBook);
            res.json(true);
        }
    }
    catch (err) {
        res.status(const_1.STATUSES.SERVER_ERROR);
        res.json(err);
    }
}));
//# sourceMappingURL=books.js.map