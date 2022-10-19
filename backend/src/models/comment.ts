import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Comment = new Schema({

    username: {
        type: String
    },
    text: {
        type: String
    },
    ocena: {
        type: Number
    },
    book_ID: {
        type: Number
    }
})

export default mongoose.model('Comment', Comment, 'comments');
