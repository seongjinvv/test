// get mongoose package
var mongoose = require('mongoose');
// connect to mongoDB
//local DB
//mongoose.connect('mongodb://localhost:27017/local?maxPoolSize=10');
//server DB
mongoose.connect('mongodb://localhost:27017/local?maxPoolSize=10');
//mongoose.connect('mongodb://localhost:24790/local?maxPoolSize=10');

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
  allim: {
    phone_num: String,
    allim_yn: String
  },
  research: {
    phone_num: String,
    research_yn: String,
		answer1: String,
		answer2: String
  },
  meta: {
    before_content: String
  }
  //data: 'Object'
});

// compiles schema into a model
var User = mongoose.model('User', userSchema);

module.exports.test  = function(req, res){
  console.log("testestestestset");
}


let UserKey = {};
UserKey.findUserKey = (req, callback) => {
  console.log("[method] Database.UserKey.findUserKey");
  //console.log("req :: \r\n", req.body);
  User.findOne({'user_key': req.body.user_key}, function(err, doc){
    if(err){
      console.log("[ERROR] Database.UserKey.findUserKey :: ", err);
      callback(err, req);
    }
    if(doc){
      req.doc = doc;
      //console.log("req.doc :: \r\n", req.doc);
      callback(null, req);
    }else{
      req.doc = null;
      callback(null, req);
    }

  });
};
UserKey.saveUserKey = (req, callback) => {
  console.log("[method] Database.UserKey.saveUser");
  //console.log("req :: \r\n", req.body);
  var newUser = new User({'user_key': req.body.user_key,
                          'phone_num': null,
                          'allim':{'phone_num': null, 'allim_yn':'N'},
                          'research':{'phone_num': null, 'research_yn':'N', 'answer1': null, 'answer2': null},
                          'meta': {'before_content': req.body.content} //이전 단계 값 저장
                        });
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

UserKey.updateMeta = (req, callback) => {
  console.log("[method] Database.UserKey.updateMeta");
  var _before_contet = "";
  if(req.body.content){
    _before_contet = req.body.content;
  }
  User.findOneAndUpdate({'user_key': req.body.user_key}, {$set:{meta:{'before_content':req.body.content}}}, function(err, doc){
    if(err){
      console.log("[ERROR] Database.UserKey.updateMeta find:: ", err);
      callback(err, req);
    }
    console.log("update meta success!! \r\n before_content :: ",  req.body.content);
    if(callback){
      callback;
    }
  });
};

UserKey.updatePhoneNum = (req, callback) => {
  console.log("[method] Database.UserKey.updatePhoneNum");
  User.findOneAndUpdate({'user_key': req.body.user_key}, {$set:{'phone_num':req.body.content}}, function(err, doc){
    if(err){
      console.log("[ERROR] Database.UserKey.updatePhoneNum:: ", err);
      callback(err, req);
    }
    console.log("update PhoneNum success!! \r\n phone_num :: ",  req.body.content);
    if(callback){
      callback;
    }
  });
};

UserKey.updateAllimYn = (req, callback) => {
  console.log("[method] Database.UserKey.updateAllimYn");
  var _allim_yn = "N";
  if(req.body.content == "개인정보 수집에 동의합니다."){
    _allim_yn = "Y";
  }
  User.findOneAndUpdate({'user_key': req.body.user_key}, {$set:{allim:{'phone_num':null, 'allim_yn':_allim_yn}} }, function(err, doc){
    if(err){
      console.log("[ERROR] Database.UserKey.updateAllimYn :: ", err);
      callback(err, req);
    }
    console.log("update AllimYn success!! \r\n allim_yn :: ",  _allim_yn);
    if(callback){
      callback;
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
