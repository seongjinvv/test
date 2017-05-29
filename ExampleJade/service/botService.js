const
  request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  //RedisDAO = require('../service/RedisDAO'),
  message = require('../service/message'),
  Bot = {};

Bot.choseMenu = (req, content, callback) => {
  switch (content) {
    /*
    case message.buttons[0]:
      // DB 조회 실행
      RedisDAO.getByKey(req.cache, RedisDAO.key_diet_normal, (err, result) => {
        callback(err, message.baseType(JSON.parser(result)));
      });
      break;
    */
    case message.buttons[0]:
      callback(null, message.messageButtonType(content + getTestFunction(), '클릭', 'testImg'));
    break;
    case message.buttons[1]:
      callback(null, message.messageButtonType("나만 없어 사람들 " + content + "다 있고 나만 없어 " + content, '클릭', 'https://www.google.co.kr/search?q=%EB%82%98%EB%A7%8C+%EC%97%86%EC%96%B4+%EA%B3%A0%EC%96%91%EC%9D%B4&safe=off&tbm=isch&imgil=et6IC7bU5mOjYM%253A%253Bg83dwEjClcGCDM%253Bhttp%25253A%25252F%25252Fblog.naver.com%25252FPostView.nhn%25253FblogId%2525253Dhapmeab651%25252526logNo%2525253D220876346062&source=iu&pf=m&fir=et6IC7bU5mOjYM%253A%252Cg83dwEjClcGCDM%252C_&usg=__ljbP_MYOohl1tB9Y8ZTeHytKAKQ%3D&biw=1344&bih=751&dpr=1.25&ved=0ahUKEwi9jZ_fuZTUAhWMF5QKHQRkDLUQyjcINQ&ei=bbwrWf2iBoyv0ASEyLGoCw#imgrc=et6IC7bU5mOjYM:'));
    break;
    case message.buttons[2]:
      callback(null, message.messageButtonType(content + "너만 없어.", "ㅋㅋㅋ", 'https://www.google.co.kr/search?q=%EB%82%98%EB%A7%8C+%EC%97%86%EC%96%B4+%EA%B3%A0%EC%96%91%EC%9D%B4&safe=off&tbm=isch&imgil=et6IC7bU5mOjYM%253A%253Bg83dwEjClcGCDM%253Bhttp%25253A%25252F%25252Fblog.naver.com%25252FPostView.nhn%25253FblogId%2525253Dhapmeab651%25252526logNo%2525253D220876346062&source=iu&pf=m&fir=et6IC7bU5mOjYM%253A%252Cg83dwEjClcGCDM%252C_&usg=__ljbP_MYOohl1tB9Y8ZTeHytKAKQ%3D&biw=1344&bih=751&dpr=1.25&ved=0ahUKEwi9jZ_fuZTUAhWMF5QKHQRkDLUQyjcINQ&ei=bbwrWf2iBoyv0ASEyLGoCw#imgrc=et6IC7bU5mOjYM:'));
    break;
    case message.buttons[3]: //개인정보 수집동의
      callback(null, message.messageButtonType(getPolicyAgreeFunction(), "네이버로이동", 'http://naver.com'));
    break;
    default:
      callback(null, message.baseType('올바른 입력값이 아닙니다.'));
      break;
  }
};

var getTestFunction = function(){
  let testResult;

  testResult = '자동응답 테스트 입니다.(방긋)\r\n';

  return testResult;
};

var getPolicyAgreeFunction = function(){
  let testResult;

  testResult = '서비스 제공을 위하여 개인 정보를 입력 받습니다.\r\n';
  testResult += '개인정보 수집 동의 내용을 확인하시고, 동의하시면 휴대폰 번호를 입력해주세요.\r\n\r\n';
  testResult += '(-없이 숫자만 입력 해 주세요.)';

  return testResult;
};

module.exports = Bot;
