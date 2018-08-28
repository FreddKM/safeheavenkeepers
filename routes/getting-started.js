const gettingStartedRouter = require('express').Router();

/* GET home page. */
gettingStartedRouter.get('/', (req, res, next) => {
  res.render('getting-started', { title: 'Getting Started', pathname: req.originalUrl });
});

module.exports = gettingStartedRouter;