"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Book = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    publisher: {
        type: String
    },
    year: {
        type: Number
    },
    lang: {
        type: String
    },
    cover: {
        type: String
    },
    person: {
        type: Array
    },
    num: {
        type: Number
    },
    comments: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Book', Book, 'books');
//# sourceMappingURL=book.js.map