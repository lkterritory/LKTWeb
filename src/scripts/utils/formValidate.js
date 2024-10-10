/*
 * 언어
 */
const i18n = require("@/lang").default;
const regularList = {
  iphone: {
    rule: /^1[3456789]\d{9}$/,
    msg() {
      return i18n.global.t("validate.enterCorrectPhone");
    }
  },
  password: {
    rule: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
    msg() {
      return i18n.global.t("validate.correctPassword");
    }
  },
  idCard: {
    rule: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
    msg() {
      return i18n.global.t("validate.enterCorrectId");
    }
  },
  email: {
    rule: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    msg() {
      return i18n.global.t("validate.enterCorrectEmail");
    }
  },
  plateNumber: {
    rule: /^[A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9]{1}$/,
    msg() {
      return i18n.global.t("validate.enterCorrectCarNo");
    }
  },
  enCode: {
    // 코드검사
    rule: /^[a-zA-Z0-9]([a-zA-Z0-9]+|\.)*[a-zA-Z0-9]$/,
    msg() {
      return i18n.global.t("validate.codeVerify");
    }
  },
  userAccount: {
    // 직위 코드
    rule: /^[A-Za-z0-9]+$/,
    msg() {
      return i18n.global.t("validate.onlyInputNumEnglish");
    }
  },
  fullName: {
    // 이름
    rule: /^[\u4e00-\u9fa50-9A-Za-z\uac00-\ud7ff]*$/,
    msg() {
      return i18n.global.t("sysData.msg.nameSpeSym");
    }
  },
  userCode: {
    // 숫자 코드
    rule: /^([0-9]+)$/,
    msg() {
      return i18n.global.t("sysData.msg.codeOnlyNum");
    }
  },
  allDate: {
    //휴가 시간이 0.5의 배수인지 아닌지를 판단하기
    rule: /^[1-9]\d*\.[5]$|0\.[5]$|\.[0]$|^[1-9]\d*$/,
    msg() {
      return i18n.global.t("sysData.msg.timeVerify");
    }
  },
  bigInt: {
    // 양의 정수 (0 제외)
    rule: /^[1-9]*[1-9][0-9]*$/,
    msg() {
      return i18n.global.t("sysData.msg.enterPositiveInteger");
    }
  }
};
/*
 * 내장 규칙
 * @param {String} type - {pattern} 의 미리 정규 이름 정의됨 or 사용자 지정 정규
 * @param {String} msg - 정규 검증이 프롬프트를 통과하지 못함
 * 방법
 * 1、{ validator: this.formValidate('fullName', '아이디는 알파벳, 숫자, 밑줄 그리고 짧은 가로줄로 구성됩니다'), trigger: 'blur' }
 * 2、{ validator: this.formValidate('/^([w-]+|[u4e00-u9fa5]+)$/', '아이디는 알파벳, 숫자, 밑줄 그리고 짧은 가로줄로 구성됩니다'), trigger: 'blur' }
 */

const formValidate = (type, msg) => {
  return (rule, value, callback) => {
    let reg =
      regularList[type] && regularList[type].rule
        ? regularList[type].rule
        : type;
    msg = msg
      ? msg
      : regularList[type] && regularList[type].msg
      ? regularList[type].msg
      : "";
    if (!reg.test(value)) {
      callback(new Error(msg));
    } else {
      callback();
    }
  };
};

export default formValidate;
