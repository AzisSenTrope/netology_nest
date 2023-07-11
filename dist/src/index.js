"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const PORT = process.env.PORT || 3002;
const urlDB = process.env.URL_DB || 'mongodb://root:example@mongo:27017/';
(0, server_1.runServer)(PORT, urlDB);
//# sourceMappingURL=index.js.map