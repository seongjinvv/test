const
  request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  //RedisDAO = require('../service/RedisDAO'),
  message = require('../service/message'),
  Bot = {};
const Database = require('../database');
const Allim = require('./allimService');
const Research = require('./researchService');


Bot.chooseBaseKeyboard = (req, content, callback) => {
  console.log("chooseBaseKeyboard >> ", content);
  switch (content) {
    case "메뉴":
      Database.UserKey.updateMeta(req, callback(null, message.messageButtonsType('초기 화면으로 돌아갑니다.')));
      //callback(null, message.messageButtonsType('초기 화면으로 돌아갑니다.'));

    break;
    case message.buttons[0]: // 수신동의 시나리오
      Allim.checkAllimYn(req, callback);
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
