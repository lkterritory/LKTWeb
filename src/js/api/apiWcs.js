// api.js

// const baseUrlWcs = "http://10.244.100.71:2014"; // 실서버
const baseUrlWcs = "http://192.168.26.20:2014"; // 실서버
const baseUrlSms = "http://192.168.26.24:9000"; // 스파이럴

// const baseUrlWcs = "http://lkt0dev00.cafe24.com:2014"; // 테스트 서버

$.ajaxSetup({
  beforeSend: function (jqXHR, settings) {
    const url = new URL(settings.url, window.location.origin); // 절대 경로로 변환
    jqXHR.apiUrl = url.origin + url.pathname; // 파라미터 없는 URL 저장

    if (
      settings.url.includes("dashboard") ||
      settings.url.includes("outbound/equipment/picktolight/input") ||
      settings.url.includes("outbound/equipment/picktolight/status") ||
      settings.url.includes("outbound/equipment/label") ||
      settings.url.includes("outbound/equipment/picktolight/label-print") ||
      settings.url.includes("outbound/equipment/automatic-guided-vehicle/status") ||
      settings.url.includes(".html") ||
      settings.url.includes(".json")
    ) {
      return;
    }

    // console.log()

    $("#networkPopup")
      .dxPopup({
        title: "로딩중...",
        visible: true,
        width: 300,
        height: 100,
        contentTemplate: function (contentElement) {
          const formInstance = $("<div>")
            .appendTo(contentElement)
            .dxForm({
              formData: {},
              items: []
            })
            .dxForm("instance");
        }
      })
      .dxPopup("show");

    // // 임시 강제닫기
    // setTimeout(function () {
    //   $("#networkPopup").dxPopup("hide");
    // }, 1);
  },
  complete: function (jqXHR, textStatus) {
    // {"readyState":4,"responseText":"","status":204,"statusText":"No Content"}

    $("#networkPopup").dxPopup("hide");

    //console.log(jqXHR);
    try {
      if (jqXHR.status != 200) {
        let msgTmp =
          "api: " +
          jqXHR.apiUrl +
          "\r\n" +
          "status: " +
          jqXHR.status +
          "\r\n" +
          "message: " +
          jqXHR.statusText;

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
                text: "http 에러", // 헤더 텍스트
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
      } else {
        if (
          jqXHR.responseJSON &&
          jqXHR.responseJSON.lktHeader.statusCode != "01"
        ) {
          let msgTmp =
            "api: " +
            jqXHR.apiUrl +
            "\r\n" +
            "statusCode: " +
            jqXHR.responseJSON.lktHeader.statusCode +
            "\r\n" +
            "message: " +
            jqXHR.responseJSON.lktHeader.message;

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
                  text: "통신에러", // 헤더 텍스트
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
      }
    } catch (ex) {
      alert(ex);
    }
  }
});

// 작업차수
function workbatch(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/wcs/workbatch?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 작업지시 start
// 작업조회
function wcsOperation(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/wcs/operation?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 작업계획
function wcsOperationPlan(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/wcs/operation/plan",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

// 작업시작
function wcsOperationStart(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/wcs/operation/start",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

// 차수완료
function wcsOperationcCompleted(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/wcs/operation/completed",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

// 전체완료
function wcsOperationcClosing(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/wcs/operation/closing",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

// 작업취소
function wcsOperationcCancel(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/wcs/operation/cancel",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
// 작업지시 end

// 검수 start
function wcsInspectionsList(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/wcs/inspections?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

function wcsInspectionsConfirm(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/wcs/inspections",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

function wcsInspectionsCompletion(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/wcs/inspections/completion",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
// 검수 end

// 중분류 start
function wcsMiddleCategories(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/wcs/middle-categories?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}
// 중분류 end

// 주문별작업현황
function statusOrders(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/status/orders?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 주문별작업현황(상세)
function statusOrderDetail(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/status/orders/detail?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 상품별작업현황
function statusSkus(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/status/skus?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 상품별작업현황(상세)
function statusSkusDetail(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/status/skus/detail?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 설비별작업현황
function statusEquipment(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/status/equipment?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 설비별작업현황(상세)
function statusEquipmentDetail(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/status/equipment/detail?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 상황판
function dashboardsOverallStatus(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/dashboard/overall?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 호기별 상황판
function dashboardsPickToLightInstances(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/dashboard/pick-to-light?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 호기별 상황판 (일별 생산성)
function dashboardsPickToLightWeekly(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/dashboard/pick-to-light/weekly-productivity?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 호기별 상황판 (주간 생산성)
function dashboardsPickToLightDaily(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/dashboard/pick-to-light/daily-productivity?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 키오스크
function equipmentPicktolightInput(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/equipment/picktolight/input?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

function equipmentPicktolightSscc(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/equipment/picktolight/merask/interface-reference-number?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

function equipmentPicktolightStatus(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/equipment/picktolight/status?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// function equipmentLabel(param) {
//   return $.ajax({
//     url: baseUrlWcs + "/outbound/equipment/label-print?id=" + param,
//     method: "GET",
//     dataType: "json",
//     contentType: "application/json",
//     data: {}
//   });
// }

function equipmentLabel(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/equipment/picktolight/label-print?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

function equipmentLabelPatch(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/equipment/picktolight/label-print",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

//
// 라벨 재발행 화면 -----
// 라벨재발행
function statusLabels(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/status/labels?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}
//

// 라벨 일괄출력
function statusLabelsPrintCount(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/status/labels/print-count?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 라벨 조회(출력위함)
function statusLabelsPrint(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/status/labels/print?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 라벨출력완료
function statusLabelsPrintPatch(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/status/labels/print",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

//지점별 작업 현황
function statusStores(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/status/stores?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}
//지점별 작업 현황 상세
function statusStoresDetail(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/status/stores/detail?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

//AGV - KIOSK 작업현황
function statusKioskAvg(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/equipment/automatic-guided-vehicle/status?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

//AGV - PAD 로케이션 상황판
function dashboardsPdaLocation(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/equipment/automatic-guided-vehicle/locations/tasks/status?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

//AGV - PDA 주문 & 박스 매핑
function mappingPdaOrdersBox(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/equipment/automatic-guided-vehicle/orders/boxs/mapping",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

//AGV - 상품 및 주문 매핑
function mappingSkusOrders(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbound/equipment/automatic-guided-vehicle/task-start",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}




//spiral 

//작업 이력 조회
function historyListGet(param) {
  return $.ajax({
    url: baseUrlSms + "/sms/be/intf/history-list/get",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

//에러 데이터 조회
function errorListGet(param) {
  return $.ajax({
    url: baseUrlSms + "/sms/be/intf/error-list/get",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

//분류 마스터 코드 조회
function masterDestListGet(param) {
  return $.ajax({
    url: baseUrlSms + "/sms/be/master/dest-list/get",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
//분류 마스터 코드 중복 확인
function masterDestDuplicateCheck(param) {
  return $.ajax({
    url: baseUrlSms + "/sms/be/master/dest-duplicate/check",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
//분류 마스터 코드 생성
function masterDestInsert(param) {
  return $.ajax({
    url: baseUrlSms + "/sms/be/master/dest-insert",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
//분류 마스터 코드 저장 
function masterDestUpdate(param) {
  return $.ajax({
    url: baseUrlSms + "/sms/be/master/dest-update",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}



export default {
  workbatch,

  wcsOperation,
  wcsOperationPlan,
  wcsOperationStart,
  wcsOperationcCompleted,
  wcsOperationcClosing,
  wcsOperationcCancel,

  statusOrders,
  statusOrderDetail,
  statusSkus,
  statusSkusDetail,
  statusEquipment,
  statusEquipmentDetail,

  wcsMiddleCategories,

  wcsInspectionsList,
  wcsInspectionsConfirm,
  wcsInspectionsCompletion,

  dashboardsOverallStatus,

  dashboardsPickToLightInstances,
  dashboardsPickToLightWeekly,
  dashboardsPickToLightDaily,

  equipmentPicktolightInput,
  equipmentPicktolightSscc,
  equipmentPicktolightStatus,
  equipmentLabel,
  equipmentLabelPatch,

  statusLabels,
  statusLabelsPrintCount,
  statusLabelsPrint,
  statusLabelsPrintPatch,

  statusStores,
  statusStoresDetail,

  statusKioskAvg,
  dashboardsPdaLocation,
  mappingPdaOrdersBox,
  mappingSkusOrders,

  historyListGet,
  errorListGet,

  masterDestListGet,
  masterDestDuplicateCheck,
  masterDestInsert,
  masterDestUpdate
  
};
