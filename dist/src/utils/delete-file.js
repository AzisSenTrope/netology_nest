"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const fs_1 = __importDefault(require("fs"));
function deleteFile(path) {
    fs_1.default.unlinkSync(path);
}
exports.deleteFile = deleteFile;
//# sourceMappingURL=delete-file.js.map