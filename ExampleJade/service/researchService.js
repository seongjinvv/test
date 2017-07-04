const
  request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  message = require('../service/message');
const Database = require('../database');
const Msg = require('../message');

module.exports.checkResearchYn = function(req, callback){
  console.log("Research.checkResearchYn method call.");
  async.waterfall(
    [
      function(callback){
        Database.UserKey.findUserKey(req, callback);
      },
      function(req, callback){
        if(req.doc == null){
          console.log("신규유저");
          Database.UserKey.saveUserKey(req, callback);
        }else{
          Database.UserKey.findUserKey(req, callback);
        }
      },
      function(req, callback){
        Database.UserKey.findUserKey(req, callback);
      }
    ],
    function(err, req){
      if(err){
        console.log(err);
      }
      var _research_yn = req.doc.research.research_yn;
      if("Y" == _research_yn){
        req.body.content = '메뉴';
        Database.UserKey.updateMeta(req, callback(null, message.messageButtonsType('이미 참가 하였습니다. (부끄)\r\n초기 화면으로 돌아갑니다.')) );
      }else{
        //Database.UserKey.updateMeta(req, callback(null, message.messageCustomButtonsType(Msg.getMsgResearch("고객 설문조사", "1"), message.buttonsResearch)) );
        //Database.UserKey.updateMeta(req, callback(null, message.photoType(Msg.getMsgResearch("고객 설문조사", "1"), "http://1.223.82.68:35000/static/images/research_1.jpg","설문조사 이동", "http://naver.com")) );
        Database.UserKey.updateMeta(req, callback(null, message.photoType(Msg.getMsgResearch("고객 설문조사", "1"), Msg.getUrlPhotoResearch(), Msg.getButtonLabelResearch(), Msg.getUrlButtonResearch()) ) );
      }
    }
  )
}
