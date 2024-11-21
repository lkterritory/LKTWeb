let api;
let lktStorate;

if (!window.apiModule || !window.lktStorateModule) {
  window.apiModule = import(`../../js/api/api.js?t=${Date.now()}`);
  window.lktStorateModule = import(
    `../../js/util/lktStorage.js?t=${Date.now()}`
  );
}

api = (await window.apiModule).default;
lktStorate = (await window.lktStorateModule).default;

// $(document).ready(function () {
//   const loginBtn = $("#loginBtn");

//   loginBtn.on("click", function () {
//     // alert("dd");
//     let reqParam = {
//       lktHeader: {
//         type: "REQUEST",
//         call: "PATCH.ONEGATE.SERVER",
//         status: 0,
//         message: "",
//         encryption: "",
//         centerCode: "",
//         clientCode: "",
//         warehouseCode: ""
//       },
//       lktBody: [
//         {
//           publicAddress: "192.168.10.3",
//           internalAddress: "192.168.10.3",
//           connectionType: "TEST"
//         }
//       ]
//     };

//     api
//       .server(reqParam)
//       .done(function (response) {
//         if (response.lktBody.length == 0) {
//           response.lktBody[0] = {
//             authentication:
//               "eyJjZW50ZXJDb2RlIjoiTEtUIiwiY2xpZW50Q29kZSI6IkxLVCIsIndhcmVob3VzZUNvZGUiOiJMS1QiLCJkYXRhYmFzZSI6eyJzZXJ2ZXIiOiIyMTEuMTEwLjIyOS4yMzkiLCJwb3J0IjoiMzMwNiIsImRhdGFiYXNlIjoiTEtUIiwidXNlcm5hbWUiOiJzcGMiLCJwYXNzd29yZCI6IjEwMTBxcHFwITNNIiwgImF0dHJpYnV0ZTAxIjoiTVlTUUwifSwid2FzIjp7InNlcnZlciI6IjIxMS4xMTAuMjI5LjIzOSIsInBvcnQiOiIxNDMzIn0sIm1xdHQiOnsic2VydmVyIjoiMjExLjExMC4yMjkuMjM5IiwicG9ydCI6IjE0MzMiLCJ1c2VybmFtZSI6ImxrdDBkYmEwMF9sa3QwMCIsInBhc3N3b3JkIjoiZGxkbmR5ZCEzTSJ9fQ=="
//           };
//         }
//         response.lktBody[0] = {
//           authentication:
//             "eyJjZW50ZXJDb2RlIjoiTEtUIiwiY2xpZW50Q29kZSI6IkxLVCIsIndhcmVob3VzZUNvZGUiOiJMS1QiLCJkYXRhYmFzZSI6eyJzZXJ2ZXIiOiIyMTEuMTEwLjIyOS4yMzkiLCJwb3J0IjoiMzMwNiIsImRhdGFiYXNlIjoiTEtUIiwidXNlcm5hbWUiOiJzcGMiLCJwYXNzd29yZCI6IjEwMTBxcHFwITNNIiwgImF0dHJpYnV0ZTAxIjoiTVlTUUwifSwid2FzIjp7InNlcnZlciI6IjIxMS4xMTAuMjI5LjIzOSIsInBvcnQiOiIxNDMzIn0sIm1xdHQiOnsic2VydmVyIjoiMjExLjExMC4yMjkuMjM5IiwicG9ydCI6IjE0MzMiLCJ1c2VybmFtZSI6ImxrdDBkYmEwMF9sa3QwMCIsInBhc3N3b3JkIjoiZGxkbmR5ZCEzTSJ9fQ=="
//         };

//         // 임시 authentication 추가
//         let xJson = new Object();
//         let xDatabase = new Object();

//         xJson.centerCode = "HMOMNI";
//         xJson.clientCode = "HMOMNI";
//         xJson.warehouseCode = "HMOMNI";

