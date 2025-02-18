let apiWcs;
let apiCommon;
let lktUtil;

let lktMqtt;

let intervalList = null;
let intervalPrintMq = null;


// import zebra from "../../../scripts/utils/printer/zebra/index.js?a=1";

// import zebra from "../../../src /utils/printer/zebra";

if (
  !window.apiWcsModule ||
  !window.apiCommonModule ||
  !window.lktUtilModule ||
  !window.lktMqttModule
) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.apiCommonModule = import(
    `../../../js/api/apiCommon.js?t=${Date.now()}`
  );
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
  window.lktMqttModule = import(`../../../js/util/lktMqtt.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
apiCommon = (await window.apiCommonModule).default;
lktUtil = (await window.lktUtilModule).default;
lktMqtt = (await window.lktMqttModule).default;

const idPrefix = "#avg-sorterBoxMapping-sorterBoxMapping ";

let boxCode;
let locCode;
let codeMessage;
let textBoxInstance 
let locationCodeInstance 
let boxCodeInstance
function onCreate() {
  

  $(idPrefix + ".title span").text("PDA01");


  boxCodeInstance = $(idPrefix + "#txtBoxBarcode")
  .dxTextBox({
    placeholder: "박스코드 스캔",
    value: "",
    width: "400px",
    onInitialized: function(e) {
      setTimeout(() => e.component.focus(), 100);
    },
    onValueChanged: function(e) {
      let inputValue = e.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); // 영문 대문자와 숫자만
      e.component.option("value", inputValue); // 필터링된 값으로 업데이트
      boxCode = inputValue; 
    },
    onEnterKey: function(e) {
      if (/^H\d{4}$/.test(boxCode)) { // h0001 ~ h9999 형태의 값인지 확인
        $(idPrefix + "#txtLocBarcode").dxTextBox("instance").focus();
      } else {
        locCode = boxCode
       
        $(idPrefix + "#txtLocBarcode").dxTextBox("instance").option("value", locCode);
        $(idPrefix + "#txtBoxBarcode").dxTextBox("instance").option("value", "");
        
      }
    }
  })
  .dxTextBox("instance");

  locationCodeInstance = $(idPrefix + "#txtLocBarcode")
  .dxTextBox({
    placeholder: "로케이션 코드 스캔",
    value: "",
    width: "400px",
    onValueChanged: function(e) {
      locCode = e.value;
    },
    onEnterKey: function(e) {
      // 로케이션 코드 엔터 입력 시 추가 동작 필요하면 여기에 작성
      searchList();
     
    }
  })
  .dxTextBox("instance");

   textBoxInstance = $(idPrefix + "#message")
    .dxTextBox({
        value: "",
        width: "300px",
        readOnly: true // 읽기 전용 설정
    })
    .dxTextBox("instance");


}


function onActive() {}


function searchList() {
  //  initView();
  var obj = {
    lktHeader: lktUtil.getLktHeader("PATCH.OUTBOUND.EQUIPMENT.AUTOMATIC.GUIDED.VEHICLE.ORDERS.BOXS.MAPPING"),
    lktBody: [
      {
        locationCode: locCode,
        lktToteCode: boxCode
      }
    ]
  };
  apiWcs
    .mappingPdaOrdersBox(JSON.stringify(obj))
    .done(function (response) {
      try {       
        console.log(response.lktHeader)
        console.log(boxCode, locCode)
        
        // 초기값을 빈 문자열로 설정
        textBoxInstance.option("value", "");
        
        codeMessage = response.lktHeader.message ?? "null";
        
        textBoxInstance.option("value", codeMessage);
        boxCodeInstance.option("value","");
        locationCodeInstance.option("value","");
        setTimeout(() => boxCodeInstance.focus(), 100);
      } catch (ex) { }
    })

    .fail(function () {
     
    });
}



function onDestroy() {
  // alert("dest");

  if (intervalList) {
    clearInterval(intervalList);
    intervalList = null;
  }

  if (intervalPrintMq) {
    clearInterval(intervalPrintMq);
    intervalPrintMq = null;
  }
}

export default {
  onCreate,
  onActive,
  onDestroy
};
