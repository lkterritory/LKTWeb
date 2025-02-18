let apiWcs;
let apiCommon;
let lktUtil;

let lktMqtt;

let intervalList = null;
let intervalPrintMq = null;

import zebra from "../../../scripts/utils/printer/zebra/index.js?a=1";

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

let dvList = [];

const idPrefix = "#avg-sorterKiosk-sorterKiosk ";

let txtBoxSearch;
let workOrderGrid;

let resEquipmentCode;

let eqpCodeSel = ""; /// 선택된 설비
// mqtt_topic_sub: "lktomli/DAS-1", // 구독
//   mqtt_topic_pub: "lktomli", // 발행

let statusData;
let receivedData = [];
// window.onClickKioskPrint = function () {
//   zebra.setup();

//   $(".printstate").css({
//     color: "red", // 텍스트 색상
//     fontWeight: "bold" // 텍스트 굵게
//   });
// };

function onCreate() {
  //zebra.setup();

  $(idPrefix + "#networkPopup").remove(); // 팝업 끄기

  // eqpCodeSel = localStorage.getItem("eqpCodeSel");

  if (!eqpCodeSel) {
    eqpCodeSel = "";
  } else {
    // mq연결
    lktMqtt.mqtt_topic_pub = "lktomni";
    lktMqtt.mqtt_topic_sub = "lktomni/" + eqpCodeSel;
    lktMqtt.fncStartMqtt(null);
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
      onValueChanged: function (e) {
        //console.log("입력된 값:", e.value);
      },
      onEnterKey: function (e) {
        if (e.event.key === "Enter") {
          //console.log(e.component.option("value"));

          setTimeout(() => {
            searchList();
          }, 200);

          let reqPayload = {
            lktHeader: lktUtil.getLktHeader(
              "GET.OUTBOUND.EQUIPMENT.AUTOMATIC.GUIDED.VEHICLE.STATUS"
            ),
            lktBody: [
              {
                equipmentCode: "3D-Sorter",
                equipmentLine: eqpCodeSel,
                equipmentZone: "",
                storageTemperatureCode: "",
                inputValue: e.component.option("value")
              }
            ]
          };

          lktMqtt.fncMqttDoSend(JSON.stringify(reqPayload));

          $(idPrefix + "#txtBoxBarcode input").select();
        }
      }
    })
    .dxTextBox("instance");

  let headerCss = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center"
    // "background-color": "red"
  };

  let headerCssGray = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center",
    "background-color": "gray"
  };

  searchList();

  if (eqpCodeSel == "") searchConditionsCode("EQUIPMENT_TYPE");
  else {
    //searchList();
    // searchList2();
  }

  intervalList = setInterval(() => {
    searchList();
  }, 5000); // 5초에 한번

  // intervalPrintMq = setInterval(() => {
  //   dvList = zebra.getDeviceList();
  //   console.log("printList:" + dvList);

  //   if (dvList.length > 0)
  //     $(".printstate").css({
  //       color: "green", // 텍스트 색상
  //       fontWeight: "bold" // 텍스트 굵게
  //     });
  //   else
  //     $(".printstate").css({
  //       color: "red", // 텍스트 색상
  //       fontWeight: "bold" // 텍스트 굵게
  //     });

  //   lktMqtt.fncStartMqtt(onMessage);
  //   //selectPrint();
  // }, 5000); // 5초에 한번
}
function createRect(width, height, fill) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

  rect.setAttribute("x", 0);
  rect.setAttribute("y", 0);
  rect.setAttribute("width", width);
  rect.setAttribute("height", height);
  rect.setAttribute("fill", fill);

  return rect;
}

function createText(x, y, fontSize, textAnchor, content) {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("fill", "#000");
  text.setAttribute("text-anchor", textAnchor);
  text.setAttribute("font-size", fontSize);

  text.textContent = content;

  return text;
}

