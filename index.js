const express = require('express');
const mongoose = require('mongoose');
const bookHandler = require('../routeHandler/BookHandler');

// express app initialization
const app = express();
app.use(express.json());

// database connection with mongoose
mongoose.connect("mongodb://localhost/books", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connection successful!"))
    .catch((err) => console.log(err))

// application routes
app.use('/book', bookHandler);

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err })
};

// listening to server
app.listen(27017, () => {
    console.log('app listening at port 27017')
});

app.get('/', (req, res) => {
    res.send('SERVER IS WORKING!')
})