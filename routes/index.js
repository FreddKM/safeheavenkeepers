const indexRouter = require('express').Router();

/* GET home page. */
indexRouter.get('/', (req, res, next) => {
  console.log(res)
  res.render('index', { title: 'Home', pathname: req.originalUrl });
});

module.exports = indexRouter;
