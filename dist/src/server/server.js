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
exports.runServer = void 0;
const { TEST_RESPONSE, Book, STORE, initBooks } = require('../utils/utils');
const { connect } = require('mongoose');
const express_1 = __importDefault(require("express"));
const books_1 = require("../routes/books");
const endpoints_1 = require("../endpoints/endpoints");
function runServer(port, urlDB) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connect(urlDB);
            yield initBooks();
            const app = (0, express_1.default)();
            app.use(express_1.default.json());
            app.use(endpoints_1.ENDPOINTS.API, books_1.router);
            app.listen(port);
            console.log('Сервер запущег');
        }
        catch (err) {
            console.log('Не удалось запустить сервер ', err);
        }
    });
}
exports.runServer = runServer;
//# sourceMappingURL=server.js.map