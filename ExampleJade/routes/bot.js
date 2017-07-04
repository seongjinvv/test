const express = require('express');
const router = express.Router();
const message = require('../service/message');
const Bot = require('../service/botService');
const Database = require('../database');
var mongoose = require('mongoose');
const Allim = require('../service/allimService');
const Research = require('../service/researchService');
const Survey = require('../service/satisfactionSurveyService');
// ===================================================== 디버깅용 코드
//console.log("req.url :" + req.url);
//console.log("req.body : " + JSON.stringify(req.body) );
// ===================================================== 디버깅용 코드

const checkUserKey = (req, res, next) => {
  next();
}
router.get('/keyboard', (req, res) => {

  console.log("---------------------------------");
  console.log("req.url :" + req.url);
  console.log("req.body : " + JSON.stringify(req.body) );
  console.log("---------------------------------");


  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify(message.buttonsType()));
});

function cb_chooseBaseKeyboard(err, ersult){
  if(!err) {
    res.set({
      'content-type': 'application/json'
    }).send(JSON.stringify(result));
  }else{
    res.set({
      'content-type': 'application/json'
    }).send(JSON.stringify(message.baseType('다시 시도해 주세요.')));
  }
}

//router.post('/message', checkUserKey, (req, res) => {
router.post('/message', (req, res) => {
  const _obj = {
    user_key: req.body.user_key,
    type: req.body.type,
    content: req.body.content
  };
  var user_key = req.body.user_key;

  if(_obj.type == 'text'){
    if((message.buttons).indexOf(_obj.content) != -1){
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
    }else{
      if(_obj.content == "메뉴"){
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
      }else{
        console.log("find meta");
        Database.UserKey.findUserKey(req, (err, result) => {
          //console.log("find meta req.doc :: \r\n", result.doc);

          console.log("req.doc.meta.before_content :: ", req.doc.meta.before_content);
          var _before_contet = req.doc.meta.before_content;
          // 알림톡 수신동의하고 선물받기
          if(message.buttons[0] == _before_contet){
            Allim.allimEventKeyboard(req, _obj.content, (err, result) => {
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
          // 고객 상담 서비스 만족도 평가
          else if(message.buttons[1] == _before_contet){
            Survey.surveyKeyboard(req, _obj.content, (err, result) => {
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
          // 고객 설문조사
          else if(message.buttons[2] == _before_contet){
            Research.researchEventkeyboard(req, _obj.contetn, (err, result) => {
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
        });
      }
    }
  }else{
    // phoho type
  }
});
// 친구 추가
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
  req.body.content = "";
  req.body.user_key = req.params.user_key;
  console.log("채팅방 나가기 :: ", req.body);
  Database.UserKey.updateMeta(req, res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true})) );
  /*
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
  */
});

module.exports = router;
