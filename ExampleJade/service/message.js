let message = {};

message.buttons = ['카카오톡 수신 동의 이벤트 참여하기', '고객 상담 서비스 만족도 평가', '고양이'];
message.buttonsPolicyAgree = ['개인정보 수집에 동의합니다.'];
message.buttonsResearch = ['테스트'];

message.buttonsType = () => { //최초 진입 시 keyboard 호출 return
  return {
    type: 'buttons',
    buttons: message.buttons
  }
};

message.baseType = (text) => {
  return {
    message: {
      text :text,
    },
    keyboard: {
      type: 'text',
      //buttons: message.buttons
    }
  }
};

message.photoType = (text, url_photo, label, url_button) => {
  return {
    message: {
      text: text,
      photo: {
        url: url_photo,
        width: 640,
        height:480
      },
      message_button: {
        label: label,
        url: url_button,
      }
    },
    keyboard: {
      type: 'buttons',
      buttons: message.buttons
    }
  }
};

message.messageButtonType = (text, label, url_button) => {
    return {
      message: {
        text: text,
        message_button: {
          label: label,
          url: url_button,
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: message.buttons
      }
    }
};

message.baseTypePolicyAgree = (text) => {
  return {
    message: {
      text :text,
    },
    keyboard: {
      type: 'text',
      //buttons: message.buttons
    }
  }
};

message.baseTypePolicyAgree = (text, label, url_button) => {
    return {
      message: {
        text: text,
        message_button: {
          label: label,
          url: url_button,
        }
      },
      keyboard: {
        type: 'text',
        //buttons: message.buttons
      }
    }
};
message.messageButtonTypePolicyAgree = (text, label, url_button) => {
    return {
      message: {
        text: text,
        message_button: {
          label: label,
          url: url_button,
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: message.buttonsPolicyAgree
      }
    }
};

message.messageButtonsType = (text) => { //최초 진입 시 keyboard 호출 return
  return {
    message: {
      text: text
    },
    keyboard: {
      type: 'buttons',
      buttons: message.buttons
    }
  }
};

module.exports = message;
