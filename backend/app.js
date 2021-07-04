const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');

const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/notFoundError');
require('dotenv').config();

const { PORT = 3001 } = process.env;
const app = express();
const options = {
  origin: [
    'https://roman-j123.nomoredomains.monster',
    'http://roman-j123.nomoredomains.monster',
    'https://api.nomoredomains.monster',
    'http://api.nomoredomains.monster',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
app.use('*', cors(options));
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', indexRoutes);
app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  login);

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/, 'URL'),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  createUser);

app.get('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listen on port:${PORT}`);
});
