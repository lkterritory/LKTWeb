// api.js

// const baseUrl = "http://lkt0dev00.cafe24.com:1129";
// const baseUrl = "http://192.168.26.24:1129"; // 실서버 pre
const baseUrl = "http://192.168.26.24:4132"; // 실서버
// const baseUrl = "http://192.168.0.9:4132";

// const baseUrl = "http://192.168.26.120:1129";

// $.ajaxSetup({
//   beforeSend: function (jqXHR, settings) {},
//   complete: function (jqXHR, textStatus) {
//     // {"readyState":4,"responseText":"","status":204,"statusText":"No Content"}

//     //console.log(jqXHR);
//     try {
//       if (jqXHR.status != 200) {
//         let msgTmp =
//           "api: " +
//           jqXHR.apiUrl +
//           "\r\n" +
//           "status: " +
//           jqXHR.status +
//           "\r\n" +
//           "message: " +
//           jqXHR.statusText;

//         alert(msgTmp);
//       } else {
//         if (
//           jqXHR.responseJSON &&
//           jqXHR.responseJSON.lktHeader.statusCode != "01"
//         ) {
//           let msgTmp =
//             "api: " +
//             jqXHR.apiUrl +
//             "\r\n" +
//             "statusCode: " +
//             jqXHR.responseJSON.lktHeader.statusCode +
//             "\r\n" +
//             "message: " +
//             jqXHR.responseJSON.lktHeader.message;

//           alert(msgTmp);
//         }
//       }
//     } catch (ex) {
//       //alert("unknown error");
//     }
//   }
// });

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
