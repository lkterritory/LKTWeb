let moduleTarget = {};
let loadedTabs = {}; // 탭 로드 상태 및 콘텐츠를 저장하는 객체

let loadedModules = [];

let api;
let lktStorate;

if (!window.apiModule || !window.lktStorateModule) {
  window.apiModule = import(`./api/api.js?t=${Date.now()}`);
  window.lktStorateModule = import(`./util/lktStorage.js?t=${Date.now()}`);
}

api = (await window.apiModule).default;
lktStorate = (await window.lktStorateModule).default;

function gate() {
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

        lktStorate.setServerInfo(response.lktBody[0]);
      }
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

function checkSession() {
  if (Cookies.get("login") != "true") {
    window.location.href = "./src/views/login/login.html";
  }
}

function createMenu() {
  // menu.json을 로드하고 사이드 메뉴 생성
  $.getJSON("./src/data/menu.json?t=" + Date.now(), function (data) {
    try {
      let loginInfo = lktStorate.getLoginInfo();

      console.log("loadmenuinfo:", JSON.stringify(loginInfo));

      let tmploginRest = {
        lktOutData: [
          {
            centerCode: "HMOMNI",
            clientCode: "HMOMNI",
            WAREHOUSE_CODE: "HMOMNI",
            USER_NAME: "dasco",
            PERMISSION_CODE: "admin",
            STORAGE_TEMPERATURE_CODE: "RF"
          }
        ],
        lktOutDataDetail: [
          {
            centerCode: "HMOMNI",
            clientCode: "HMOMNI",
            WAREHOUSE_CODE: "HMOMNI",
            PERMISSION_CODE: "admin",
            STORAGE_TEMPERATURE_CODE: "RF",
            menuCode: "HEAD_LKT_DASHBOARD",
            menuName: "상황판",
            menuParent: null,
            MENU_ICON: "icon-menu-mast.png",
            menuUrl: "",
            MENU_SEQUNCE: "0",
            MENU_PATH: "HEAD_LKT_DASHBOARD",
            menuLevel: 1
          },
          {
            centerCode: "HMOMNI",
            clientCode: "HMOMNI",
            WAREHOUSE_CODE: "HMOMNI",
            PERMISSION_CODE: "admin",
            STORAGE_TEMPERATURE_CODE: "RF",
            menuCode: "MNU_DASHBOARD_OVERALL",
            menuName: "DAS 전체 상황판",
            menuParent: "HEAD_LKT_DASHBOARD",
            MENU_ICON: "icon-menu-exec-itemStatus.png",
            menuUrl: "dash/dashDash/dashDash.html",
            MENU_SEQUNCE: "1",
            MENU_PATH: "HEAD_LKT_DASHBOARD->MNU_DASHBOARD_OVERALL",
            menuLevel: 2
          },
          {
            centerCode: "HMOMNI",
            clientCode: "HMOMNI",
            WAREHOUSE_CODE: "HMOMNI",
            PERMISSION_CODE: "admin",
            STORAGE_TEMPERATURE_CODE: "RF",
            menuCode: "HEAD_LKT_MASTER",
            menuName: "기준정보",
            menuParent: null,
            MENU_ICON: "icon-menu-mast.png",
            menuUrl: "",
            MENU_SEQUNCE: "0",
            MENU_PATH: "HEAD_LKT_MASTER",
            menuLevel: 1
          },
          {
            centerCode: "HMOMNI",
            clientCode: "HMOMNI",
            WAREHOUSE_CODE: "HMOMNI",
            PERMISSION_CODE: "admin",
            STORAGE_TEMPERATURE_CODE: "RF",
            menuCode: "MNU_CORES_LOCATIONS",
            menuName: "로케이션 정보",
            menuParent: "HEAD_LKT_MASTER",
            MENU_ICON: "icon-menu-mast-locationInfo.png",
            menuUrl: "mast/mastLocation/mastLocation.html",
            MENU_SEQUNCE: "4",
            MENU_PATH: "HEAD_LKT_MASTER->MNU_CORES_LOCATIONS",
            menuLevel: 2
          },
          {
            centerCode: "HMOMNI",
            clientCode: "HMOMNI",
            WAREHOUSE_CODE: "HMOMNI",
            PERMISSION_CODE: "admin",
            STORAGE_TEMPERATURE_CODE: "RF",
            menuCode: "MNU_CORES_SKUS",
            menuName: "상품 정보",
            menuParent: "HEAD_LKT_MASTER",
            MENU_ICON: "icon-menu-mast-itemInfo.png",
            menuUrl: "mast/mastItem/mastItem.html",
            MENU_SEQUNCE: "1",
            MENU_PATH: "HEAD_LKT_MASTER->MNU_CORES_SKUS",
            menuLevel: 2
          },
          {
            centerCode: "HMOMNI",
            clientCode: "HMOMNI",
            WAREHOUSE_CODE: "HMOMNI",
            PERMISSION_CODE: "admin",
            STORAGE_TEMPERATURE_CODE: "RF",
            menuCode: "HEAD_LKT_WORK",
            menuName: "주문관리",
            menuParent: null,
            MENU_ICON: "icon-menu-exec.png",
            menuUrl: "",
            MENU_SEQUNCE: "0",
            MENU_PATH: "HEAD_LKT_WORK",
            menuLevel: 1
          },
          {
            centerCode: "HMOMNI",
            clientCode: "HMOMNI",
            WAREHOUSE_CODE: "HMOMNI",
            PERMISSION_CODE: "admin",
            STORAGE_TEMPERATURE_CODE: "RF",
            menuCode: "MNU_OUTBOUND_EUC",
            menuName: "EUC",
            menuParent: "HEAD_LKT_WORK",
            MENU_ICON: "icon-menu-exec-itemStatus.png",
            menuUrl: "exec/execEuc/execEuc.html",
            MENU_SEQUNCE: "2",
            MENU_PATH: "HEAD_LKT_WORK->MNU_OUTBOUND_EUC",
            menuLevel: 2
          },
          {
            centerCode: "HMOMNI",
            clientCode: "HMOMNI",
            WAREHOUSE_CODE: "HMOMNI",
            PERMISSION_CODE: "admin",
            STORAGE_TEMPERATURE_CODE: "RF",
            menuCode: "MNU_OUTBOUND_ORDERS",
            menuName: "주문관리",
            menuParent: "HEAD_LKT_WORK",
            MENU_ICON: "icon-menu-exec-ord.png",
            menuUrl: "exec/execOrd/execOrd.html",
            MENU_SEQUNCE: "1",
            MENU_PATH: "HEAD_LKT_WORK->MNU_OUTBOUND_ORDERS",
            menuLevel: 2
          },
          {
            centerCode: "HMOMNI",
            clientCode: "HMOMNI",
            WAREHOUSE_CODE: "HMOMNI",
            PERMISSION_CODE: "admin",
            STORAGE_TEMPERATURE_CODE: "RF",
            menuCode: "HEAD_LKT_WORK_ADD",
            menuName: "추가정보",
            menuParent: null,
            MENU_ICON: "icon-menu-add.png",
            menuUrl: "",
            MENU_SEQUNCE: "0",
            MENU_PATH: "HEAD_LKT_WORK_ADD",
            menuLevel: 1
          },
          {
            centerCode: "HMOMNI",
            clientCode: "HMOMNI",
            WAREHOUSE_CODE: "HMOMNI",
            PERMISSION_CODE: "admin",
            STORAGE_TEMPERATURE_CODE: "RF",
            menuCode: "MNU_OUTBOUND_LABELS_STATUS",
            menuName: "라벨 처리 현황",
            menuParent: "HEAD_LKT_WORK_ADD",
            MENU_ICON: "icon-menu-exec-ordStatus.png",
            menuUrl: "exec/execReprint/execReprint.html",
            MENU_SEQUNCE: "3",
            MENU_PATH: "HEAD_LKT_WORK_ADD->MNU_OUTBOUND_LABELS_STATUS",
            menuLevel: 2
          },
          {
            centerCode: "HMOMNI",
            clientCode: "HMOMNI",
            WAREHOUSE_CODE: "HMOMNI",
            PERMISSION_CODE: "admin",
            STORAGE_TEMPERATURE_CODE: "RF",
            menuCode: "MNU_OUTBOUND_SKUS_STATUS",
            menuName: "상품 처리 현황",
            menuParent: "HEAD_LKT_WORK_ADD",
            MENU_ICON: "icon-menu-exec-ordStatus.png",
            menuUrl: "exec/execItemStatus/execItemStatus.html",
            MENU_SEQUNCE: "2",
            MENU_PATH: "HEAD_LKT_WORK_ADD->MNU_OUTBOUND_SKUS_STATUS",
            menuLevel: 2
          }
        ]
      };

      let menuInfo = loginInfo.lktOutDataDetail;
      // let menuInfo = tmploginRest.lktOutDataDetail; // 임시 테스트
      let menuReal = [];

      for (let menuitm of menuInfo) {
        if (menuitm.menuLevel == 1) {
          menuitm.title = menuitm.menuName;
          menuitm.submenus = [];
          menuReal.push(menuitm);
        }
      }

      for (let menuitm of menuInfo) {
        if (menuitm.menuLevel == 2) {
          // 레벨2인것
          for (let mrItm of menuReal) {
            // 만들어진 메뉴
            if (mrItm.menuLevel == 1) {
              // 대메뉴일때
              if (menuitm.menuParent == mrItm.menuCode) {
                // 2레벨의 상위코드와 상위메뉴의 메뉴코드가 같으면
                menuitm.title = menuitm.menuName;
                menuitm.view = menuitm.menuUrl;
                mrItm.submenus.push(menuitm);
              }
            }
          }
        }
      }

      data.menuItems = menuReal;
    } catch (ex) {
      console.log("menuload error:", ex);
    }

    //console(JSON.stringify(data.menuItems));

    // {
    //   "title": "기준정보",
    //   "submenus": [
    //     {"title": "상품정보", "view": "mast/mastItem/mastItem.html"},
    //     {"title": "사용자정보", "view": "mast/mastUser/mastUser.html"},
    //     {"title": "권한정보", "view": "mast/mastAuth/mastAuth.html"},
    //     {
    //       "title": "로케이션정보",
    //       "view": "mast/mastLocation/mastLocation.html"
    //     },
    //     {"title": "기초정보", "view": "mast/mastBase/mastBase.html"}
    //   ]
    // },

    let menuHtml = "<ul>";
    data.menuItems.forEach(function (item) {
      menuHtml += `<li class="menu-item">${item.title}<ul class="submenu">`;
      item.submenus.forEach(function (submenu) {
        menuHtml += `<li class="submenu-item" data-view="${submenu.view}">${submenu.title}</li>`;
      });
      menuHtml += "</ul></li>";
    });
    menuHtml += "</ul>";
    $("#sideMenu").append(menuHtml);

    // 서브메뉴 클릭 이벤트 처리
    $(".submenu-item").click(async function () {
      let view = $(this).data("view");
      let tabTitle = $(this).text();

      //
      localStorage.setItem("viewPre", view);
      localStorage.setItem("tabTitlePre", tabTitle);

      let isFindView = loadedModules.find((item) => item.view === view);
      if (!isFindView) {
        const importedModule = await import(
          "../views/" + view.replace(".html", ".js?t=" + Date.now())
        );
        moduleTarget = importedModule.default || importedModule;

        loadedModules.push({
          module: moduleTarget,
          view: view
        });
      }

      if (isFindView) moduleTarget = isFindView.module;

      // console.log(moduleTarget);

      // 이미 로드된 탭인지 확인
      if (loadedTabs[view]) {
        activateTab(view);
        moduleTarget.onActive();
      } else {
        addTab(tabTitle, view);
        loadContent(view);
      }
    });
  });
}

