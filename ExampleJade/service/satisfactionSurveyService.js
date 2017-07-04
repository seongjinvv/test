const
  request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  message = require('../service/message');
const Database = require('../database');
const Msg = require('../message');
module.exports.checkSurvey = function(req, callback){
    Database.UserKey.updateMeta(req, callback(null, message.baseType(Msg.getMsgSurvey())) );
};

module.exports.surveyKeyboard = (req, content, callback) => {
  console.log("satisfactionSurveyService.surveyKeyboard : ", content);
  switch (content){
    case "1": // 매우 만족
      callback(null, message.messageButtonsType(Msg.getMsgSurveyResult("매우 만족")) );
    break;
    case "2": // 보통 만족
      callback(null, message.messageButtonsType(Msg.getMsgSurveyResult("보통 만족")) );
    break;
    case "3": // 불만족
      callback(null, message.messageButtonsType(Msg.getMsgSurveyResult("불만족")) );
    break;
    default:
      callback(null, message.baseType(Msg.getErrorMsg()) );
    break;
  }
}
