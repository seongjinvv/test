const
  request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  //RedisDAO = require('../service/RedisDAO'),
  message = require('../service/message'),
  Bot = {};
const Database = require('../database');


Bot.chooseBaseKeyboard = (req, content, callback) => {
  console.log("chooseBaseKeyboard >> ", content);
  switch (content) {
    case "메뉴":
      Database.UserKey.updateMeta(req, callback(null, message.messageButtonsType('초기 화면으로 돌아갑니다.')));
      //callback(null, message.messageButtonsType('초기 화면으로 돌아갑니다.'));
      //before_content 초기화

    break;
    case message.buttons[0]: // 수신동의 시나리오
      //msgAlertAgree(req, callback);
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
            console.log("수신동의 여부 확인을 위한 유저정보 재조회");
            Database.UserKey.findUserKey(req, callback);
          }
        ],
        function(err, req){
          if(err) console.log(err);
          console.log("최종 req.doc ::", req.doc);

          var _allim_yn = req.doc.allim_yn;
          if(_allim_yn == "Y"){
            req.body.content = '메뉴';
            Database.UserKey.updateMeta(req, callback(null, message.messageButtonsType('이미 참가 하였습니다. (부끄)\r\n초기 화면으로 돌아갑니다.')) );
            //callback(null, message.messageButtonsType('이미 참가 하였습니다. (부끄)\r\n초기 화면으로 돌아갑니다.'));
          }else{
            Database.UserKey.updateMeta(req, callback(null, message.baseTypePolicyAgree(getPolicyAgreeMsg(), '', '')) );
            //callback(null, message.baseTypePolicyAgree(getPolicyAgreeMsg(), '', ''));
          }
        }
      );

    break;
    case message.buttons[1]: // 설문조사 시나리오
      //callback(null, message.baseType(getResearchMsg()));
      callback(null, message.messageButtonsType('준비 중입니다. (부끄)\r\n초기 화면으로 돌아갑니다.'));
    break;
    case message.buttons[2]:
      /*
      callback(null, message.messageButtonType(content + "너만 없어.", "ㅋㅋㅋ", 'https://www.google.co.kr/search?q=%EB%82%98%EB%A7%8C+%EC%97%86%EC%96%B4+%EA%B3%A0%EC%96%91%EC%9D%B4&safe=off&tbm=isch&imgil=et6IC7bU5mOjYM%253A%253Bg83dwEjClcGCDM%253Bhttp%25253A%25252F%25252Fblog.naver.com%25252FPostView.nhn%25253FblogId%2525253Dhapmeab651%25252526logNo%2525253D220876346062&source=iu&pf=m&fir=et6IC7bU5mOjYM%253A%252Cg83dwEjClcGCDM%252C_&usg=__ljbP_MYOohl1tB9Y8ZTeHytKAKQ%3D&biw=1344&bih=751&dpr=1.25&ved=0ahUKEwi9jZ_fuZTUAhWMF5QKHQRkDLUQyjcINQ&ei=bbwrWf2iBoyv0ASEyLGoCw#imgrc=et6IC7bU5mOjYM:'));
      */
      callback(null, message.messageButtonsType('준비 중입니다. (부끄)\r\n초기 화면으로 돌아갑니다.'));
    break;
    default:
      callback(null, message.baseType('올바른 입력값이 아닙니다.'));
      break;
  }
};
function msgAlertAgree(req, callback){
  Database.UserKey.findUserKey(req, function(err, result, doc){
    if(err){
      cosole.log("[ERROR]Database.UserKey.findUserKey", err);
    }else{
      if(result != "success"){ // 신규 user_key 저장
        console.log("callback :: ", result);
        //save UserKey
        Database.UserKey.saveUserKey(req, function(err, result, doc){
          if(err){
            cosole.log("[ERROR]Database.UserKey.saveUserKey", err);
          }else{
            //console.log("callback ::", doc);
            //console.log("callback :: ", result);
            callback(null, message.baseTypePolicyAgree(getPolicyAgreeMsg(), '', ''));
          }
        });

      }else if(result == "success"){
        //console.log("callback ::", doc);
        console.log("알림톡 서비스 동의 여부 : ", doc[0].allim_yn);
        var _allim_yn = doc[0].allim_yn;
        if(_allim_yn == "Y"){
          callback(null, message.messageButtonsType('이미 참가 하였습니다. (부끄)\r\n초기 화면으로 돌아갑니다.'));
        }else{
          callback(null, message.baseTypePolicyAgree(getPolicyAgreeMsg(), '', ''));
        }
      }else{
        callback(null, message.messageButtonsType('잘못 된 입력입니다. (부끄)\r\n초기 화면으로 돌아갑니다.'));
      }
    }
  });
}

function cb_findUserKey(err, result, doc){
  if(err){
    cosole.log("[ERROR]Database.UserKey.findUserKey", err);
  }else{
    if(result != "success"){ // 신규 user_key 저장
      console.log("callback :: ", result);
      //save UserKey
      Database.UserKey.saveUserKey(req, function(err, result, doc){
        if(err){
          cosole.log("[ERROR]Database.UserKey.saveUserKey", err);
        }else{
          //console.log("callback ::", doc);
          //console.log("callback :: ", result);
          callback(null, message.baseTypePolicyAgree(getPolicyAgreeMsg(), '', ''));
        }
      });

    }else if(result == "success"){
      //console.log("callback ::", doc);
      console.log("알림톡 서비스 동의 여부 : ", doc[0].allim_yn);
      var _allim_yn = doc[0].allim_yn;
      if(_allim_yn == "Y"){
        callback(null, message.messageButtonsType('이미 참가 하였습니다. (부끄)\r\n초기 화면으로 돌아갑니다.'));
      }else{
        callback(null, message.baseTypePolicyAgree(getPolicyAgreeMsg(), '', ''));
      }
    }else{
      callback(null, message.messageButtonsType('잘못 된 입력입니다. (부끄)\r\n초기 화면으로 돌아갑니다.'));
    }
  }
}
var getTestFunction = function(){
  let testResult;

  testResult = '자동응답 테스트 입니다.(방긋)\r\n';

  return testResult;
};
// 수신동의 시나리오 step1
var getPolicyAgreeMsg = function(){
  let testResult;

  testResult = '초기 화면으로 이동은 "메뉴"를 입력해주세요.\r\n\r\n ';
  testResult += "(축하)이벤트 참여 절차 : \r\n";
  testResult += "    1.개인정보 입력\r\n";
  testResult += "    2.서비스 약관 동의\r\n";
  testResult += "    3.개인정보 수집 동의\r\n\r\n";
  testResult += '(선물)이벤트 참여를 위하여 휴대폰 번호를 입력해주세요.(굿)\r\n';
  testResult += '(입력 예 : 01012345678)\r\n';

  return testResult;
};
// 설문조사 시나리오 step1
var getResearchMsg = function(){
  let testResult;

  testResult = "고객 상담 서비스 만족도 평가\r\n";
  testResult += "--------------\r\n\r\n";
  testResult += "고객님께 보다 나은 서비스를 제공해 드리고자 상담 서비스 만족도 평가를 준비하였습니다.";
  testResult += "(방긋)이벤트 참여를 위하여 휴대폰 번호를 입력해주세요.\r\n\r\n";
  testResult += '(-없이 숫자만 입력 해 주세요.)';

  return testResult;
};
module.exports = Bot;
