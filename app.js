const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');


const indexRouter = require('./routes/index');
const gettingStartedRouter = require('./routes/getting-started');
const legalRouter = require('./routes/legal');
const biographyRouter = require('./routes/biography');
const contactRouter = require('./routes/contact');
const guidelinesRouter = require('./routes/guidelines');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/getting-started', gettingStartedRouter);
app.use('/legal', legalRouter);
app.use('/biography', biographyRouter);
app.use('/contact', contactRouter);
app.use('/guidelines', guidelinesRouter);

app.post('/send', (req, res, next) => {
  let outPut = `
    <p>You have a new message</p>
    <h6>Contact Details</h6>
    <ul>
      <li>name: ${ req.body.name } </li>
      <li>Subject: ${ req.body.subject } </li>
      <li>Email: ${ req.body.email } </li>
    </ul>
    <h6>Message</h6>
    <p> ${ req.body.message} </p>
  `;

  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  sgMail.setApiKey('API.KEY');
  const msg = {
    to: 'foo@email.com',
    from: req.body.name + '<' + req.body.email + '>',
    subject: req.body.subject,
    text: req.body.message
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);

  res.render('contact', {title: 'Message Sent!', pathname: req.originalUrl, confirmationMsg: '<div class="alert alert-success" role="alert">Message Sent!<br>Please '+  req.body.name + ' expect a reply within 48 hours.</div>'})
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
