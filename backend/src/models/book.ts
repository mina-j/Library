import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
    comments:{
        type: Array
    }
})

export default mongoose.model('Book', Book, 'books');
