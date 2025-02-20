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
let searchTimeout; 
let locationPattern = /^(10[1-9]|11[0-6])0[0-3][0-9]|10[1-6]040|11[0-6]040$/;

function onCreate() {
  $(idPrefix + ".title span").text("PDA01");

  // 박스 코드 필드 설정
  boxCodeInstance = $(idPrefix + "#txtBoxBarcode")
    .dxTextBox({
      placeholder: "박스코드 스캔",
      value: "",
      width: "100%",
      onInitialized: (e) => setTimeout(() => e.component.focus(), 100),
      onContentReady: (e) => e.component.element().find("input").attr("inputmode", "none"),
      onValueChanged: (e) => handleBoxCodeChange(e),
      onEnterKey: (e) => handleBoxCodeEnter(),
    })
    .dxTextBox("instance");

  // 로케이션 코드 필드 설정
  locationCodeInstance = $(idPrefix + "#txtLocBarcode")
    .dxTextBox({
      placeholder: "로케이션 코드 스캔",
      value: "",
      width: "100%",
      onValueChanged: (e) => handleLocationCodeChange(e),
      onContentReady: (e) => e.component.element().find("input").attr("inputmode", "none"),
      onEnterKey: (e) => handleLocationCodeEnter(),
    })
    .dxTextBox("instance");

  // 메시지 출력 텍스트박스 설정
  textBoxInstance = $(idPrefix + "#message")
    .dxTextBox({
      value: "",
      width: "100%",
      readOnly: true,
    })
    .dxTextBox("instance");

  // div 클릭 시 input으로 포커스 이동
  makeDivFocusable(idPrefix + "#txtBoxBarcode");
  makeDivFocusable(idPrefix + "#txtLocBarcode");

  // 모든 다른 요소들에서 포커스 방지
  preventFocusOnOtherElements()
}

// div 클릭 시 내부 input으로 포커스 이동
function makeDivFocusable(divSelector) {
  $(divSelector).on("click", function() {
    const inputElement = $(this).find("input");
    if (inputElement.length) {
      inputElement.focus();  // div를 클릭하면 내부 input으로 포커스 이동
    }
  });
}

// 박스 코드 변경 시 처리
function handleBoxCodeChange(e) {
  let inputValue = e.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); 
  e.component.option("value", inputValue); 
  boxCode = inputValue;
}

// 박스 코드 엔터키 입력 시 처리
function handleBoxCodeEnter() {
  if (/^H\d{4}$/.test(boxCode)) { // H0001 ~ H9999 패턴
    locationCodeInstance.focus();
  } else if(locationPattern.test(boxCode)) { // 정규식에 맞는 경우
    locCode = boxCode;
    locationCodeInstance.option("value", locCode);
    boxCodeInstance.option("value", "");
  } else { // 두 가지 조건에 모두 맞지 않으면 메시지 출력
    textBoxInstance.option("value", "코드를 확인해주세요.");
    boxCodeInstance.option("value", "");
  }
  checkAndSearch();
}

// 로케이션 코드 변경 시 처리
function handleLocationCodeChange(e) {
  locCode = e.value;
}

// 로케이션 코드 엔터키 입력 시 처리
function handleLocationCodeEnter() {
  if (locationPattern.test(locCode)) { // 정규식에 맞는 경우
    locationCodeInstance.option("value", locCode);
    boxCodeInstance.focus();
  } else if (/^H\d{4}$/.test(locCode)) { // H0001 ~ H9999 패턴
    boxCodeInstance.option("value", locCode); 
    locationCodeInstance.option("value", "");
  } else { // 두 가지 조건에 모두 맞지 않으면 메시지 출력
    textBoxInstance.option("value", "코드를 확인해주세요");
    locationCodeInstance.option("value", "");
  }
  checkAndSearch();
}

// 박스 코드와 로케이션 코드 값이 있을 때 searchList 실행
function checkAndSearch() {
  if (boxCode && locCode) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchList();
    }, 500);
  }
}

// 박스 코드와 로케이션 코드 외의 다른 곳으로 포커스 이동 방지
function preventFocusOnOtherElements() {
  let isBoxFocused = false;
  let isLocationFocused = false;

  boxCodeInstance.on("focusin", function() {
    isBoxFocused = true;
  });

  locationCodeInstance.on("focusin", function() {
    isLocationFocused = true;
  });

  // 다른 곳을 클릭했을 때, 포커스가 이동하지 않도록 방지
  $(document).on('mousedown', function(e) {
    if (!(isBoxFocused || isLocationFocused)) {
      e.preventDefault();
    }
  });

  // 포커스가 바뀌면 포커스 상태 초기화
  $(document).on('focusin', function(e) {
    if ($(e.target).is(boxCodeInstance.element())) {
      isBoxFocused = true;
      isLocationFocused = false; // 로케이션 코드 포커스 해제
    } else if ($(e.target).is(locationCodeInstance.element())) {
      isLocationFocused = true;
      isBoxFocused = false; // 박스 코드 포커스 해제
    } else {
      isBoxFocused = false;
      isLocationFocused = false;
    }
  });
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
