const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  try {
    req.user = jwt.verify(
      req.cookies.jwt,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : 'dev-secret',
    );
    next();
  } catch (err) {
    next(new AuthError('Нет доступа к данной странице'));
  }
};
