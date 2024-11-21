let apiWcs;
let apiCommon;
let lktUtil;

let lktMqtt;

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

const idPrefix = "#field-fieldKiosk-fieldKiosk ";

let txtBoxSearch;
let workOrderGrid;

let resEquipmentCode;

let eqpCodeSel = ""; /// 선택된 설비
// mqtt_topic_sub: "lktomli/DAS-1", // 구독
//   mqtt_topic_pub: "lktomli", // 발행

function onCreate() {
  // lktMqtt.mqtt_topic_sub = "";

  eqpCodeSel = localStorage.getItem("eqpCodeSel");

  if (!eqpCodeSel) {
    eqpCodeSel = "";
  } else {
    // mq연결
    lktMqtt.mqtt_topic_pub = "lktomli";
    lktMqtt.mqtt_topic_sub = "lktomli/" + eqpCodeSel;
    lktMqtt.fncStartMqtt(onMessage);
  }

  $(".title span").text(eqpCodeSel);

  // 버튼 이벤트 처리
  $(idPrefix + "#btnSetting").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      // showPopup(false, null);
      searchConditionsCode();
    },
    width: "100px"
  });

  txtBoxSearch = $(idPrefix + "#txtBoxBarcode")
    .dxTextBox({
      placeholder: "바코드",
      value: "",
      width: "200px",
      onValueChanged: function (e) {
        //console.log("입력된 값:", e.value);
      },
      onEnterKey: function (e) {
        if (e.event.key === "Enter") {
          //alert(e.component.option("value"));

          let reqPayload = {
            lktHeader: lktUtil.getLktHeader("OUTBOUND.OJBECT.SCAN.PUT"),
            lktBody: [
              {
                storageTemperatureCode: "",
                equipmentCode: eqpCodeSel,
                equipmentLine: eqpCodeSel,
                equipmentZone: eqpCodeSel,
                skuCode: e.component.option("value")
              }
            ]
          };

          lktMqtt.fncMqttDoSend(JSON.stringify(reqPayload));

          $(idPrefix + "#txtBoxBarcode").select();
        }
      }
    })
    .dxTextBox("instance");

  // Progress Bar 설정
  $(idPrefix + "#progressBar").dxProgressBar({
    value: 0,
    min: 0,
    max: 100,
    showStatus: true,
    statusFormat: function (value) {
      return `${value * 100}%`;
    },
    onContentReady: function (e) {
      const $element = e.element.find(".dx-progressbar-status");
      $element.css({
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -60%)",
        color: "#ffffff", // 텍스트 색상
        fontSize: "20px"
        // fontWeight: "bold"
      });
    }
  });

  let headerCss = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center"
  };

  // DevExtreme DataGrid 설정
  workOrderGrid = $(idPrefix + "#workOrderGrid")
    .dxDataGrid({
      dataSource: [
        // {
        //   lktSequnce: 1,
        //   skuCode: "1242835001240008",
        //   skuName: "women skirt",
        //   skuBarcode: "0212713015164008",
        //   objectCount: 2,
        //   planQty: 15,
        //   pickQty: 0,
        //   remainingQty: 15,
        //   statusCode: "04",
        //   statusName: "0",
        //   planDtm: null,
        //   pickDtm: null
        // }
      ],
      columns: [
        {
          dataField: "lktSequnce",
          caption: "순서",
          width: 70,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("순서"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "skuCode",
          caption: "상품코드",
          width: 200,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상품코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "skuName",
          caption: "상품명",

          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상품명"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "skuBarcode",
          caption: "바코드",
          width: 200,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("바코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "objectCount",
          caption: "주문수",
          width: 80,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("주문수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "planQty",
          caption: "예상수",
          width: 80,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("예상수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "pickQty",
          caption: "확정수",
          width: 80,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("확정수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "remainingQty",
          caption: "미처리",
          width: 80,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("미처리"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "statusName",
          caption: "상태",
          width: 100,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상태"); // 헤더 가운데 정렬
          }
        }
      ],
      showBorders: true,
      scrolling: {
        mode: "standard" // or "virtual" | "infinite"
      },
      selection: {
        mode: "single"
      },
      columnAutoWidth: true,
      allowColumnResizing: true, // 컬럼 사이즈 조절 여부
      headerFilter: {
        visible: true // 헤더 필터 드롭다운을 표시
      }
    })
    .dxDataGrid("instance");

  searchList();
  searchList2();

  if (eqpCodeSel == "") searchConditionsCode("EQUIPMENT_TYPE");
  else {
    // searchList();
    // searchList2();
  }
  // searchConditionsCode("EQUIPMENT_CODE");
  //equipmentCode;

  setInterval(() => {
    searchList();
    searchList2();
  }, 10000);
}

function onActive() {}

function initView() {
  // 주문 값 설정
  document.querySelector(".summary-item:nth-child(1) .current").textContent =
    "";
  document.querySelector(".summary-item:nth-child(1) .total").textContent = "";

  // 품목 값 설정
  document.querySelector(".summary-item:nth-child(2) .current").textContent =
    "";
  document.querySelector(".summary-item:nth-child(2) .total").textContent = "";

  // PCS 값 설정
  document.querySelector(".summary-item:nth-child(3) .current").textContent =
    "";
  document.querySelector(".summary-item:nth-child(3) .total").textContent = "";

  workOrderGrid.option("dataSource", []);
}

function searchList() {
  initView();

  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.outbound.WCS.MIDDLE.CATEGORIES"),
    lktBody: [
      {
        equipmentCode: eqpCodeSel
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .equipmentPicktolightStatus(encoded)
    .done(function (response) {
      try {
        let resBody = response.lktBody[0];

        // "processObjectCount": 25,
        //       "totalObjectCount": 0,
        //       "processSkuCount": 20,
        //       "totalSkuCount": 0,
        //       "processQuantity": 102,
        //       "totalQuantity": 0

        // 주문 값 설정
        document.querySelector(
          ".summary-item:nth-child(1) .current"
        ).textContent = resBody.processObjectCount; // 현재값
        document.querySelector(
          ".summary-item:nth-child(1) .total"
        ).textContent = resBody.totalObjectCount; // 총합값

        // 품목 값 설정
        document.querySelector(
          ".summary-item:nth-child(2) .current"
        ).textContent = resBody.processSkuCount; // 현재값
        document.querySelector(
          ".summary-item:nth-child(2) .total"
        ).textContent = resBody.totalSkuCount; // 총합값

        // PCS 값 설정
        document.querySelector(
          ".summary-item:nth-child(3) .current"
        ).textContent = resBody.processQuantity; // 현재값
        document.querySelector(
          ".summary-item:nth-child(3) .total"
        ).textContent = resBody.totalQuantity; // 총합값

        $(idPrefix + "#progressBar").dxProgressBar({
          value: resBody.processSkuCount,
          min: 0,
          max: resBody.totalSkuCount,
          showStatus: true,
          statusFormat: function (value) {
            return `${value * 100}%`;
          },
          onContentReady: function (e) {
            const $element = e.element.find(".dx-progressbar-status");
            $element.css({
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -60%)",
              color: "#ffffff", // 텍스트 색상
              fontSize: "20px"
              // fontWeight: "bold"
            });
          }
        });
      } catch (ex) {}
    })

    .fail(function () {});
}

function searchList2() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.outbound.WCS.MIDDLE.CATEGORIES"),
    lktBody: [
      {
        equipmentCode: eqpCodeSel
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .equipmentPicktolightInput(encoded)
    .done(function (response) {
      try {
        workOrderGrid.option("dataSource", response.lktBody);
      } catch (ex) {}
    })

    .fail(function () {});
}

// EQUIPMENT_TYPE, STORAGE_TEMPERATURE, USE_STATE_CODE
function searchConditionsCode(aMasterCode) {
  // var obj = {
  //   lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
  //   lktBody: [{masterCode: aMasterCode}]
  // };
  // var encoded = btoa(JSON.stringify(obj));
  // apiCommon
  //   .code(encoded)
  //   .done(function (response) {})
  //   .fail(function () {
  //     alert("error");
  //   });

  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [{}]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .dashboardsOverallStatus(encoded)
    .done(function (response) {
      try {
        resEquipmentCode = response.lktBody;

        showPopup(false, null);
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리
      //errorPopup.removeClass("hidden");
    });
}

function showPopup(isModi, row) {
  let itemsTmp = [];
  for (let i = 0; i < resEquipmentCode.length; i++) {
    itemsTmp.push({
      id: resEquipmentCode[i].equipmentCode,
      name: resEquipmentCode[i].equipmentCode
    });
  }

  let formItems = [
    {
      dataField: "equipmentCode",
      label: {text: "설비"},
      editorType: "dxSelectBox",
      editorOptions: {
        items: itemsTmp,
        displayExpr: "name",
        valueExpr: "id",
        value: eqpCodeSel ? eqpCodeSel : "",
        placeholder: "선택하세요",
        onValueChanged: function (e) {
          //alert(e.value);
          console.log("선택된 값:", e.value); // 선택된 id 값
        }
      }
    }
  ];

  // 팝업 호출
  lktUtil.createDynamicPopup({
    title: "설비선택",
    isModi: false, // 수정 여부
    formItems: formItems, // 폼 구성
    onExecute: function (formData) {
      eqpCodeSel = formData.equipmentCode;

      if (eqpCodeSel == "") return;

      // mq연결
      lktMqtt.mqtt_topic_pub = "lktomli";
      lktMqtt.mqtt_topic_sub = "lktomli/" + eqpCodeSel;
      lktMqtt.fncStartMqtt(onMessage);

      localStorage.setItem("eqpCodeSel", eqpCodeSel);

      $(".title span").text(eqpCodeSel);
      searchList();
      searchList2();
      $("#dynamicPopup").dxPopup("hide");
    },
    onCancel: function () {
      // 취소 버튼 클릭 이벤트 처리
      $("#dynamicPopup").dxPopup("hide");
    }
  });
}

////////////////////////////////////////////////////////////////////////////////
// mqtt test stuff

// // MQTT client
// var mqttClient = null;

// //MQTT info
// // 각자 상황에 맞는 host, port, topic 을 사용합니다.
// var mqtt_host = "127.0.0.1";
// var mqtt_port = "1883";
// var mqtt_clientId = "clientID-" + parseInt(Math.random() * 100); // 랜덤 클라이언트 ID
// var mqtt_topic = "testTopic";

// // MQTT 클라이언트 연결
// function fncStartMqtt() {
//   mqttClient = new Paho.MQTT.Client(
//     mqtt_host,
//     Number(mqtt_port),
//     mqtt_clientId
//   );

//   mqttClient.onConnectionLost = onConnectionLost;
//   mqttClient.onMessageArrived = onMessageArrived;

//   mqttClient.connect({
//     onSuccess: onConnect,
//     onFailure: onFailure
//   });
// }

// // 연결 성공 시 실행되는 function
// function onConnect() {
//   console.log("connet : onConnect..");

//   mqttClient.subscribe(mqtt_topic);
// }

// // 연결 실패 시 실행되는 function
// function onFailure() {
//   console.log("connet : onFailure..");
// }

// function onConnectionLost(responseObject) {
//   if (responseObject.errorCode !== 0) {
//     console.log("onConnectionLost : " + responseObject.errorMessage);

//     // 연결 재시도
//     fncConnMqtt();
//   }
// }

// // 메시지 받는 부분
// function onMessageArrived(message) {
//   console.log("onMessageArrived : " + message.payloadString);

//   // mqtt 받은 메시지
//   // 받은 메시지를 각 화면에서 사용하려면 각 화면에서 아래 function 선언하여 사용
//   fncMqttAction(message.payloadString);
// }

// // 메시지 보내기
// // 각 화면에서 메시지를 보내려면 각 화면에서 아래 function 선언하여 사용
// function fncMqttDoSend(sendMsg) {
//   console.log("mqtt send:" + sendMsg);
//   mqttClient.send(mqtt_topic, sendMsg);
// }

// mqtt test end
////////////////////////////////////////////////////////////////////////////////

function onMessage(message) {
  console.log("recv mqtt:" + message);

  searchList();
  searchList2();
}

export default {
  onCreate,
  onActive
};
