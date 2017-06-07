// get mongoose package
var mongoose = require('mongoose');
// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/local?maxPoolSize=10');

var db = mongoose.connection;

// we get notified if error occurs
db.on('error', console.error.bind(console, 'connection error:'));
// executed when the connection opens
db.once('open', function callback () {
	// add your code here when opening
  	console.log("open");
});

// creates DB schema
var userSchema = new mongoose.Schema({
  user_key: String,
  phone_num: String,
  allim_yn: String
  //data: 'Object'
});

// compiles schema into a model
var User = mongoose.model('User', userSchema);

module.exports.test  = function(req, res){
  console.log("testestestestset");
}

module.exports.findUserKey = function(req, res){
  console.log("[method] Database.findUserKey");
  console.log("req :: \r\n", req.body);
  User.find({'user_key': req.body.user_key}, function(err, doc){
    if(doc){
      req.doc = doc;
    }
    console.log("return :: " , req.doc);
  });
}

module.exports.saveUserKey =  function(req){
  console.log("[method] Database.saveUser");
  console.log("req :: \r\n", req.body);
  var newUser = new User();
  newUser.user_key = req.body.user_key+"";
  console.log("save data :: ", newUser);

  newUser.save(function (err, doc){
    if(err){
      console.log("create [user] collection fail!! \r\n", err);
    }
    console.log("create [user] collection success!! \r\n", doc);
  });
}

let UserKey = {};
UserKey.findUserKey = (req, callback) => {
  console.log("[method] Database.UserKey.findUserKey");
  //console.log("req :: \r\n", req.body);
  User.find({'user_key': req.body.user_key}, function(err, doc){
    if(err){
      callback(err, req);
    }
    if(doc){
      req.doc = doc;
      console.log("req.doc :: \r\n", req.doc);
      if(doc.length == 0){
        callback(err, req);
      }else{
        callback(err, req);
      }
    }

  });
};
UserKey.saveUserKey = (req, callback) => {
  console.log("[method] Database.UserKey.saveUser");
  //console.log("req :: \r\n", req.body);
  var newUser = new User({'user_key': req.body.user_key, 'phone_num': null, 'allim_yn':'N'});
  console.log("save data :: ", newUser);

  newUser.save(function (err, doc){
    if(err){
      callback(err, req);
    }else{
      console.log("create [user] collection success!! \r\n", doc);
      req.doc = doc;
      callback(err, req);
    }
  });
};


module.exports.UserKey = UserKey;




/*
module.exports = function() {
  function connect() {
    mongoose.connect('localhost:27017/local?maxPoolSize=10', function(err) {
      console.log('mongodb connected');
      if (err) {
        console.error('mongodb connection error', err);
      }
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
  require('./user.js'); // user.js는 나중에 만듭니다.
};
*/
