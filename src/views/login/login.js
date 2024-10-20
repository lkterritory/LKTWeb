import api from "../../js/api.js";

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

    // window.location.href = "../../../index.html";
    // return;

    let reqParam = {
      lktHeader: {
        type: "REQUEST",
        call: "PATCH.ONEGATE.SERVER",
        status: 0,
        message: "",
        encryption: "",
        centerCode: "",
        clientCode: "",
        warehouseCode: ""
      },
      lktBody: [
        {
          publicAddress: "192.168.10.3",
          internalAddress: "192.168.10.3",
          connectionType: "TEST"
        }
      ]
    };

    // 로그인 API 호출
    api
      .server(reqParam)
      .done(function (response) {
        // alert(JSON.stringify(response));

        reqParam = {
          lktHeader: {
            type: "REQUEST",
            call: "PAGE.ONEGATEA.LOGIN",
            status: 0,
            message: "",
            encryption: "",
            centerCode: "LKT",
            clientCode: "LKT",
            warehouseCode: "LKT"
          },
          lktBody: [
            {
              userName: "LKT",
              password: "QUJDREU=",
              connectionType: "TEST",
              serverGroup: "SPC#GFC"
            }
          ]
        };

        api
          .login(reqParam)
          .done(function (response) {
            // 로그인 성공 시 대시보드로 이동
            window.location.href = "../../../index.html";
          })
          .fail(function () {
            // 에러 발생 시 처리
            errorPopup.removeClass("hidden");
          });
      })
      .fail(function () {
        // 에러 발생 시 처리
        errorPopup.removeClass("hidden");
      });
  });
});
