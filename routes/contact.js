const contactRouter = require('express').Router();

/* GET home page. */
contactRouter.get('/', (req, res, next) => {
  res.render('contact', { title: 'Contact', confirmationMsg:'', pathname: req.originalUrl });
});

module.exports = contactRouter;