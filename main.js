const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
  path: path.resolve(__dirname, (process.env.NODE_ENV || 'development') + '.env')
})
const serverless = require('serverless-http');
const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const multer = require('multer')

const indexRouter = require('./routes/index')
const tiempoactividadRouter = require('./routes/tiempoactividad')

const main = express()
main.use(bodyParser.urlencoded({ extended: true }))
// view engine setup
main.set('views', path.join(__dirname, 'views'))
main.set('view engine', 'pug')

main.use(cors())
main.use(logger('dev'))
main.use(express.json())
main.use(express.urlencoded({ extended: false }))
main.use(cookieParser())
main.use(express.static(path.join(__dirname, 'public')))

main.use('/api', indexRouter)
main.use('/api/tiempoxactividad', tiempoactividadRouter)

// catch 404 and forward to error handler
main.use(function (req, res, next) {
  next(createError(404))
})

// error handler
main.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

//cron jobs
/*
if(process.env.NODE_ENV==='development') module.exports = main;
else module.exports.handler = serverless(main);*/
//TODO FIX
module.exports.handler = serverless(main);
//module.exports = main;

