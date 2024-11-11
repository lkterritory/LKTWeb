let moduleTarget = {};
let loadedTabs = {}; // 탭 로드 상태 및 콘텐츠를 저장하는 객체

function checkSession() {
  if (Cookies.get("login") != "true") {
    window.location.href = "./src/views/login/login.html";
  }
}

function createMenu() {
  // menu.json을 로드하고 사이드 메뉴 생성
  $.getJSON("./src/data/menu.json", function (data) {
    let menuHtml = "<ul>";
    data.menuItems.forEach(function (item) {
      menuHtml += `<li class="menu-item">${item.title}<ul class="submenu">`;
      item.submenus.forEach(function (submenu) {
        menuHtml += `<li class="submenu-item" data-view="${submenu.view}">${submenu.title}</li>`;
      });
      menuHtml += "</ul></li>";
    });
    menuHtml += "</ul>";
    $("#sideMenu").html(menuHtml);

    // 서브메뉴 클릭 이벤트 처리
    $(".submenu-item").click(async function () {
      let view = $(this).data("view");
      let tabTitle = $(this).text();

      const importedModule = await import(
        "../views/" + view.replace(".html", ".js?t=" + Date.now())
      );
      moduleTarget = importedModule.default || importedModule;

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
  checkSession();
  createMenu();
});

// 탭을 추가하는 함수
// function addTab(tabTitle, view) {
//   if ($(`.tab[data-view="${view}"]`).length === 0) {
//     $(".tab").removeClass("last").addClass("middle");

//     const tabHtml = `
//       <div class="tab" data-view="${view}" onclick="activateTab('${view}')">
//         ${tabTitle}
//         <span class="close-tab" onclick="removeTab('${view}'); event.stopPropagation();">x</span>
//       </div>
//     `;
//     $("#tabContainer").append(tabHtml);
//   }
// }

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
    },
    error: function () {
      $("#mainContent").html("Error loading content");
    }
  });
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
