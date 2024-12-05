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

let tmploginRest = {
  lktOutData: [
    {
      CENTER_CODE: "HMOMNI",
      CLIENT_CODE: "HMOMNI",
      WAREHOUSE_CODE: "HMOMNI",
      USER_NAME: "dasco",
      PERMISSION_CODE: "admin",
      STORAGE_TEMPERATURE_CODE: "RF"
    }
  ],
  lktOutDataDetail: [
    {
      CENTER_CODE: "HMOMNI",
      CLIENT_CODE: "HMOMNI",
      WAREHOUSE_CODE: "HMOMNI",
      PERMISSION_CODE: "admin",
      STORAGE_TEMPERATURE_CODE: "RF",
      MENU_CODE: "HEAD_LKT_DASHBOARD",
      MENU_NAME: "상황판",
      MENU_PARENT: null,
      MENU_ICON: "icon-menu-mast.png",
      MENU_URL: "",
      MENU_SEQUNCE: "0",
      MENU_PATH: "HEAD_LKT_DASHBOARD",
      MENU_LEVEL: 1
    },
    {
      CENTER_CODE: "HMOMNI",
      CLIENT_CODE: "HMOMNI",
      WAREHOUSE_CODE: "HMOMNI",
      PERMISSION_CODE: "admin",
      STORAGE_TEMPERATURE_CODE: "RF",
      MENU_CODE: "MNU_DASHBOARD_OVERALL",
      MENU_NAME: "DAS 전체 상황판",
      MENU_PARENT: "HEAD_LKT_DASHBOARD",
      MENU_ICON: "icon-menu-exec-itemStatus.png",
      MENU_URL: "dash/dashDash/dashDash.html",
      MENU_SEQUNCE: "1",
      MENU_PATH: "HEAD_LKT_DASHBOARD->MNU_DASHBOARD_OVERALL",
      MENU_LEVEL: 2
    },
    {
      CENTER_CODE: "HMOMNI",
      CLIENT_CODE: "HMOMNI",
      WAREHOUSE_CODE: "HMOMNI",
      PERMISSION_CODE: "admin",
      STORAGE_TEMPERATURE_CODE: "RF",
      MENU_CODE: "HEAD_LKT_MASTER",
      MENU_NAME: "기준정보",
      MENU_PARENT: null,
      MENU_ICON: "icon-menu-mast.png",
      MENU_URL: "",
      MENU_SEQUNCE: "0",
      MENU_PATH: "HEAD_LKT_MASTER",
      MENU_LEVEL: 1
    },
    {
      CENTER_CODE: "HMOMNI",
      CLIENT_CODE: "HMOMNI",
      WAREHOUSE_CODE: "HMOMNI",
      PERMISSION_CODE: "admin",
      STORAGE_TEMPERATURE_CODE: "RF",
      MENU_CODE: "MNU_CORES_LOCATIONS",
      MENU_NAME: "로케이션 정보",
      MENU_PARENT: "HEAD_LKT_MASTER",
      MENU_ICON: "icon-menu-mast-locationInfo.png",
      MENU_URL: "mast/mastLocation/mastLocation.html",
      MENU_SEQUNCE: "4",
      MENU_PATH: "HEAD_LKT_MASTER->MNU_CORES_LOCATIONS",
      MENU_LEVEL: 2
    },
    {
      CENTER_CODE: "HMOMNI",
      CLIENT_CODE: "HMOMNI",
      WAREHOUSE_CODE: "HMOMNI",
      PERMISSION_CODE: "admin",
      STORAGE_TEMPERATURE_CODE: "RF",
      MENU_CODE: "MNU_CORES_SKUS",
      MENU_NAME: "상품 정보",
      MENU_PARENT: "HEAD_LKT_MASTER",
      MENU_ICON: "icon-menu-mast-itemInfo.png",
      MENU_URL: "mast/mastItem/mastItem.html",
      MENU_SEQUNCE: "1",
      MENU_PATH: "HEAD_LKT_MASTER->MNU_CORES_SKUS",
      MENU_LEVEL: 2
    },
    {
      CENTER_CODE: "HMOMNI",
      CLIENT_CODE: "HMOMNI",
      WAREHOUSE_CODE: "HMOMNI",
      PERMISSION_CODE: "admin",
      STORAGE_TEMPERATURE_CODE: "RF",
      MENU_CODE: "HEAD_LKT_WORK",
      MENU_NAME: "주문관리",
      MENU_PARENT: null,
      MENU_ICON: "icon-menu-exec.png",
      MENU_URL: "",
      MENU_SEQUNCE: "0",
      MENU_PATH: "HEAD_LKT_WORK",
      MENU_LEVEL: 1
    },
    {
      CENTER_CODE: "HMOMNI",
      CLIENT_CODE: "HMOMNI",
      WAREHOUSE_CODE: "HMOMNI",
      PERMISSION_CODE: "admin",
      STORAGE_TEMPERATURE_CODE: "RF",
      MENU_CODE: "MNU_OUTBOUND_EUC",
      MENU_NAME: "EUC",
      MENU_PARENT: "HEAD_LKT_WORK",
      MENU_ICON: "icon-menu-exec-itemStatus.png",
      MENU_URL: "exec/execEuc/execEuc.html",
      MENU_SEQUNCE: "2",
      MENU_PATH: "HEAD_LKT_WORK->MNU_OUTBOUND_EUC",
      MENU_LEVEL: 2
    },
    {
      CENTER_CODE: "HMOMNI",
      CLIENT_CODE: "HMOMNI",
      WAREHOUSE_CODE: "HMOMNI",
      PERMISSION_CODE: "admin",
      STORAGE_TEMPERATURE_CODE: "RF",
      MENU_CODE: "MNU_OUTBOUND_ORDERS",
      MENU_NAME: "주문관리",
      MENU_PARENT: "HEAD_LKT_WORK",
      MENU_ICON: "icon-menu-exec-ord.png",
      MENU_URL: "exec/execOrd/execOrd.html",
      MENU_SEQUNCE: "1",
      MENU_PATH: "HEAD_LKT_WORK->MNU_OUTBOUND_ORDERS",
      MENU_LEVEL: 2
    },
    {
      CENTER_CODE: "HMOMNI",
      CLIENT_CODE: "HMOMNI",
      WAREHOUSE_CODE: "HMOMNI",
      PERMISSION_CODE: "admin",
      STORAGE_TEMPERATURE_CODE: "RF",
      MENU_CODE: "HEAD_LKT_WORK_ADD",
      MENU_NAME: "추가정보",
      MENU_PARENT: null,
      MENU_ICON: "icon-menu-add.png",
      MENU_URL: "",
      MENU_SEQUNCE: "0",
      MENU_PATH: "HEAD_LKT_WORK_ADD",
      MENU_LEVEL: 1
    },
    {
      CENTER_CODE: "HMOMNI",
      CLIENT_CODE: "HMOMNI",
      WAREHOUSE_CODE: "HMOMNI",
      PERMISSION_CODE: "admin",
      STORAGE_TEMPERATURE_CODE: "RF",
      MENU_CODE: "MNU_OUTBOUND_LABELS_STATUS",
      MENU_NAME: "라벨 처리 현황",
      MENU_PARENT: "HEAD_LKT_WORK_ADD",
      MENU_ICON: "icon-menu-exec-ordStatus.png",
      MENU_URL: "exec/execReprint/execReprint.html",
      MENU_SEQUNCE: "3",
      MENU_PATH: "HEAD_LKT_WORK_ADD->MNU_OUTBOUND_LABELS_STATUS",
      MENU_LEVEL: 2
    },
    {
      CENTER_CODE: "HMOMNI",
      CLIENT_CODE: "HMOMNI",
      WAREHOUSE_CODE: "HMOMNI",
      PERMISSION_CODE: "admin",
      STORAGE_TEMPERATURE_CODE: "RF",
      MENU_CODE: "MNU_OUTBOUND_SKUS_STATUS",
      MENU_NAME: "상품 처리 현황",
      MENU_PARENT: "HEAD_LKT_WORK_ADD",
      MENU_ICON: "icon-menu-exec-ordStatus.png",
      MENU_URL: "exec/execItemStatus/execItemStatus.html",
      MENU_SEQUNCE: "2",
      MENU_PATH: "HEAD_LKT_WORK_ADD->MNU_OUTBOUND_SKUS_STATUS",
      MENU_LEVEL: 2
    }
  ]
};

