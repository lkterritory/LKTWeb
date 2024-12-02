// api.js

// const baseUrl = "http://lkt0dev00.cafe24.com:1129";
// const baseUrl = "http://192.168.26.24:1129"; // 실서버
const baseUrl = "http://192.168.26.24:4132"; // 실서버

// const baseUrl = "http://192.168.26.120:1129";

$.ajaxSetup({
  beforeSend: function (jqXHR, settings) {
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

    // try {
    //   if (jqXHR.status != 200) {
    //     alert(jqXHR.status + ": " + jqXHR.statusText);
    //   }
    // } catch (ex) {
    //   alert("unknown error");
    // }

    $("#networkPopup").dxPopup("hide");

    $("#networkPopup").dxPopup("hide");
  }
});

// 로그인 API 호출 함수
function server(param) {
  return $.ajax({
    url: baseUrl + "/onegate/server",
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