function loadBar(data) {
  let item = data[0];
  item.progressStore = (item.processObjectCount / item.totalObjectCount) * 100;
  item.progressStore = Math.round(item.progressStore) || 0;

  item.progressSku = (item.processSkuCount / item.totalSkuCount) * 100;
  item.progressSku = Math.round(item.progressSku) || 0;

  item.progressQty = (item.processQuantity / item.totalQuantity) * 100;
  item.progressQty = Math.round(item.progressQty) || 0;

  for (let i = 1; i < 5; i++) {
    $(idPrefix + "#progressBar_" + i).dxProgressBar({
      value:
        i == 1
          ? item.processObjectCount
          : i == 2
          ? item.processSkuCount
          : item.processQuantity, // 현재 값
      min: 0, // 최소값
      max:
        i == 1
          ? item.totalObjectCount
          : i == 2
          ? item.totalSkuCount
          : item.totalQuantity, // 현재 값
      showStatus: false, // 기본 텍스트 표시 끄기
      animation: {
        // 애니메이션 설정
        enabled: false // 애니메이션 비활성화
      },
      onValueChanged: function (e) {
        //onContentReady: function (e) {

        setTimeout(() => {
          updateProgressBarText(e);
        }, 200);

        //return;
      },
      onContentReady: function (e) {
        updateProgressBarText(e);
      }
    });

    // let per = Math.round((item.workOrderCount / item.totalOrderCount) * 100, 0);
    // let perRest = 100 - per;

    let progressRst =
      i == 1
        ? item.progressStore
        : i == 2
        ? item.progressSku
        : item.progressQty;

    //alert(progressRst);
    $(idPrefix + "#gaugeContainer_" + i).dxCircularGauge({
      value: progressRst,
      width: "200",
      rangeContainer: {
        backgroundColor: "#e0e0e0", // 채워지지 않은 부분의 색상
        width: 30, // rangeContainer의 두께 설정
        ranges: [
          {startValue: 0, endValue: progressRst, color: "#3a80f6"}, // 채워진 부분의 색상
          {startValue: 56, endValue: 100 - progressRst, color: "#e0e0e0"} // 비워진 부분의 색상
        ]
      },

      scale: {
        startValue: 0,
        endValue: 100,
        tick: {
          visible: false
        },
        label: {
          visible: false
        }
      },

      //valueIndicator: "none",
      valueIndicator: {
        type: "none",
        color: "#3a80f6",
        offset: 10000,
        size: 20
      },

      geometry: {
        startAngle: 0,
        endAngle: 360
      },
      centerTemplate: (gauge, container) => {
        // 루트 요소에 텍스트 추가
        const rect = createRect(50, 0, "transparent");
        // alert(gauge.value);
        const value = gauge.value() || 0;
        const text = createText(10, 200, 30, "start", value + "%");

        container.appendChild(rect);
        container.appendChild(text);
      }
    });
  }
}

function selectPrint() {
  // if (isPrintFind()) {

  if (dvList.length <= 0) return;

  if (true) {
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
      .equipmentLabel(encoded)
      .done(function (response) {
        try {
          if (response.lktBody.length > 0) {
            let resBody = response.lktBody[0];

            // 라벨 출력시작
            console.log("labelIp:" + resBody.labelIp);
            console.log("write:" + resBody.labelZpl);
            zebra.writeToSelectedPrinter(resBody.labelIp, resBody.labelZpl);
            // 라벨 출력완료

            // 출력완료후 후처리

            //return; //  출력패치 임시정지
            var obj = {
              lktHeader: lktUtil.getLktHeader(
                "PAGE.outbound.WCS.MIDDLE.CATEGORIES"
              ),
              lktBody: [
                {
                  labelNumber: resBody.labelNumber
                }
              ]
            };

            apiWcs
              .equipmentLabelPatch(JSON.stringify(obj))
              .done(function (response) {
                try {
                } catch (ex) {}
              })

              .fail(function () {});
          }
        } catch (ex) {}
      })

      .fail(function () {});

    // 프린트 api 호출 후 프린트
    //
    //zebra.writeToSelectedPrinter("usb", zplData);
  }
}

function onActive() {}

