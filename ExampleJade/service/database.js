// mongoDB 설정
const MongoClient = require('mongoDB').MongoClient;
const User = require('./user');

let Database = {};

/*
var database;

function connectDB() {
  //database 연결 정보
  var databaseUrl = 'mongodb://localhost:27017/local';
  //database 연결
  MongoClient.connect(databaseUrl, function(err, db){
    if (err) throw err;
    console.log("DB에 연결 되었습니다.");
    database = db;
  })
}
// db연결
connectDB();
*/

Database.database = (req, res, next) => {
  var database;
  console.log("Database.database :: 호출 됨  ");
  //database 연결 정보
  var databaseUrl = 'mongodb://localhost:27017/local?maxPoolSize=10';
  //database 연결
  MongoClient.connect(databaseUrl, function(err, db){
    if (err) throw err;
    console.log("DB에 연결 되었습니다.");
    req.db = db;
    User.info(req, res, next);
  })
};

module.exports = Database;
