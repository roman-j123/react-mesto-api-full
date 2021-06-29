const Cards = require('../models/card');
const ValidationError = require('../errors/validationError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

function getAllCards(req, res, next) {
  console.log('GET ALL CARDS');
  return Cards.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
}

function createCard(req, res, next) {
  console.log(req.user._id);
  const { name, link } = req.body;
  return Cards.create({ name, link, owner: req.user._id })
    .then((card) => {
      console.log(`CREATE CARD ${card.name}`);
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError('Переданы некорректные данные');
        next(error);
      }
      next(err);
    });
}

function deleteCard(req, res, next) {
  return Cards.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Вы не можете удалять карточки других пользователей');
      }
      card.remove();
      res.send({ message: `DELETE CARD ${card.id}` });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new ValidationError('Передан неверный идентификатор карточки');
        next(error);
      }
      next(err);
    });
}

function submitCardLike(req, res, next) {
  return Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new ValidationError('Переданы некорректные данные');
        next(error);
      }
      next(err);
    });
}

function deleteLikeCard(req, res, next) {
  return Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new ValidationError('Переданы некорректные данные');
        next(error);
      }
      next(err);
    });
}

module.exports = {
  createCard,
  deleteCard,
  getAllCards,
  submitCardLike,
  deleteLikeCard,
};