function gate() {
  // let loginInfo = lktStorate.getLoginInfo();
  // let serverInfo = lktStorate.getServerInfo();

  // lktUtil.lktPayload.lktHeader.call = call;
  // lktUtil.lktPayload.lktHeader.centerCode = loginInfo.centerCode;
  // lktUtil.lktPayload.lktHeader.clientCode = loginInfo.clientCode;
  // lktUtil.lktPayload.lktHeader.warehouseCode = loginInfo.warehouseCode;
  // lktUtil.lktPayload.lktHeader.userName = loginInfo.userName;

  // lktUtil.lktPayload.lktHeader.authentication = serverInfo.authentication;

  // alert("dd");
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
      // {
      //   publicAddress: "192.168.10.3",
      //   internalAddress: "192.168.10.3",
      //   connectionType: "TEST"
      // }
    ]
  };

  api
    .server(reqParam)
    .done(function (response) {
      if (response.lktBody.length == 0) {
        // response.lktBody[0] = {
        //   authentication:
        //     "eyJjZW50ZXJDb2RlIjoiTEtUIiwiY2xpZW50Q29kZSI6IkxLVCIsIndhcmVob3VzZUNvZGUiOiJMS1QiLCJkYXRhYmFzZSI6eyJzZXJ2ZXIiOiIyMTEuMTEwLjIyOS4yMzkiLCJwb3J0IjoiMzMwNiIsImRhdGFiYXNlIjoiTEtUIiwidXNlcm5hbWUiOiJzcGMiLCJwYXNzd29yZCI6IjEwMTBxcHFwITNNIiwgImF0dHJpYnV0ZTAxIjoiTVlTUUwifSwid2FzIjp7InNlcnZlciI6IjIxMS4xMTAuMjI5LjIzOSIsInBvcnQiOiIxNDMzIn0sIm1xdHQiOnsic2VydmVyIjoiMjExLjExMC4yMjkuMjM5IiwicG9ydCI6IjE0MzMiLCJ1c2VybmFtZSI6ImxrdDBkYmEwMF9sa3QwMCIsInBhc3N3b3JkIjoiZGxkbmR5ZCEzTSJ9fQ=="
        // };

        lktStorate.setServerInfo(response.lktHeader);
      }
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

function login() {
  // login API 호출

  let serverInfo = lktStorate.getServerInfo();

  let reqParam = {
    lktHeader: {
      type: "REQUEST",
      call: "PAGE.ONEGATEA.LOGIN",
      status: 0,
      message: "",
      encryption: serverInfo.authentication, //response.lktBody[0],
      centerCode: "",
      clientCode: "",
      warehouseCode: ""
    },
    lktBody: [
      {
        username: $("#username").val(),
        password: btoa($("#password").val()),
        connectionType: "TEST",
        serverGroup: ""
      }
    ]
  };

  api
    .login(reqParam)
    .done(function (response) {
      // alert("dd3");

      alert(JSON.stringify(response));

      // if (response.lktBody.length == 0) {
      //   response.lktBody[0] = {
      //     centerCode: "HMOMN",
      //     clientCode: "HMOMN",
      //     warehouseCode: "HMOMN",
      //     userId: "HMOMN",
      //     userName: "HMOMN"
      //   };
      // }

      lktStorate.setLoginInfo(response.lktBody[0]);
      // alert(JSON.stringify(response.lktBody[0]));
      // alert(JSON.stringify(lktStorate.getLoginInfo()));
      console.log(JSON.stringify(response.lktBody[0]));

      Cookies.set("login", "true");

      //return;

      window.location.href = "../../../index.html";
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

$(document).ready(function () {
  gate();

  const loginBtn = $("#loginBtn");

  loginBtn.on("click", function () {
    login();
  });
});

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

// $(document).ready(function () {
//   const loginBtn = $("#loginBtn");
//   loginBtn.on("click", function () {
//     // 임시 authentication 추가
//     let xJson = new Object();
//     let xDatabase = new Object();

//     xJson.centerCode = "HMOMNI";
//     xJson.clientCode = "HMOMNI";
//     xJson.warehouseCode = "HMOMNI";

//     xDatabase.server = "127.0.0.1";
//     // xDatabase.server = "192.168.26.24";
//     xDatabase.port = "3306";
//     xDatabase.database = "LKT";
//     xDatabase.username = "mskyjuat01";
//     xDatabase.password = "hmgplus1!";
//     xDatabase.attribute01 = "MYSQL";

//     xJson.database = xDatabase;

//     let authentication = new Object();
//     authentication = btoa(JSON.stringify(xJson));
//     let authTmp = {
//       authentication: authentication
//     };

//     // authTmp.authentication =
//     //   "eyJjZW50ZXJDb2RlIjoiTEtUIiwiY2xpZW50Q29kZSI6IkxLVCIsIndhcmVob3VzZUNvZGUiOiJMS1QiLCJkYXRhYmFzZSI6eyJzZXJ2ZXIiOiIyMTEuMTEwLjIyOS4yMzkiLCJwb3J0IjoiMzMwNiIsImRhdGFiYXNlIjoiTEtUIiwidXNlcm5hbWUiOiJzcGMiLCJwYXNzd29yZCI6IjEwMTBxcHFwITNNIiwgImF0dHJpYnV0ZTAxIjoiTVlTUUwifSwid2FzIjp7InNlcnZlciI6IjIxMS4xMTAuMjI5LjIzOSIsInBvcnQiOiIxNDMzIn0sIm1xdHQiOnsic2VydmVyIjoiMjExLjExMC4yMjkuMjM5IiwicG9ydCI6IjE0MzMiLCJ1c2VybmFtZSI6ImxrdDBkYmEwMF9sa3QwMCIsInBhc3N3b3JkIjoiZGxkbmR5ZCEzTSJ9fQ==";
//     // 임시 authentication 추가 end

//     lktStorate.setServerInfo(authTmp);

//     let lktBodyTmp = {
//       centerCode: "HMOMNI",
//       clientCode: "HMOMNI",
//       warehouseCode: "HMOMNI",
//       userId: "HMOMNI",
//       userName: "HMOMNI"
//     };

//     lktStorate.setLoginInfo(lktBodyTmp);

//     Cookies.set("login", "true");

//     window.location.href = "../../../index.html";
//   });
// });

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
