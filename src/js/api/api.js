// api.js

// const baseUrl = "http://10.244.100.71:4132"; // 실서버 pre
 const baseUrl = "http://192.168.26.20:4132"; // 실서버

// const baseUrl = "http://lkt0dev00.cafe24.com:4132"; // 테스트서버

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
  },
  complete: function (jqXHR, textStatus) {
    $("#networkPopup").dxPopup("hide");

    if (jqXHR.apiUrl.includes(".html") || jqXHR.apiUrl.includes(".json"))
      return;

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

// 로그인 API 호출 함수
function server(param) {
  return $.ajax({
    url: baseUrl + "/onegate",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(param)
  });
}

function login(param) {
  return $.ajax({
    url: baseUrl + "/onegate/login",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(param)
  });
}

// 모듈을 객체처럼 내보내기
export default {
  server,
  login
};
