import store from "@/store";
import dayjs from "dayjs";
import context from "@/main";
import define from "@/utils/define";
const STORAGEPREFIX = "wcs_";
const STORAGETYPE = window.localStorage;
import * as xlsx from "xlsx";

function mappingMenu(data) {
  let menuData = {};
  menuData.enCode = data.menuCode;
  menuData.type = data.child ? 1 : 2;
  menuData.hasChildren = data.child ? true : false;
  // menuData.path = data.??;
  menuData.urlAddress = data.menuUrl;
  menuData.icon = data.menuIcon;
  menuData.fullName = data.menuName;
  menuData.id = data.menuCode;

  return menuData;
  //
  // enCode: "mast",
  // vueName: "", ---
  // type: 1, --- has "child"
  // path: "", --- menuUrl , 라우팅 시 부모 path는 enCode
  // urlAddress: "",  menuUrl
  // icon: "iconimport.png",  --- menuIcon
  // fullName: "기준정보",  --- menuName
  // id: "01",   --- enCode
  // hasChildren: true,  --- is child
  // children   --- child
}

const common = {
  toDateText(dateTimeStamp) {
    let result = "";
    let minute = 1000 * 60; //분, 시, 천, 주, 반달, 한 달을 밀리초로 표시한다.
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let halfamonth = day * 15;
    let month = day * 30;
    let now = new Date().getTime(); //현재 시간 밀리초 가져오기
    let diffValue = now - dateTimeStamp; // 시간차
    if (diffValue < 0) return "방금";
    let minC = diffValue / minute; //시간차를 계산하는 시, 일, 주, 월
    let hourC = diffValue / hour;
    let dayC = diffValue / day;
    let weekC = diffValue / week;
    let monthC = diffValue / month;
    if (monthC >= 1 && monthC <= 3) {
      result = " " + parseInt(monthC) + "월전";
    } else if (weekC >= 1 && weekC <= 3) {
      result = " " + parseInt(weekC) + "주전";
    } else if (dayC >= 1 && dayC <= 6) {
      result = " " + parseInt(dayC) + "일전";
    } else if (hourC >= 1 && hourC <= 23) {
      result = " " + parseInt(hourC) + "시간전";
    } else if (minC >= 1 && minC <= 59) {
      result = " " + parseInt(minC) + "분전";
    } else if (diffValue >= 0 && diffValue <= minute) {
      result = "방금";
    } else {
      let datetime = new Date();
      datetime.setTime(dateTimeStamp);
      let Nyear = datetime.getFullYear();
      let Nmonth =
        datetime.getMonth() + 1 < 10
          ? "0" + (datetime.getMonth() + 1)
          : datetime.getMonth() + 1;
      let Ndate =
        datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      let Nhour =
        datetime.getHours() < 10
          ? "0" + datetime.getHours()
          : datetime.getHours();
      let Nminute =
        datetime.getMinutes() < 10
          ? "0" + datetime.getMinutes()
          : datetime.getMinutes();
      let Nsecond =
        datetime.getSeconds() < 10
          ? "0" + datetime.getSeconds()
          : datetime.getSeconds();
      result = Nyear + "-" + Nmonth + "-" + Ndate;
    }
    return result;
  },
  getDate(format, strInterval, number) {
    var myDate = new Date();
    var dtTmp = new Date();
    if (!!strInterval) {
      switch (strInterval) {
        case "s":
          myDate = new Date(Date.parse(dtTmp) + 1000 * number); // 초
          break;
        case "n":
          myDate = new Date(Date.parse(dtTmp) + 60000 * number); // 분
          break;
        case "h":
          myDate = new Date(Date.parse(dtTmp) + 3600000 * number); // 시간
          break;
        case "d":
          myDate = new Date(Date.parse(dtTmp) + 86400000 * number); // 1000일
          break;
        case "w":
          myDate = new Date(Date.parse(dtTmp) + 86400000 * 7 * number); // 요일
          break;
        case "q":
          myDate = new Date(
            dtTmp.getFullYear(),
            dtTmp.getMonth() + number * 3,
            dtTmp.getDate(),
            dtTmp.getHours(),
            dtTmp.getMinutes(),
            dtTmp.getSeconds()
          ); // 분기
          break;
        case "m":
          myDate = new Date(
            dtTmp.getFullYear(),
            dtTmp.getMonth() + number,
            dtTmp.getDate(),
            dtTmp.getHours(),
            dtTmp.getMinutes(),
            dtTmp.getSeconds()
          ); // 월
          break;
        case "y":
          myDate = new Date(
            dtTmp.getFullYear() + number,
            dtTmp.getMonth(),
            dtTmp.getDate(),
            dtTmp.getHours(),
            dtTmp.getMinutes(),
            dtTmp.getSeconds()
          ); // 년
          break;
        default:
      }
    }
    return common.toDate(myDate, format);
  },
  toDate(v, format) {
    format = format ? format : "yyyy-MM-dd HH:mm";
    if (!v) return "";
    var d = v;
    if (typeof v === "string") {
      if (v.indexOf("/Date(") > -1)
        d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
      else
        d = new Date(
          Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0])
        );
    } else {
      d = new Date(v);
    }
    var o = {
      "M+": d.getMonth() + 1,
      "d+": d.getDate(),
      "h+": d.getHours(),
      "H+": d.getHours(),
      "m+": d.getMinutes(),
      "s+": d.getSeconds(),
      "q+": Math.floor((d.getMonth() + 3) / 3),
      S: d.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (d.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return format;
  },
  getThatDay(space) {
    if (space == undefined) {
      space = 0;
    }

    let date = new Date();
    date.setTime(date.getTime() + 86400000 * space);
    return this.assemblyDay({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate()
    });
  },
  assemblyDay(data) {
    let year = data.year.toString();
    data.month = Number(data.month + 1);
    let month = this.complement(data.month);
    let date = this.complement(data.date);
    return year + "-" + month + "-" + date;
  },
  complement(value, digit) {
    digit = digit ? digit : 2;
    value = Number(value);
    if (value < Math.pow(10, digit - 1)) {
      let text = "";
      for (let i = 0; i < digit - value.toString().length; i++) {
        text = text + "0";
      }
      return text + value;
    } else {
      return value.toString();
    }
  },
  toTreeViewJson(data, id, parentIdText, idText) {
    parentIdText = parentIdText ? parentIdText : "parentId";
    idText = idText ? idText : "id";
    id = id ? id : 0;
    let treeJson = [];
    let childNode = data.filter((v) => v[parentIdText] == id);
    if (childNode.length > 0) {
      for (let i = 0; i < childNode.length; i++) {
        let treeModel = {
          ...childNode[i],
          hasChildren: !!data.filter(
            (v) => v[parentIdText] == childNode[i][idText]
          ).length,
          ChildNodes: common.toTreeViewJson(
            data,
            childNode[i][idText],
            parentIdText,
            idText
          ),
          isexpand:
            childNode[i].isexpand == undefined ? true : childNode[i].isexpand,
          complete: true
        };
        treeJson.push(treeModel);
      }
    }
    return treeJson;
  },
  toFileSize(size) {
    if (size == null || size == "") {
      return "";
    }
    if (size < 1024.0) return common.toDecimal(size) + " 바이트";
    else if (size >= 1024.0 && size < 1048576)
      return common.toDecimal(size / 1024.0) + " KB";
    else if (size >= 1048576 && size < 1073741824)
      return common.toDecimal(size / 1024.0 / 1024.0) + " MB";
    else if (size >= 1073741824)
      return common.toDecimal(size / 1024.0 / 1024.0 / 1024.0) + " GB";
  },
  toDecimal(num) {
    if (num == null) {
      num = "0";
    }
    num = num.toString().replace(/\$|\,/g, "");
    if (isNaN(num)) num = "0";
    var sign = num == (num = Math.abs(num));
    num = Math.floor(num * 100 + 0.50000000001);
    var cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
      num =
        num.substring(0, num.length - (4 * i + 3)) +
        "" +
        num.substring(num.length - (4 * i + 3));
    return (sign ? "" : "-") + num + "." + cents;
  },
  getAuth() {
    return store.getters.token;
  },
  idGenerator() {
    let quotient = new Date() - new Date("2020-08-01");
    quotient += Math.ceil(Math.random() * 1000);
    const chars =
      "0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz";
    const charArr = chars.split("");
    const radix = chars.length;
    const res = [];
    do {
      let mod = quotient % radix;
      quotient = (quotient - mod) / radix;
      res.push(charArr[mod]);
    } while (quotient);
    return res.join("");
  },
  getScriptFunc(str) {
    let func = null;
    try {
      func = eval(str);
      return func;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  interfaceDataHandler(data) {
    if (!data.dataProcessing) return data.data;
    const dataHandler = this.getScriptFunc(data.dataProcessing);
    if (!dataHandler) return data.data;
    return dataHandler(data.data);
  },
  // dayjs 기반으로 날짜 포맷, 타임스탬프(밀리초) 날짜로 전환
  dateFormat(date, format) {
    format = format || "YYYY-MM-DD HH:mm";
    if (!date) return "";
    return dayjs(date).format(format);
  },
  // dayjs 기반으로 날짜 포맷,날짜를 타임스탬프(밀리초)로 전환
  timestamp(val) {
    return dayjs(val).valueOf();
  },
  // dayjs 기반으로 날짜 포맷, 테이블 전용
  tableDateFormat(row, column, cellValue) {
    let format = "YYYY-MM-DD HH:mm";
    if (!cellValue) return "";
    return dayjs(cellValue).format(format);
  },
  storageSet(obj) {
    for (let i in obj) {
      cacheItem(i, obj[i]);
    }

    function cacheItem(key, val) {
      key = STORAGEPREFIX + key;
      let valType = typeof val;
      if (val !== null) {
        var valConstructor = val.constructor;
      }
      if (
        valType === "string" ||
        valType === "number" ||
        valType === "boolean"
      ) {
        if (valConstructor === String) {
          val = val + "|String";
        } else if (valConstructor === Number) {
          val = val + "|Number";
        } else if (valConstructor === Boolean) {
          val = val + "|Boolean";
        }
        STORAGETYPE.setItem(key, val);
      } else if (valType === "object") {
        if (val === null) {
          val = JSON.stringify(val) + "|Null";
          STORAGETYPE.setItem(key, val);
        } else {
          if (valConstructor === Array) {
            val = JSON.stringify(val) + "|Array";
          } else if (valConstructor === Object) {
            val = JSON.stringify(val) + "|Object";
          }
          STORAGETYPE.setItem(key, val);
        }
      }
    }
  },
  storageGet(key) {
    key = STORAGEPREFIX + key;
    let keyName = STORAGETYPE.getItem(key);
    if (keyName === null) {
      return null;
    }
    let valArr = keyName.split("|");
    let getDataType = valArr[valArr.length - 1];
    valArr.splice(valArr.length - 1, 1);
    let val = valArr.join("");
    if (getDataType === "Number") {
      val = parseInt(val);
    } else if (getDataType === "Boolean") {
      if (val === "true") {
        val = true;
      } else {
        val = false;
      }
    } else if (
      getDataType === "Array" ||
      getDataType === "Object" ||
      getDataType === "Null"
    ) {
      val = JSON.parse(val);
    }
    return val;
  },
  storageRemove(key) {
    STORAGETYPE.removeItem(STORAGEPREFIX + key);
  },
  storageClear() {
    for (let i in STORAGETYPE) {
      if (i.indexOf(STORAGEPREFIX) !== -1) {
        STORAGETYPE.removeItem(i);
      }
    }
  },
  hasP(enCode) {
    const permissionList = store.getters && store.getters.permissionList;
    const modelId = context.$route.meta.modelId || "";
    if (!modelId) return false;
    const list = permissionList.filter((o) => o.modelId === modelId);
    if (!list.length) return false;
    const columnList = list[0] && list[0].column ? list[0].column : [];
    if (!columnList.length) return false;
    const hasPermission = columnList.some((column) => column.enCode === enCode);
    if (hasPermission) return true;
    return false;
  },
  hasFormP(enCode) {
    const permissionList = store.getters && store.getters.permissionList;
    const modelId = context.$route.meta.modelId || "";
    if (!modelId) return false;
    const list = permissionList.filter((o) => o.modelId === modelId);
    if (!list.length) return false;
    const formList = list[0] && list[0].form ? list[0].form : [];
    if (!formList.length) return false;
    const hasPermission = formList.some((form) => form.enCode === enCode);
    if (hasPermission) return true;
    return false;
  },
  hasBtnP(enCode) {
    const permissionList = store.getters && store.getters.permissionList;
    const modelId = context.$route.meta.modelId || "";
    if (!modelId) return false;
    const list = permissionList.filter((o) => o.modelId === modelId);
    if (!list.length) return false;
    const btnList = list[0] && list[0].button ? list[0].button : [];
    if (!btnList.length) return false;
    const hasPermission = btnList.some((btn) => btn.enCode === enCode);
    if (hasPermission) return true;
    return false;
  },
  isEmpty(data) {
    return data === null || data === undefined || data === "";
  },
  isEmptyArray(data) {
    return Array.isArray(data) ? data.length === 0 : true;
  },
  excelInstall: function ($Vue) {
    let Vue = $Vue.config.globalProperties;
    let common = {
      // excel 그리드 다운로드
      // data：다운로드 파마 ，name：그리드 명，cols： 컬럼 사이즈
      exportExcel(data, name, cols = []) {
        const userAccount = store.getters.userInfo.userAccount;
        const YYYYMMDD = dayjs().format("YYYYMMDD");
        const HHmmss = dayjs().format("HHmmss");
        const excelFile = `${name}_${YYYYMMDD}_${HHmmss}.xlsx`;

        let sheet = xlsx.utils.aoa_to_sheet(data);
        sheet["!cols"] = cols;
        this.downExcel(this.sheetBlob(sheet), excelFile);
      },

      downExcel(url, saveName) {
        if (typeof url === "object" && url instanceof Blob) {
          url = URL.createObjectURL(url); // blob url 생성
        }
        let aLink = document.createElement("a");
        aLink.href = url;
        aLink.download = saveName || ""; // HTML5 새 속성, 저장 파일명 지정, 접미사는 필요하지 않습니다. file:/// 모드에서는 적용되지 않습니다.
        let event;
        if (window.MouseEvent) event = new MouseEvent("click");
        else {
          event = document.createEvent("MouseEvents");
          event.initMouseEvent(
            "click",
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            0,
            false,
            false,
            false,
            false,
            0,
            null
          );
        }
        aLink.dispatchEvent(event);
      },

      // sheet를 최종 엑셀 파일의 Blob 객체로 변환한 후 URL.createObjectURL을 사용하여 다운로드
      sheetBlob(sheet, sheetName) {
        sheetName = sheetName || "sheet1";
        let workbook = {
          SheetNames: [sheetName],
          Sheets: {}
        };
        workbook.Sheets[sheetName] = sheet;
        // Excel설정 항목 구성
        let wopts = {
          bookType: "xlsx", // 생성할 파일 유형
          bookSST: false, // Shared String Table 생성 여부는 공식 설명에 따르면 생성 속도를 ON으로 하면 감소하지만 낮은 버전의 IOS 기기에서 호환성이 좋다.
          type: "binary"
        };
        let wbout = xlsx.write(workbook, wopts);
        let blob = new Blob([s2ab(wbout)], {
          type: "application/octet-stream"
        });
        // String을ArrayBuffer 변환
        function s2ab(s) {
          if (typeof ArrayBuffer !== "undefined") {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i)
              view[i] = s.charCodeAt(i) & 0xff;
            return buf;
          } else {
            var buf = new Array(s.length);
            for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
            return buf;
          }
        }
        return blob;
      },

      // 다운로드 엑셀의 title,label,값만 넘겨주면 엑셀변환해주는 함수.
      excelDownload(title, tableCols, data, configureGrid, context) {
        let aoa = [[title]];
        let labels = [];

        tableCols.forEach((eachCol) => {
          labels.push(context.$t(`${configureGrid[eachCol.label].label}`));
        });
        aoa.push(labels);

        data.forEach((row) => {
          let values = [];
          tableCols.forEach((eachCol) => {
            if (eachCol.floorApply) {
              values.push(Math.floor(row[eachCol.prop]));
            } else {
              values.push(row[eachCol.prop]);
            }
          });
          aoa.push(values);
        });

        let cols = [{wch: 10}];
        context.$common.exportExcel(aoa, `${title}`, cols);
      }
    };

    // 공통 메소드를 프로토타입에 복사
    Vue.$common = common;
  },
  // BASE64 Encode
  encodeBase64(str) {
    // return btoa(
    //   encodeURIComponent(str).replace(
    //     /%([0-9A-F]{2})/g,
    //     function toSolidBytes(match, p1) {
    //       return String.fromCharCode("0x" + p1);
    //     }
    //   )
    // );

    const query = typeof str === "object" ? JSON.stringify(str) : str;

    return btoa(unescape(encodeURIComponent(query)));
  },
  decodeBase64(encodedString) {
    try {
      const decodedString = atob(encodedString);
      return decodedString;
    } catch (error) {
      console.error("Error while decoding Base64:", error);
      return null;
    }
  },
  validation(data, valid) {
    // const data = {
    //   account: "oh",
    //   password: "",
    //   aa: [],
    //   bb: {},
    //   checked: "",
    //   notChecked: 0
    // };

    // console.log(valid);
    // Object.keys(valid).forEach((k, validIndex) => {
    //   if (!valid[k].length) {
    //     console.log("valid type error");
    //     return false;
    //   }

    //   if (data.hasOwnProperty(k)) {
    //     valid[k].forEach((d) => {
    //       const test = d(data[k]);
    //       console.log(test);
    //     });
    //   }
    // });

    const validKeys = Object.keys(valid);
    const validValues = Object.values(valid);
    let result = null;
    for (let i = 0; i < validKeys.length; i++) {
      const validkey = validKeys[i];
      const validValue = validValues[i];

      if (!validValue.length) {
        console.log("valid type error");
        return false;
      }

      if (data.hasOwnProperty(validkey)) {
        for (let vi = 0; vi < validValue.length; vi++) {
          if (typeof validValue[vi] !== "function") {
            // 펑션 외 valid 체크는 차후 개발 예정
            continue;
          }

          result = validValue[vi](data[validkey]);
          if (typeof result === "string") break;
        }
      }
      if (typeof result === "string") break;
    }
    return result;

    // Object.keys(data).forEach((k, i) => {
    //   console.log("k :" + k + " , v :" + data[k] + " , i :" + i);
    //   if (typeof data[k] === "string" || typeof data[k] === "number") {
    //     // list -- data[k].length && "object"
    //     // object --  "object" 미구현
    //   }
    // });
  },
  getConvertMenuData(data) {
    let menuList = [];
    data.forEach((d) => {
      let menuData = mappingMenu(d);

      if (d.child && d.child.length) {
        let childMenuList = [];
        d.child.forEach((child) => {
          let childMenuData = mappingMenu(child);
          childMenuList.push(childMenuData);
        });
        menuData.children = childMenuList;
      }
      menuList.push(menuData);
    });

    return menuList;
  },
  /**
   * 좌측문자열채우기
   * @params
   *  - str : 원 문자열
   *  - padLen : 최대 채우고자 하는 길이
   *  - padStr : 채우고자하는 문자(char)
   */
  lpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
      console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
      return str;
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen) str = padStr + str;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
  },
  /**
   * 우측문자열채우기
   * @params
   *  - str : 원 문자열
   *  - padLen : 최대 채우고자 하는 길이
   *  - padStr : 채우고자하는 문자(char)
   */
  rpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
      console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
      return str + "";
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen) str += padStr;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
  },
  dateToStr(value) {
    if (value) value = value.replaceAll("T", " ").split(".")[0];
    return value;
  },
  deepCopyObject(inObject) {
    var outObject, value, key;

    if (typeof inObject !== "object" || inObject === null) {
      return inObject;
    }

    outObject = Array.isArray(inObject) ? [] : {};

    for (key in inObject) {
      value = inObject[key];

      outObject[key] =
        typeof value === "object" && value !== null
          ? common.deepCopyObject(value)
          : value;
    }

    return outObject;
  }
};
export default common;