$(document).ready(function () {
  gate();

  checkSession();
  createMenu();

  $(".logout-button").dxButton({
    text: "logout",
    type: "danger",
    stylingMode: "contained",
    onClick: function () {
      alert("로그아웃 되었습니다.");

      localStorage.setItem("viewPre", null);
      localStorage.setItem("tabTitlePre", null);
      window.location.href = "./src/views/login/login.html";
    }
  });

  //alert("ddd1");
  // 메뉴 항목 클릭 이벤트

  setTimeout(() => {
    $(".menu-item").click(function (e) {
      //  alert("dd2");
      e.stopPropagation(); // 이벤트 버블링 방지

      // 모든 서브메뉴 닫기
      $(".submenu").slideUp();

      // 현재 클릭한 메뉴의 서브메뉴만 열기
      $(this).children(".submenu").slideToggle();
    });

    // 메뉴 외부를 클릭했을 때 서브메뉴 닫기
    $(document).click(function () {
      $(".submenu").slideUp();
    });

    restoreTabs();
  }, 200);

  // 페이지 로드 시 저장된 활성화된 탭 복원
});

// // 탭을 추가하는 함수
function addTab(tabTitle, view) {
  // 탭이 이미 있는지 확인
  if ($(`.tab[data-view="${view}"]`).length === 0) {
    // 모든 탭에서 last 클래스를 제거하고 middle 클래스를 추가
    $(".tab").removeClass("last").addClass("middle");

    // 새로운 탭이 마지막이므로 last 클래스를 추가
    const tabHtml = `
      <div class="tab last" data-view="${view}" onclick="activateTab('${view}')">
        ${tabTitle}
        <span class="close-tab" onclick="event.stopPropagation(); removeTab('${view}')"> X </span>
      </div>
    `;

    // 탭 컨테이너에 추가
    $("#tabContainer").append(tabHtml);

    // 처음 탭일 경우 start 클래스를 추가하고 middle 클래스를 제거
    if ($(".tab").length === 1) {
      $(".tab").removeClass("middle").addClass("start");
    }
  }
}