function searchList() {
  //  initView();
  var obj = {
    lktHeader: lktUtil.getLktHeader(
      "GET.OUTBOUND.EQUIPMENT.AUTOMATIC.GUIDED.VEHICLE.STATUS"
    ),
    lktBody: [
      {
        equipmentCode: "3D-Sorter",
        equipmentLine: eqpCodeSel,
        equipmentZone: "",
        storageTemperatureCode: ""
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .statusKioskAvg(encoded)
    .done(function (response) {
      try {
        // response.lktBody = [{
        //   processObjectCount: 10,
        //   processSkuCount: 20,
        //   processQuantity: 30,
        //   totalObjectCount: 15,
        //   totalSkuCount: 40,
        //   totalQuantity: 32
        // }]
        statusData = response.lktBody;
        loadBar(statusData);
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

  let bodyTmp = [
    {equipmentCode: "SS001"},
    {equipmentCode: "SS002"},
    {equipmentCode: "SS003"},
    {equipmentCode: "SS004"}
  ];

  // 임시 호기정보 설비정보
  resEquipmentCode = bodyTmp;
  showPopup(false, null);
  // end 임시 호기정보 설비정보

  // var obj = {
  //   lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
  //   lktBody: [{}]
  // };

  // var encoded = btoa(JSON.stringify(obj));

  // apiWcs
  //   .dashboardsOverallStatus(encoded)
  //   .done(function (response) {
  //     try {
  //       resEquipmentCode = response.lktBody;

  //       showPopup(false, null);
  //     } catch (ex) {}
  //   })
  //   .fail(function () {
  //     // 에러 발생 시 처리
  //     //errorPopup.removeClass("hidden");
  //   });
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
      lktMqtt.mqtt_topic_pub = "lktomni";
      lktMqtt.mqtt_topic_sub = "lktomni/" + eqpCodeSel;
      lktMqtt.fncStartMqtt(onMessage);

      localStorage.setItem("eqpCodeSel", eqpCodeSel);

      $(".title span").text(eqpCodeSel);
      searchList();
      //searchList2();
      $("#dynamicPopup").dxPopup("hide");
    },
    onCancel: function () {
      // 취소 버튼 클릭 이벤트 처리
      $("#dynamicPopup").dxPopup("hide");
    }
  });
}

function showStopPopup(isModi, data) {
  let formItems = [];

  // 팝업 호출
  lktUtil.createDynamicPopup({
    title: "작업을 중지합니다.",
    isModi: isModi, // 수정 여부
    formItems: formItems, // 폼 구성
    onExecute: function (formData) {
      $("#dynamicPopup").dxPopup("hide");

      let reqPayload = {
        lktHeader: lktUtil.getLktHeader(
          //"OUTBOUND.EQUIPMENT.PICKTOLIGHT.INPUT"
          "PATCH.OUTBOUND.EQUIPMENT.PICKTOLIGHT.INPUT.CANCEL"
        ),
        lktBody: [
          {
            // storageTemperatureCode: "",
            // equipmentCode: eqpCodeSel,
            // equipmentLine: eqpCodeSel,
            // equipmentZone: eqpCodeSel,
            // inputValue: e.component.option("value")

            equipmentCode: eqpCodeSel,
            lktSequence: data.lktSequence,
            skuCode: data.skuCode,
            sscc: data.sscc ? data.sscc : ""
          }
        ]
      };

      lktMqtt.fncMqttDoSend(JSON.stringify(reqPayload));

      // setTimeout(() => {
      //   searchList2();
      // }, 500);
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
// 테스트용 메시지 전송 함수

// 테스트 실행
// function testOnMessage() {
//   let testMessage = {
//     payloadString: JSON.stringify({
//       lktHeader: {
//         statusCode: "01",
//         message: "✅ 정상 데이터 수신!"
//       },
//       lktBody: [
//         {
//           equipmentCode: "EQ123",
//           processObjectCount: 50,
//           totalObjectCount: 100
//         }
//       ]
//     })
//   };

//   onMessage(testMessage); // 테스트 메시지를 onMessage 함수에 전달
// }

//testOnMessage()
function onMessage(message) {
  try {
    console.log("recv mqtt:" + message.payloadString);
    let recvMq = JSON.parse(message.payloadString);

    let recvDate = recvMq.lktBody[0]; // 첫 번째 데이터만 가져옴

    setTimeout(function () {
      let messageContainer = document.getElementById("mqttMessageContainer");
      let newMessage = document.createElement("div");
      newMessage.classList.add("mqtt-message"); // 스타일을 위한 클래스
      newMessage.innerHTML = `
          <p><strong>상품명:</strong> ${recvDate.equipmentCode}</p>
          <p><strong>작업중 수량:</strong> ${recvDate.processObjectCount}</p>
          <p><strong>총 수량:</strong> ${recvDate.totalObjectCount}</p>
        `;

      // 새로운 메시지를 컨테이너에 추가
      messageContainer.appendChild(newMessage);
    }, 100);

    if (recvMq.lktHeader.statusCode != "01") {
      let msgTmp = recvMq.lktHeader.message;

      $("#errorPopup")
        .dxPopup({
          toolbarItems: [
            {
              location: "before", // 헤더의 왼쪽에 배치
              template: function () {
                // 커스텀 이미지 추가
                return $("<img>", {
                  src: "assets/images/AlertStopIcon.png", // 커스텀 이미지 경로
                  alt: "Error Icon",
                  css: {
                    width: "24px",
                    height: "24px",
                    marginRight: "8px" // 이미지와 텍스트 간격
                  }
                });
              }
            },
            {
              text: "KIOSK", // 헤더 텍스트
              location: "center", // 중앙 정렬
              cssClass: "popup-title-text" // 추가 스타일 적용 가능
            }
          ],
          visible: true,
          width: 450,
          height: "auto", // 높이를 자동으로 조절
          contentTemplate: function (contentElement) {
            $("<div>")
              .css({
                "text-align": "left", // 텍스트 정렬
                "font-size": "14px",
                "line-height": "1.5", // 줄 간격
                "word-wrap": "break-word", // 긴 단어도 줄바꿈
                "overflow-wrap": "break-word", // 줄바꿈 처리
                // "white-space": "normal" // 일반 텍스트처럼 동작
                "white-space": "pre-wrap" // 기본 줄바꿈(\r\n)을 유지
              })
              .text(msgTmp)
              .appendTo(contentElement);
          }
        })
        .dxPopup("show");
    }
  } catch (ex) {
    console.log("pares error");
  }

  searchList();
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
