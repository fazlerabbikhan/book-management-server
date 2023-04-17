const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bookSchema = require('../schemas/BookSchema');
const Book = new mongoose.model('Book', bookSchema);

// post a book
router.post('/', async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save(req.body);
    try {
        res.status(200).json({
            message: "Book was inserted successfully!"
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

// post multiple books
router.post('/all', async (req, res) => {
    await Book.insertMany(req.body);
    try {
        res.status(200).json({
            message: "Books were inserted successfully!"
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

// get all the books
router.get('/all', async (req, res) => {
    const allBooks = await Book.find({});
    const mapped = allBooks.map((
        {
            _id, title, publisher, publisherAge, publicationDate, type }) => (
        {
            _id, title, publisher, publisherAge, publicationDate, type
        }));
    try {
        res.send(mapped)
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

// get a book by id
router.get('/:id', async (req, res) => {
    const book = await Book.findOne({ _id: req.params.id });
    try {
        res.send(book)
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

// update a book
router.put('/:id', async (req, res) => {
    await Book.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                title: req.body.title,
                publisher: req.body.publisher,
                publisherAge: req.body.publisherAge,
                publicationDate: req.body.publicationDate,
                type: req.body.type
            }
        },
        { new: true, useFindAndModify: false });
    try {
        res.status(200).json({
            message: "Book was updated successfully!"
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

// delete a book
router.delete('/:id', async (req, res) => {
    await Book.deleteOne({ _id: req.params.id });
    try {
        res.status(200).json({
            message: "Book was deleted successfully!"
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

module.exports = router;