// 콘텐츠 로드 함수
function loadContent(view) {
  $.ajax({
    url: `./src/views/${view}?t=` + Date.now(),
    method: "GET",
    success: function (data) {
      const contentId = view.replace(/\//g, "-").replace(".html", "");
      const contentHtml = `<div id="${contentId}" class="content-view" style="display: flex;">${data}</div>`;
      $("#mainContent").append(contentHtml);

      activateTab(view); // 첫 로드 시에도 탭을 활성화하고 show() 처리
      loadedTabs[view] = {content: data}; // 로드된 콘텐츠를 캐싱

      moduleTarget.onCreate();
      moduleTarget.onActive();
    },
    error: function () {
      $("#mainContent").html("Error loading content");
    }
  });
}

// 저장된 탭 상태 복원 함수
async function restoreTabs() {
  let view = localStorage.getItem("viewPre");
  let tabTitle = localStorage.getItem("tabTitlePre");

  if (
    view == null ||
    tabTitle == null ||
    view == "null" ||
    tabTitle == "null"
  ) {
    return;
  }

  let isFindView = loadedModules.find((item) => item.view === view);
  if (!isFindView) {
    const importedModule = await import(
      "../views/" + view.replace(".html", ".js?t=" + Date.now())
    );
    moduleTarget = importedModule.default || importedModule;

    loadedModules.push({
      module: moduleTarget,
      view: view
    });
  }

  if (isFindView) moduleTarget = isFindView.module;

  // const importedModule = await import(
  //   "../views/" + view.replace(".html", ".js?t=" + Date.now())
  // );
  // moduleTarget = importedModule.default || importedModule;

  // 이미 로드된 탭인지 확인
  if (loadedTabs[view]) {
    activateTab(view);
    moduleTarget.onActive();
  } else {
    addTab(tabTitle, view);
    loadContent(view);
  }
}

// 탭 활성화 함수
window.activateTab = function (view) {
  // .html을 제거한 id 생성

  const contentId = view.replace(/\//g, "-").replace(".html", "");

  $(".tab").removeClass("active");
  $(".content-view").hide(); // 모든 콘텐츠를 숨기고

  $(`.tab[data-view="${view}"]`).addClass("active");
  $(`#${contentId}`).show(); // 선택된 콘텐츠만 표시
};

// 탭을 닫는 함수
window.removeTab = function (view) {
  localStorage.setItem("viewPre", null);
  localStorage.setItem("tabTitlePre", null);

  let isFindView = loadedModules.find((item) => item.view === view);

  if (isFindView.module.onDestroy) {
    isFindView.module.onDestroy();
  } else {
  }

  const contentId = view.replace(/\//g, "-").replace(".html", "");
  $(`.tab[data-view="${view}"]`).remove();
  $(`#${contentId}`).remove(); // 콘텐츠를 DOM에서 삭제
  delete loadedTabs[view]; // 캐시에서 삭제

  // 이전 탭을 찾아서 활성화
  const lastTab = $(".tab").last(); // 마지막 탭을 선택

  if (lastTab.length) {
    const lastView = lastTab.data("view"); // 마지막 탭의 뷰 정보를 가져옴

    activateTab(lastView); // 마지막 탭 활성화
  } else {
    $("#mainContent").empty(); // 탭이 하나도 없으면 콘텐츠 영역 비우기
  }
};
