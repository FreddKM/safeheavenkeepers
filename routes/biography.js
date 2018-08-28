const bioRouter = require('express').Router();

/* GET home page. */
bioRouter.get('/', (req, res, next) => {
  res.render('biography', { title: 'Biography', pathname: req.originalUrl });
});

module.exports = bioRouter;