const baseUrlSms = "http://192.168.26.24:9000"; // 스파이럴//spiral 

$.ajaxSetup({
  beforeSend: function (jqXHR, settings) {
    const url = new URL(settings.url, window.location.origin); // 절대 경로로 변환
    jqXHR.apiUrl = url.origin + url.pathname; // 파라미터 없는 URL 저장

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
    $("#networkPopup").dxPopup("hide");

    try {
      //console.log("API 응답:", jqXHR);

      // HTTP 상태 코드가 200이 아닐 경우 (실패 처리)
      if (jqXHR.status !== 200 ) {
         // 기본 메시지
          let errorMessage = `api: ${jqXHR.apiUrl}\r\nstatus: ${jqXHR.status}\r\nmessage: ${jqXHR.statusText}`;
          
          // jqXHR.responseJSON이 존재하는 경우에만 해당 데이터를 표시
          if (jqXHR.responseJSON) {
            const { status, code, message } = jqXHR.responseJSON;
            // responseJSON에서 status, code, message가 있으면 해당 내용을 출력
            errorMessage = `
              status: ${status || 'No status'}<br>
              code: ${code || 'No code'}<br>
              message: ${message || 'No message'}
            `;
          }

          $("#errorPopup").dxPopup({
            toolbarItems: [
              {
                location: "before",
                template: function () {
                  return $("<img>", {
                    src: "assets/images/AlertStopIcon.png",
                    alt: "Error Icon",
                    css: {
                      width: "24px",
                      height: "24px",
                      marginRight: "8px"
                    }
                  });
                }
              },
              {
                text: "http 에러",
                location: "center",
                cssClass: "popup-title-text"
              }
            ],
            visible: true,
            width: 450,
            height: "auto",
            contentTemplate: function (contentElement) {
              $("<div>").css({
                "text-align": "left",
                "font-size": "14px",
                "line-height": "1.5",
                "word-wrap": "break-word",
                "overflow-wrap": "break-word",
                "white-space": "normal"
              }).html(errorMessage).appendTo(contentElement);
            }
          }).dxPopup("show");

          return; //  더 이상 실행하지 않음
      }

      //응답 데이터가 있고, lktHeader가 있는지 확인 후 statusCode 체크
      let responseData = jqXHR.responseJSON;
      let statusCode = responseData?.lktHeader?.statusCode;
      let statusMessage = responseData?.lktHeader?.message || "알 수 없는 오류";

      if (statusCode && statusCode !== "01") {
        let msgTmp =
            `api: ${jqXHR.apiUrl}\r\nstatusCode: ${statusCode}\r\nmessage: ${statusMessage}`;

        $("#errorPopup").dxPopup({
            toolbarItems: [
              {
                location: "before",
                template: function () {
                  return $("<img>", {
                    src: "assets/images/AlertStopIcon.png",
                    alt: "Error Icon",
                    css: {
                      width: "24px",
                      height: "24px",
                      marginRight: "8px"
                    }
                  });
                }
              },
              {
                text: "통신에러",
                location: "center",
                cssClass: "popup-title-text"
              }
            ],
            visible: true,
            width: 450,
            height: "auto",
            contentTemplate: function (contentElement) {
                $("<div>").css({
                    "text-align": "left",
                    "font-size": "14px",
                    "line-height": "1.5",
                    "word-wrap": "break-word",
                    "overflow-wrap": "break-word",
                    "white-space": "pre-wrap"
                }).text(msgTmp).appendTo(contentElement);
            }
        }).dxPopup("show");
      }
  } catch (ex) {
      console.error("에러 처리 중 예외 발생:", ex);
  }
}

});


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

  historyListGet,
  errorListGet,

  masterDestListGet,
  masterDestDuplicateCheck,
  masterDestInsert,
  masterDestUpdate
  
};
