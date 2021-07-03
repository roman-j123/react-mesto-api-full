const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('Cookies: ', req.cookies.jwt)
  res.status(200).send('All ok');
});

module.exports = router;
