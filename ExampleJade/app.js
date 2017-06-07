const express = require('express');
const http = require('http');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const MongoClient = require('mongoDB').MongoClient;

//Express middleware
var static = require('serve-static')
    , errorHandler =require('errorhandler');
// 오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');
// Session middleware
var expressSession = require('express-session');

const user = require('./service/user');
const bot = require('./routes/bot');
// express 객체 생성
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session 설정
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}));

// app.use('/', index);
// app.use('/users', users);

// mongodb 연결
/*
app.use(function (req, res, next){
  console.log("미들웨어 추가 테스트");
  if(req.body.user_key == undefined){
    // req method : get /keyboard
    next();
  }else{
    var database;
    //database 연결 정보
    var databaseUrl = 'mongodb://localhost:27017/local?maxPoolSize=10';
    //database 연결
    MongoClient.connect(databaseUrl, function(err, db){
      if (err){
        console.log('database 연결 실패.');
        throw err;
      }else{
        req.db = db;
        console.log("DB에 연결 되었습니다.");
        //users 컬렉션 참조
        var users = req.db.collection('users');
        users.find({"user_key": req.body.user_key}).toArray(function (err, docs) {
          if(err){
            console.log(err);
            res.status(500).send(req.body);
          }

          if(docs.length > 0){
            console.log("user_key 일치 사용자 찾음. user_key :", req.body.user_key);
            //console.log(docs);
            req.docs.userInfo = docs[0];
            next();
          }else{
            console.log("user_key 일치 사용자 찾지 못함. 신규회원. user_key :", req.body.user_key);
            next();
          }
        });
      }
    });
  }
});
*/
app.use('/', bot);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
