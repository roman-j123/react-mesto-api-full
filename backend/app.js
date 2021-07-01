const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/', indexRoutes);
app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);

app.post('/signin', login);
app.post('/signup', createUser);

app.get('*', (req, res) => {
  res.status(404).send({ message: '404. Страница не найдена' });
});

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
