const
  request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  //RedisDAO = require('../service/RedisDAO'),
  message = require('../service/message'),
  PolicyAgree = {};
const Database = require('../database');

PolicyAgree.policyAgreeKeyboard = (req, content, callback) => {
  console.log("PolicyAgree.policyAgreeKeyboard : "+ content);
  var regExp = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;

  switch (content) {
    case "00":
      callback(null, message.messageButtonTypePolicyAgree(getPolicyAgreeMsg2(), '약관 상세 보기(Link)', 'http://google.com'));
    break;
    case "동의":
      callback(null, message.messageButtonTypePolicyAgree(getPolicyAgreeMsg2(), '약관 상세 보기(Link)', 'http://google.com'));
    break;
    case "개인정보 수집에 동의합니다.":
      Database.UserKey.updateAllimYn(req, callback(null, message.messageButtonsType(getPolicyAgreeEndMsg())) );
      req.body.content = '메뉴';
      Database.UserKey.updateMeta(req, null);
      //callback(null, message.messageButtonsType(getPolicyAgreeEndMsg()));
    break;
    default:
      if(regExp.test(content) && (9 < content.length && content.length < 12)){
        Database.UserKey.updatePhoneNum(req, callback(null, message.baseTypePolicyAgree(getPolicyAgreeMsg1(), '약관 상세 보기(Link)', 'http://naver.com')) );
        //callback(null, message.baseTypePolicyAgree(getPolicyAgreeMsg1(), '약관 상세 보기(Link)', 'http://naver.com'));

      }else{
        callback(null, message.baseType('올바른 입력값이 아닙니다.'));
      }
      break;
  }
};


// 수신동의 시나리오 > 휴대폰 번호 정상 입력 후 출력 메시지
var getPolicyAgreeMsg1 = function(){
  let testResult;

  testResult = "(축하)이벤트 참여 절차 : \r\n";
  testResult += "    1.개인정보 입력(오케이)\r\n";
  testResult += "    2.서비스 약관 동의\r\n";
  testResult += "    3.개인정보 수집 동의\r\n\r\n";
  testResult += '이벤트 참여를 위하여 휴대폰 번호 입력이 완료되었습니다.\r\n';
  testResult += '서비스 이용 약관을 확인하시고 약관에 동의하시면 채팅창에 00번 또는 동의 라고 입력해주세요.\r\n\r\n';
  testResult += '00.동의';

  return testResult;
};

// 수신동의 시나리오 > 휴대폰 번호 정상 입력 > 서비스 약관 동의 후 출력 메시지
var getPolicyAgreeMsg2 = function(){
  let testResult;

  testResult = "(축하)이벤트 참여 절차 : \r\n";
  testResult += "    1.개인정보 입력(오케이)\r\n";
  testResult += "    2.서비스 약관 동의(오케이)\r\n";
  testResult += "    3.개인정보 수집 동의\r\n\r\n";
  testResult += '서비스 약관 동의가 완료되었습니다.(뿌듯)\r\n';
  testResult += '개인정보 수집 이용 약관을 확인하시고 약관에 동의하시면 동의 버튼을 눌러주세요.\r\n';

  return testResult;
};

// 수신동의 시나리오 > 휴대폰 번호 정상 입력 > 서비스 약관 동의 > 최종 출력 메시지
var getPolicyAgreeEndMsg = function(){
  let testResult;

  testResult = "(축하)이벤트 참여 절차 : \r\n";
  testResult += "    1.개인정보 입력(오케이)\r\n";
  testResult += "    2.서비스 약관 동의(오케이)\r\n";
  testResult += "    3.개인정보 수집 동의(오케이)\r\n\r\n";
  testResult += "이벤트 참여가 완료되었습니다. 감사합니다.(꺄아)\r\n\r\n";
  testResult += "당첨 결과 발표일 : 2017-06-30\r\n\r\n";
  testResult += "초기 화면으로 돌아갑니다.";

  return testResult;
};
module.exports = PolicyAgree;
