// login.js

import api from "../../js/api"; // api.js 전체를 객체로 불러옴

$(document).ready(function () {
  const loginBtn = $("#loginBtn");
  const errorPopup = $("#errorPopup");

  function closePopup() {
    errorPopup.addClass("hidden");
  }

  loginBtn.on("click", function () {
    // const username = $("#username").val();
    // const password = $("#password").val();

    // // 입력값 유효성 검사
    // if (!username || !password) {
    //   errorPopup.removeClass("hidden");
    //   return;
    // }

    window.location.href = "../../../index.html";
    return;

    // 로그인 API 호출
    api
      .login(username, password)
      .done(function (response) {
        if (response.success) {
          // 로그인 성공 시 대시보드로 이동
          window.location.href = "../../views/dashboard.html";
        } else {
          // 로그인 실패 시 팝업 표시
          errorPopup.removeClass("hidden");
        }
      })
      .fail(function () {
        // 에러 발생 시 처리
        errorPopup.removeClass("hidden");
      });
  });
});
