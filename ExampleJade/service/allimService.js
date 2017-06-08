const
  request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  message = require('../service/message');
const Database = require('../database');
const Msg = require('../message');

module.exports.checkAllimYn = function(req, callback){
  async.waterfall(
    [
      function(callback){
        Database.UserKey.findUserKey(req, callback);
      },
      function(req, callback){
        //console.log("waterfall2 :: " , req.doc);
        if(req.doc == null){
          console.log("신규유저");
          Database.UserKey.saveUserKey(req, callback);
        }else{
          Database.UserKey.findUserKey(req, callback);
        }
      },
      function(req, callback){
        //console.log("waterfall3 :: " , req.doc);
        Database.UserKey.findUserKey(req, callback);
      }
    ],
    function(err, req){
      if(err){
        console.log(err)
      };
      var _allim_yn = req.doc.allim.allim_yn;
      if("Y" == _allim_yn){
        req.body.content = '메뉴';
        Database.UserKey.updateMeta(req, callback(null, message.messageButtonsType('이미 참가 하였습니다. (부끄)\r\n초기 화면으로 돌아갑니다.')) );
      }else{
        Database.UserKey.updateMeta(req, callback(null, message.baseTypePolicyAgree(Msg.getMsgAllim("알림톡 수신동의하고 선물받기", "1"), '', '')) );
      }
    }
  );
}

module.exports.allimEventKeyboard = (req, content, callback) => {
  console.log("allimService.allimEventKeyboard : "+ content);
  var regExp = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;

  switch (content) {
    case "00":
      callback(null, message.messageButtonTypePolicyAgree(Msg.getMsgAllim("알림톡 수신동의하고 선물받기", "3"), '약관 상세 보기(Link)', 'http://google.com'));
    break;
    case "동의":
      callback(null, message.messageButtonTypePolicyAgree(Msg.getMsgAllim("알림톡 수신동의하고 선물받기", "3"), '약관 상세 보기(Link)', 'http://google.com'));
    break;
    case "개인정보 수집에 동의합니다.":
      Database.UserKey.updateAllimYn(req, callback(null, message.messageButtonsType(Msg.getMsgAllim("알림톡 수신동의하고 선물받기", "4"))) );
      req.body.content = '';
      Database.UserKey.updateMeta(req, null);
    break;
    default:
      if(regExp.test(content) && (9 < content.length && content.length < 12)){
        Database.UserKey.updatePhoneNum(req, callback(null, message.baseTypePolicyAgree(Msg.getMsgAllim("알림톡 수신동의하고 선물받기", "2"), '약관 상세 보기(Link)', 'http://naver.com')) );

      }else{
        callback(null, message.baseType('올바른 입력값이 아닙니다.'));
      }
      break;
  }
};
