const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

// 1. Middlewares

const app = express();
app.use(morgan('dev'));

app.use(express.json()); // express.json() - middleware

app.use((req, res, next) => {
  console.log('Hello from the middleware!🥳🤩');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);
module.exports = app;
