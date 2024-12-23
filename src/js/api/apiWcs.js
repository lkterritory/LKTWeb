// api.js

// const baseUrlWcs = "http://10.244.100.71:2014"; // 실서버
// const baseUrlWcs = "http://192.168.26.24:2014"; // 실서버
const baseUrlWcs = "http://lkt0dev00.cafe24.com:2014"; // 테스트 서버

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
            title: "http 에러",
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
              title: "통신에러",
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

//

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

  equipmentPicktolightInput,
  equipmentPicktolightStatus,
  equipmentLabel,
  equipmentLabelPatch,

  statusLabels,
  statusLabelsPrintCount,
  statusLabelsPrint,
  statusLabelsPrintPatch
};
