const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publisherAge: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Sci-fi', 'Drama', 'Novel']
    }
});

module.exports = BookSchema;