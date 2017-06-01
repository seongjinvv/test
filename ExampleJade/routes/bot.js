const express = require('express');
const router = express.Router();
const message = require('../service/message');
const Bot = require('../service/botService');
const PolicyAgree = require('../service/policyAgreeService');

// ===================================================== 디버깅용 코드
//console.log("req.url :" + req.url);
//console.log("req.body : " + JSON.stringify(req.body) );
// ===================================================== 디버깅용 코드
// mongoDB 설정
var MongoClient = require('mongoDB').MongoClient;
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

module.exports = database;


// 사용자 인증 함수
var authUser = function(database, req, callback){
  console.log('authUser 호출 됨');

  //users 컬렉션 참조
  var users = database.collection('users');
  users.find({"user_key": req.body.user_key}).toArray(function (err, docs) {
    if(err){
      callback(err, null);
    }
    if(docs.length > 0){
      console.log("user_key 일치 사용자 찾음. user_key :", req.body.user_key);
      //console.log(docs);
      callback(null, docs);
    }else{
      console.log("user_key 일치 사용자 찾지 못함. 신규회원.");
      callback(null, null);
    }
  })
}

const checkUserKey = (req, res, next) => {
  console.log("---------------------------------");
  console.log("req.url :" + req.url);
  console.log("req.body : " + JSON.stringify(req.body) );
  console.log("---------------------------------");
  if(req.body.user_key !== undefined){
    //connectDB();
    if(database){
      authUser(database, req, function (err, docs) {
        if(err) throw err;
        if(docs){
          console.dir(docs);
          next();
        }else{
          console.log("일치 회원 없음. 신규 폰번호 입력 받자.");
          next();
        }
      });
    }else{
      console.log('database 연결 실패.');
      res.status(500).send(req.body);
    }
  }else{
    //res.status(500).send({ error: 'user_key is undefined' });
    res.status(500).send(req.body);
  }

};

router.get('/keyboard', (req, res) => {
  console.log("---------------------------------");
  console.log("req.url :" + req.url);
  console.log("req.body : " + JSON.stringify(req.body) );
  console.log("---------------------------------");
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify(message.buttonsType()));
});


//TODO : Create Customize Method
// 메시지 통신
/*
router.post('/message', checkUserKey, (req, res) => {
  const _obj = {
    user_key: req.body.user_key,
    type: req.body.type,
    content: req.body.content
  };
  console.log(`user_key : ${_obj.user_key} \r\n content : ${_obj.content}`);

  Bot.chooseBaseKeyboard(req, _obj.content, (err, result) => {
    if(!err) {
      res.set({
        'content-type': 'application/json'
      }).send(JSON.stringify(result));
    }else{
      res.set({
        'content-type': 'application/json'
      }).send(JSON.stringify(message.baseType('다시 시도해 주세요.')));
    }
  });
});
*/
router.post('/message', checkUserKey, (req, res) => {
  const _obj = {
    user_key: req.body.user_key,
    type: req.body.type,
    content: req.body.content
  };

  if(_obj.type == 'text'){

    if((message.buttons).indexOf(_obj.content) != -1){ //depth 1: keyboard 버튼 입력 message인 경우
      Bot.chooseBaseKeyboard(req, _obj.content, (err, result) => {
        if(!err) {
          res.set({
            'content-type': 'application/json'
          }).send(JSON.stringify(result));
        }else{
          res.set({
            'content-type': 'application/json'
          }).send(JSON.stringify(message.baseType('다시 시도해 주세요.')));
        }
      });
    }else{ //depth 2: 사용자 입력 text인 경우

      if(_obj.content == "메뉴"){
        console.log("bot.js 22 :: ",_obj.content == "메뉴");
        Bot.chooseBaseKeyboard(req, _obj.content, (err, result) => {
          if(!err) {
            res.set({
              'content-type': 'application/json'
            }).send(JSON.stringify(result));
          }else{
            res.set({
              'content-type': 'application/json'
            }).send(JSON.stringify(message.baseType('다시 시도해 주세요.')));
          }
        });
      }else if(_obj.contetn == "고객 상담 서비스 만족도 평가"){


      }else if(_obj.contetn == "고객 설문조사"){


      }else{
          PolicyAgree.policyAgreeKeyboard(req, _obj.content, (err, result) => {
          if(!err) {
            res.set({
              'content-type': 'application/json'
            }).send(JSON.stringify(result));
          }else{
            res.set({
              'content-type': 'application/json'
            }).send(JSON.stringify(message.baseType('다시 시도해 주세요.')));
          }
        });
      }
    }


  }else{
    //type : photo
  }

});
// 채팅방 개설
router.post('/friend', checkUserKey, (req, res) => {
  const user_key = req.body.user_key;
  console.log(`${user_key}님이 친구 추가했습니다.`);

  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});
// 친구 차단
router.delete('/friend', checkUserKey, (req, res) =>{
  //const user_key = req.body.user_key;
  //console.log(`${user_key}님이 친구 차단했습니다.`);

  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});
// 채팅방 나가기
router.delete('/chat_room/:user_key', checkUserKey, (req, res) => {
  //const user_key = req.params.user_key;
  //console.log(`${user_key}님이 채팅방에서 나갔습니다.`);

  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});

module.exports = router;
