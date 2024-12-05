// api.js

// const baseUrlCommon = "http://lkt0dev00.cafe24.com:4132";
// const baseUrlCommon = "http://192.168.26.24:4132"; //실서버;
// const baseUrlCommon = "http://192.168.26.120:4132";
const baseUrlCommon = "http://192.168.0.9:4132"; //실서버;

$.ajaxSetup({
  beforeSend: function (jqXHR, settings) {
    const url = new URL(settings.url, window.location.origin); // 절대 경로로 변환
    jqXHR.apiUrl = url.origin + url.pathname; // 파라미터 없는 URL 저장

    if (
      settings.url.includes("outbound/equipment/picktolight/input") ||
      settings.url.includes("outbound/equipment/picktolight/status") ||
      settings.url.includes("outbound/equipment/label")
    ) {
      return;
    }

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
            width: 400,
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
              width: 400,
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
      alert("unknown error");
    }
  }
});

// 상품정보 start
function coresSkusGet(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/skus?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

function coresSkusAdd(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/skus",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

function coresSkusEdit(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/skus",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
// 상품정보 end

// 로케이션정보 start
function coresLocationGet(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/locations?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

function coresLocationAdd(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/locations",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

function coresLocationEdit(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/locations",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
// 로케이션정보 end

// 권한정보 start
function coresAuthGet(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/permission-settings?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

function coresAuthAdd(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/permission-settings",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

function coresAuthEdit(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/permission-settings",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
// 권한정보 end

// 지점정보 start
function coresStoresGet(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/stores?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

function coresStoresAdd(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/stores",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

function coresStoresEdit(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/stores",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
// 지점정보 end

// 사용자정보 start
function coresUsersGet(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/users?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

function coresUsersAdd(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/users",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

function coresUsersEdit(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/users",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
// 사용자정보 end

// 기초정보 start
function coresCodesGet(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/codes?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

function coresCodesAdd(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/codes",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

function coresCodesEdit(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/codes",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
// 기초정보 end

// EUC 조회
function enduserComputing(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/enduser-computing?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// EUC 실행
function enduserComputingExecute(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/enduser-computing/execute?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 보고서 조회
function reportViewer(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/report-viewers?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 보고서 실행
function reportViewerExecute(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/report-viewers/execute?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 작업호기
function equipmentSummary(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/equipment/summary?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 공통코드
// 설비종류 masterCode - EQUIPMENT_TYPE
// 온도대 masterCode - STORAGE_TEMPERATURE
// 사용유무 masterCode - USE_STATE_CODE
function code(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/code?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 권한정보 코드
function permissionSettingsSummary(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/permission-settings/summary?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 메뉴정보
function menuSummary(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/menus/summary?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 공통 end

// 모듈을 객체처럼 내보내기
export default {
  enduserComputing,
  enduserComputingExecute,
  reportViewer,
  reportViewerExecute,
  coresSkusGet,
  coresSkusAdd,
  coresSkusEdit,
  coresLocationGet,
  coresLocationAdd,
  coresLocationEdit,
  coresAuthGet,
  coresAuthAdd,
  coresAuthEdit,
  coresStoresGet,
  coresStoresAdd,
  coresStoresEdit,
  coresUsersGet,
  coresUsersAdd,
  coresUsersEdit,
  coresCodesGet,
  coresCodesAdd,
  coresCodesEdit,

  equipmentSummary, // 호기코드
  code, // 공통코드
  permissionSettingsSummary, // 권한코드정보
  menuSummary // 메뉴코드
};