//         xDatabase.server = "192.168.26.24";
//         xDatabase.port = "3306";
//         xDatabase.database = "LKT";
//         xDatabase.username = "mskyjuat01";
//         xDatabase.password = "hmgplus1!";
//         xDatabase.attribute01 = "MYSQL";

//         xJson.database = xDatabase;

//         let authentication = new Object();
//         authentication = btoa(JSON.stringify(xJson));
//         response.lktBody[0] = {
//           authentication: authentication
//         };
//         // 임시 authentication 추가 end

//         lktStorate.setServerInfo(response.lktBody[0]);

//         // login API 호출
//         reqParam = {
//           lktHeader: {
//             type: "REQUEST",
//             call: "PAGE.ONEGATEA.LOGIN",
//             status: 0,
//             message: "",
//             encryption: response.lktBody[0],
//             centerCode: "HMOMN",
//             clientCode: "HMOMN",
//             warehouseCode: "HMOMN"
//           },
//           lktBody: [
//             {
//               userName: $("#username").val(),
//               password: btoa($("#password").val()),
//               connectionType: "TEST",
//               serverGroup: "HMOMN"
//             }
//           ]
//         };

//         api
//           .login(reqParam)
//           .done(function (response) {
//             // alert("dd3");
//             if (response.lktBody.length == 0) {
//               response.lktBody[0] = {
//                 centerCode: "HMOMN",
//                 clientCode: "HMOMN",
//                 warehouseCode: "HMOMN",
//                 userId: "HMOMN",
//                 userName: "HMOMN"
//               };
//             }

//             lktStorate.setLoginInfo(response.lktBody[0]);
//             // alert(JSON.stringify(response.lktBody[0]));
//             // alert(JSON.stringify(lktStorate.getLoginInfo()));

//             Cookies.set("login", "true");

//             window.location.href = "../../../index.html";
//           })
//           .fail(function () {
//             // 에러 발생 시 처리
//           });
//       })
//       .fail(function () {
//         // 에러 발생 시 처리
//       });
//   });
// });

// function showErrorPop() {
//   $("#errorPopup")
//     .dxPopup({
//       title: "오류",
//       visible: true,
//       width: 300,
//       height: 100,
//       contentTemplate: function (contentElement) {
//         const formInstance = $("<div>")
//           .appendTo(contentElement)
//           .dxForm({
//             formData: {},
//             items: []
//           })
//           .dxForm("instance");
//       }
//     })
//     .dxPopup("show");

//   // 임시 강제닫기
//   setTimeout(function () {
//     $("#errorPopup").dxPopup("hide");
//   }, 1);
// }

$(document).ready(function () {
  const loginBtn = $("#loginBtn");
  loginBtn.on("click", function () {
    // 임시 authentication 추가
    let xJson = new Object();
    let xDatabase = new Object();

    xJson.centerCode = "HMOMNI";
    xJson.clientCode = "HMOMNI";
    xJson.warehouseCode = "HMOMNI";

    xDatabase.server = "192.168.26.24";
    xDatabase.port = "3306";
    xDatabase.database = "LKT";
    xDatabase.username = "mskyjuat01";
    xDatabase.password = "hmgplus1!";
    xDatabase.attribute01 = "MYSQL";

    xJson.database = xDatabase;

    let authentication = new Object();
    authentication = btoa(JSON.stringify(xJson));
    let authTmp = {
      authentication: authentication
    };
    // 임시 authentication 추가 end

    lktStorate.setServerInfo(authTmp);

    let lktBodyTmp = {
      centerCode: "HMOMN",
      clientCode: "HMOMN",
      warehouseCode: "HMOMN",
      userId: "HMOMN",
      userName: "HMOMN"
    };

    lktStorate.setLoginInfo(lktBodyTmp);

    Cookies.set("login", "true");

    window.location.href = "../../../index.html";
  });
});

function showErrorPop() {
  $("#errorPopup")
    .dxPopup({
      title: "오류",
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

  // 임시 강제닫기
  setTimeout(function () {
    $("#errorPopup").dxPopup("hide");
  }, 1);
}
