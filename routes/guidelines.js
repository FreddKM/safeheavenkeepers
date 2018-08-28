const guideLinesRouter = require('express').Router();

/* GET home page. */
guideLinesRouter.get('/', (req, res, next) => {
  res.render('guidelines', { title: 'Guidelines', pathname: req.originalUrl });
});

module.exports = guideLinesRouter;