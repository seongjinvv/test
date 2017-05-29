const express = require('express');
const router = express.Router();
const message = require('../service/message');
const Bot = require('../service/BotService');


const checkUserKey = (req, res, next) => {
  if(req.body.user_key !== undefined){
    next();
  }else{
    //res.status(500).send({ error: 'user_key is undefined' });
    res.status(500).send(req.body);
  }
};

router.get('/keyboard', (req, res) => {
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify(message.buttonsType()));
});


//TODO : Create Customize Method
// 메시지 통신 testtest
router.post('/message', checkUserKey, (req, res) => {
  const _obj = {
    user_key: req.body.user_key,
    type: req.body.type,
    content: req.body.content
  };

  Bot.choseMenu(req, _obj.content, (err, result) => {
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
// 채팅방 개설
router.post('/friend', checkUserKey, (req, res) => {
  const user_key = req.body.user_key;
  console.log(`${user_key}님이 채팅방에 참가했습니다.`);

  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});
// 채팅방 차단
router.delete('/friend', checkUserKey, (req, res) =>{
  const user_key = req.body.user_key;
  console.log(`${user_key}님이 채팅방을 차단했습니다.`);

  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});
// 채팅방 나가기
router.delete('/chat_room/:user_key', checkUserKey, (req, res) => {
  const user_key = req.params.user_key;
  console.log(`${user_key}님이 채팅방에서 나갔습니다.`);

  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});

module.exports = router;
