// api.js

// 로그인 API 호출 함수
function login(username, password) {
  return $.ajax({
    url: "/api/login", // 실제 API URL로 변경 필요
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
      username: username,
      password: password
    })
  });
}

function testest(username, password) {
  return $.ajax({
    url: "/test", // 실제 API URL로 변경 필요
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
      username: username,
      password: password
    })
  });
}

// 모듈을 객체처럼 내보내기
export default {
  login,
  testest
};
