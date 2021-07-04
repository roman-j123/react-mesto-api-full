const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const AuthError = require('../errors/authError');
const { NODE_ENV, JWT_SECRET } = process.env;

function getAllUsers(req, res, next) {
  return User.find({})
    .then((users) => {
      console.log('GET ALL USERS');
      return res.status(200).send(users);
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  return User.findById(req.user._id)
    .orFail(() => {
      throw new ValidationError('Пользователь не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new ValidationError('По не найден');
        next(error);
      }
      next(err);
    });
}

function getUser(req, res, next) {
  return User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      console.log(`GET USER ${user.id}`);
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new ValidationError('Переданы некорректные данные');
        next(error);
      }
      next(err);
    });
}

function createUser(req, res, next) {
  return bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      console.log('CREATE NEW USER');
      return res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError('Переданы некорректные данные');
        next(error);
      }
      next(err);
    });
}

function updateUserProfile(req, res, next) {
  return User.findByIdAndUpdate(req.user._id, req.body,
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      console.log(`UPDATE USER ${req.user._id}`);
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError('Переданы некорректные данные');
        next(error);
      }
      next(err);
    });
}

function updateUserAvatar(req, res, next) {
  return User.findByIdAndUpdate(req.user._id,
    {
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      console.log('UPDATE USER AVATAR');
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError('Переданы некорректные данные');
        next(error);
      }
      next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ValidationError('Переданы некорректные данные');
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ token });
      return bcrypt.compare(password, user.password);
    })
    .catch((err) => {
      const error = new AuthError('Неправильные почта или пароль');
      next(error);
    });
}

module.exports = {
  getAllUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
