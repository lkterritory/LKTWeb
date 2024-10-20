// api.js

const baseUrl = "http://lkt0dev00.cafe24.com:1129";

// 로그인 API 호출 함수
function server(param) {
  return $.ajax({
    url: baseUrl + "/onegate/server", // 실제 API URL로 변경 필요
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(param)
  });
}

function login(param) {
  return $.ajax({
    url: baseUrl + "/onegate/login", // 실제 API URL로 변경 필요
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
