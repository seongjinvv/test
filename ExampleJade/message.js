const msg_allim = {
  navi_moveToMain: '초기 화면으로 이동은 "메뉴"를 입력해주세요.\r\n\r\n ',
  navi_event_header: "(축하)이벤트 참여 절차 : \r\n",
  navi_event_level_1: "    1.개인정보 입력",
  navi_event_level_2: "    2.서비스 약관 동의",
  navi_event_level_3: "    3.개인정보 수집 동의",
  event_body_1: "(선물)이벤트 참여를 위하여 휴대폰 번호를 입력해주세요.(굿)\r\n(입력 예 : 01012345678)\r\n",
  event_body_2: "이벤트 참여를 위하여 휴대폰 번호 입력이 완료되었습니다.\r\n 서비스 이용 약관을 확인하시고 약관에 동의하시면 채팅창에 00번 또는 동의 라고 입력해주세요.\r\n\r\n",
  event_body_3: "서비스 약관 동의가 완료되었습니다.(뿌듯)\r\n 개인정보 수집 이용 약관을 확인하시고 약관에 동의하시면 동의 버튼을 눌러주세요.\r\n",
  event_body_4: "이벤트 참여가 완료되었습니다. 감사합니다.(꺄아)\r\n\r\n당첨 결과 발표일 : 2017-06-30\r\n\r\n",
}
const msg_research = {
  event_header: "(해)[이벤트]고객 설문 조사(해)",
  event_content1: "즐겨 드시는 음료에 투표하고 기프티콘 받아가세요!!",
  event_content2: "아래 설문조사 참여하기 버튼을 누르시고 이벤트 페이지로 이동 후 참여 가능 합니다.",
  url_photo: "http://scontent-ams3-1.cdninstagram.com/t51.2885-15/e35/18646334_1535559666496847_352078814513201152_n.jpg?ig_cache_key=MTUyMzAyODIxNjEzMzEwODg2Ng%3D%3D.2&se=7",
  button_label: "설문조사 참여하기",
  url_button: "http://naver.com"
}
const msg_common = {
  enter: "\r\n",
  double_enter: "\r\n\r\n",
  error: "올바른 입력값이 아닙니다.",
  serviceReady: "준비 중입니다. (부끄)\r\n초기 화면으로 돌아갑니다.",
  moveToMain: "초기 화면으로 돌아갑니다.",
  navi_moveToMain: '초기 화면으로 이동은 "메뉴"를 입력해주세요.\r\n\r\n ',
  guide_text:{
    agree: "00.동의",
    back: "01.뒤로"
  }
}
const emoticons = {
  okay: "(오케이)",
  good: "(굿)"
}

module.exports.getMsgAllim = function(before_content, level){
  var msg = "";
  if("알림톡 수신동의하고 선물받기" == before_content){
    if("1" == level){
      msg += msg_allim.navi_moveToMain;
      msg += msg_allim.navi_event_header;
      msg += msg_allim.navi_event_level_1 + msg_common.enter;
      msg += msg_allim.navi_event_level_2 + msg_common.enter;
      msg += msg_allim.navi_event_level_3 + msg_common.double_enter;
      msg += msg_allim.event_body_1;
    }else if("2" == level){ // 수신동의 시나리오 > 휴대폰 번호 정상 입력 후 출력 메시지
      msg += msg_allim.navi_event_header;
      msg += msg_allim.navi_event_level_1 + emoticons.okay + msg_common.enter;
      msg += msg_allim.navi_event_level_2 + msg_common.enter;
      msg += msg_allim.navi_event_level_3 + msg_common.double_enter;
      msg += msg_allim.event_body_2;
      msg += msg_common.guide_text.agree;
    }else if("3" == level){ // 수신동의 시나리오 > 휴대폰 번호 정상 입력 > 서비스 약관 동의 후 출력 메시지
      msg += msg_allim.navi_event_header;
      msg += msg_allim.navi_event_level_1 + emoticons.okay + msg_common.enter;
      msg += msg_allim.navi_event_level_2 + emoticons.okay + msg_common.enter;
      msg += msg_allim.navi_event_level_3 + msg_common.double_enter;
      msg += msg_allim.event_body_3;
    }else if("4" == level){ // 수신동의 시나리오 > 휴대폰 번호 정상 입력 > 서비스 약관 동의 > 최종 출력 메시지
      msg += msg_allim.navi_event_header;
      msg += msg_allim.navi_event_level_1 + emoticons.okay + msg_common.enter;
      msg += msg_allim.navi_event_level_2 + emoticons.okay + msg_common.enter;
      msg += msg_allim.navi_event_level_3 + emoticons.okay + msg_common.double_enter;
      msg += msg_allim.event_body_4;
      msg += msg_common.moveToMain;
    }
  }else{
    msg += msg_common.error;
  }
  return msg;
}
module.exports.getMsgResearch = function(before_content, level){
  var msg = "";
  if("고객 설문조사" == before_content){
    if("1" == level){
      msg += msg_research.event_header + msg_common.double_enter;
      msg += msg_research.event_content1 + msg_common.enter;
      msg += msg_research.event_content2;
    }
  }
  return msg;
}
module.exports.getUrlPhotoResearch = function(){
  return msg_research.url_photo;
}
module.exports.getButtonLabelResearch = function(){
  return msg_research.button_label;
}
module.exports.getUrlButtonResearch = function(){
  return msg_research.url_button;
}
