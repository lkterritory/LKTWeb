let moduleTarget = {};
let loadedTabs = {}; // 탭 로드 상태 및 콘텐츠를 저장하는 객체

let loadedModules = [];

let api;//테스트  
let lktStorage;

if (!window.apiModule || !window.lktStorageModule) {
  window.apiModule = import(`./api/api.js?t=${Date.now()}`);
  window.lktStorageModule = import(`./util/lktStorage.js?t=${Date.now()}`);
}

api = (await window.apiModule).default;
lktStorage = (await window.lktStorageModule).default;

function gate() {
  // alert("dd");
  let reqParam = {
    lktHeader: {
      type: "REQUEST",
      call: "PATCH.ONEGATE",
      statusCode: 0,
      message: "",
      authentication: "",
      username: "",
      centerCode: "",
      clientCode: "",
      warehouseCode: ""
    },
    lktBody: [
      {
        serviceName: "lktweb"
      }
    ]
  };

  api
    .server(reqParam)
    .done(function (response) {
      if (response.lktBody.length == 0) {
        // response.lktHeader.authentication =
        //   "ewogICJsa3RIZWFkZXIiOiB7CiAgICAidHlwZSI6ICJsaWNlbnNlIiwKICAgICJjYWxsIjogIkxLVC5MSUNFTlNFIiwKICAgICJzdGF0dXNDb2RlIjogIjAxIiwKICAgICJtZXNzYWdlIjogIiIsCiAgICAiYXV0aGVudGljYXRpb24iOiAiIiwKICAgICJjZW50ZXJDb2RlIjogIkhNT01OSSIsCiAgICAiY2xpZW50Q29kZSI6ICJITU9NTkkiLAogICAgIndhcmVob3VzZUNvZGUiOiAiSE1PTU5JIgogIH0sCiAgImxrdEJvZHkiOiBbCiAgICB7CiAgICAgICJkY2QiOiB7CiAgICAgICAgImhvc3QiOiAiMjExLjExMC4yMjkuMjM5IiwKICAgICAgICAidHlwZSI6ICJNWVNRTCIsCiAgICAgICAgInBvcnQiOiAiMzMwNiIsCiAgICAgICAgInVzZXJuYW1lIjogInNwYyIsCiAgICAgICAgInBhc3N3b3JkIjogIjEwMTBxcHFwITNNIiwKICAgICAgICAiZGF0YWJhc2UiOiAiTEtUIgogICAgICB9LAogICAgICAiaGNkIjogewogICAgICAgICJob3N0IjogIjEyNy4wLjAuMSIKICAgICAgfSwKICAgICAgIm1jZCI6IHsKICAgICAgICAiaG9zdCI6ICIxMjcuMC4wLjEiLAogICAgICAgICJwb3J0IjogIjE4ODMiLAogICAgICAgICJ1c2VybmFtZSI6ICJtYWVyc2siLAogICAgICAgICJwYXNzd29yZCI6ICJtYWVyc2sxMjMjQCEiLAogICAgICAgICJ0b3BpYyI6ICJtYWVyc2siCiAgICAgIH0KICAgIH0KICBdCn0=";

        lktStorage.setServerInfo(response.lktHeader);
      }
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

function checkSession() {
  if (Cookies.get("login") != "true") {
    window.location.href = "./login.html";
  }
}

function createMenu() {
  // menu.json을 로드하고 사이드 메뉴 생성
  $.getJSON("./src/data/menu.json?t=" + Date.now(), function (data) {
    try {
      let loginInfo = lktStorage.getLoginInfo();
      console.log("loadmenuinfo:", JSON.stringify(loginInfo));
      let menuInfo = loginInfo.lktOutDataDetail;
      let menuReal = [];
      for (let menuitm of menuInfo) {
        menuitm.title = menuitm.menuName;
        menuitm.submenus = menuitm.lktOutDataDetailChilds;
        for (let menuSub of menuitm.submenus) {
          menuSub.title = menuSub.menuName;
          menuSub.view = menuSub.menuUrl;
        }
      }
      menuReal = menuInfo;
      data.menuItems = menuReal;
    } catch (ex) {
      console.log("menuload error:", ex);
    }
    // 테스트시 주석

    // data.menuItems.push({

    // });

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

      //alert(view);
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
  const sideMenu = document.getElementById("sideMenu");
  const pinButton = document.getElementById("pinButton");

  let isPinned = false; // 메뉴 고정 여부

  // 마우스 오버 시 사이드메뉴 나타나기
  sideMenu.addEventListener("mouseover", function () {
    if (!isPinned) {
      sideMenu.classList.add("active");
      pinButton.style.visibility = "visible"; // 핀 버튼 보이기
    }
  });

  // 마우스 아웃 시 사이드메뉴 숨기기
  sideMenu.addEventListener("mouseout", function () {
    if (!isPinned) {
      sideMenu.classList.remove("active");
      pinButton.style.visibility = "hidden"; // 핀 버튼 숨기기
    }
  });

  // 핀 버튼 클릭 시 메뉴 고정/비고정 상태 전환
  pinButton.addEventListener("click", function () {
    isPinned = !isPinned;

    if (isPinned) {
      sideMenu.classList.add("active"); // 메뉴 고정
      pinButton.classList.add("pinned"); // 버튼 강조
      pinButton.style.opacity = 1; // 핀 버튼 투명도 제거
    } else {
      sideMenu.classList.remove("active"); // 메뉴 숨기기
      pinButton.classList.remove("pinned"); // 버튼 기본 상태
      pinButton.style.opacity = 0.5; // 핀 버튼 흐리게
    }
  });

  let devKey =
    "ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogIjBiNGNhZDEzLWI3ZmEtNDljOC05MjI5LWUxYTFjNGQ1ZTViNSIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjQxCn0=.TKB/YEgo0tLVriWAArXeOhJVDffyIw4Uhv5MjX3z5LfyVCgVpPbSHmboGvsUWPG+4tgBCJBnmXjxXykz/BIVD5oOV6ktWAsvC73UPAo+y+3XI+5csEjwUTJvZH0ysRBhWkbSCg==";
  DevExpress.config({licenseKey: devKey});

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

      window.location.href = "./login.html";
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
  //alert(view);
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
    error: function (error) {
      // alert(JSON.stringify(error));
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
