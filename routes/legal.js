const gettingStartedRouter = require('express').Router();

/* GET home page. */
gettingStartedRouter.get('/', (req, res, next) => {
  res.render('legal', { title: 'Legal', pathname: req.originalUrl });
});

module.exports = gettingStartedRouter;