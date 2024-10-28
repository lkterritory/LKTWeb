import api from "../../js/api/api.js";
import lktStorate from "../../js/util/lktStorage.js";

$(document).ready(function () {
  const loginBtn = $("#loginBtn");
  const errorPopup = $("#errorPopup");

  function closePopup() {
    errorPopup.addClass("hidden");
  }

  loginBtn.on("click", function () {
    // server API 호출

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

    api
      .server(reqParam)
      .done(function (response) {
        if (response.lktBody.length == 0) {
          response.lktBody[0] = {
            authentication:
              "eyJjZW50ZXJDb2RlIjoiTEtUIiwiY2xpZW50Q29kZSI6IkxLVCIsIndhcmVob3VzZUNvZGUiOiJMS1QiLCJkYXRhYmFzZSI6eyJzZXJ2ZXIiOiIyMTEuMTEwLjIyOS4yMzkiLCJwb3J0IjoiMzMwNiIsImRhdGFiYXNlIjoiTEtUIiwidXNlcm5hbWUiOiJzcGMiLCJwYXNzd29yZCI6IjEwMTBxcHFwITNNIiwgImF0dHJpYnV0ZTAxIjoiTVlTUUwifSwid2FzIjp7InNlcnZlciI6IjIxMS4xMTAuMjI5LjIzOSIsInBvcnQiOiIxNDMzIn0sIm1xdHQiOnsic2VydmVyIjoiMjExLjExMC4yMjkuMjM5IiwicG9ydCI6IjE0MzMiLCJ1c2VybmFtZSI6ImxrdDBkYmEwMF9sa3QwMCIsInBhc3N3b3JkIjoiZGxkbmR5ZCEzTSJ9fQ=="
          };
        }

        // 있어도 조회 안됨 //임시 auth
        response.lktBody[0] = {
          authentication:
            "eyJjZW50ZXJDb2RlIjoiTEtUIiwiY2xpZW50Q29kZSI6IkxLVCIsIndhcmVob3VzZUNvZGUiOiJMS1QiLCJkYXRhYmFzZSI6eyJzZXJ2ZXIiOiIyMTEuMTEwLjIyOS4yMzkiLCJwb3J0IjoiMzMwNiIsImRhdGFiYXNlIjoiTEtUIiwidXNlcm5hbWUiOiJzcGMiLCJwYXNzd29yZCI6IjEwMTBxcHFwITNNIiwgImF0dHJpYnV0ZTAxIjoiTVlTUUwifSwid2FzIjp7InNlcnZlciI6IjIxMS4xMTAuMjI5LjIzOSIsInBvcnQiOiIxNDMzIn0sIm1xdHQiOnsic2VydmVyIjoiMjExLjExMC4yMjkuMjM5IiwicG9ydCI6IjE0MzMiLCJ1c2VybmFtZSI6ImxrdDBkYmEwMF9sa3QwMCIsInBhc3N3b3JkIjoiZGxkbmR5ZCEzTSJ9fQ=="
        };

        lktStorate.setServerInfo(response.lktBody[0]);

        // login API 호출
        reqParam = {
          lktHeader: {
            type: "REQUEST",
            call: "PAGE.ONEGATEA.LOGIN",
            status: 0,
            message: "",
            encryption: response.lktBody[0],
            centerCode: "LKT",
            clientCode: "LKT",
            warehouseCode: "LKT"
          },
          lktBody: [
            {
              userName: $("#username").val(),
              password: btoa($("#password").val()),
              connectionType: "TEST",
              serverGroup: "SPC#GFC"
            }
          ]
        };

        api
          .login(reqParam)
          .done(function (response) {
            if (response.lktBody.length == 0) {
              response.lktBody[0] = {
                centerCode: "LKT",
                clientCode: "LKT",
                warehouseCode: "LKT",
                userId: "LKT",
                userName: "LKT NAME"
              };
            }

            lktStorate.setLoginInfo(response.lktBody[0]);
            // alert(JSON.stringify(response.lktBody[0]));
            // alert(JSON.stringify(lktStorate.getLoginInfo()));

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
