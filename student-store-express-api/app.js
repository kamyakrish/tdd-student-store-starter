

const storeRouter = require('./routes/store');
const express = require('express');
const cors = require('cors')
const { NotFoundError } = require("./utils/errors")

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/store", storeRouter);

app.get('/', (req, res) => {
    res.status(200).send({ "ping": "pong" });
});

// 404 Errors
app.use((req, res, next) => {
    return next(new NotFoundError())
})

// Generic Handler
app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message

    return res.status(status).json({
        error: { message, status },
    })
})

module.exports = app;
