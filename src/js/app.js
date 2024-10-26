// 각 화면의 모듈을 정의하는 객체
// const viewModules = {
//   "exec/execOrd": () => import("../views/exec/execOrd/execOrd.js"),
//   "exec/execEuc": () => import("../views/exec/execEuc/execEuc.js")
//   // 다른 화면에 대해 추가
// };

let moduleTarget = {};

// exec/execOrd/execOrd.html

$(document).ready(function () {
  const loadedTabs = {}; // 탭 로드 상태를 저장하는 객체

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
        "../views/" + view.replace(".html", ".js?timestamp=" + Date.now())
      );
      alert("../views/" + view.replace(".html", ".js"));
      moduleTarget = importedModule.default || importedModule;

      // 이미 로드된 탭인지 확인 (중복 방지)
      if (loadedTabs[view]) {
        // 탭 활성화만 하고 새로 로드하지 않음
        activateTab(view);
        moduleTarget.onActive();
      } else {
        // 탭이 로드되지 않았으면 로드 및 활성화
        addTab(tabTitle, view);
        loadedTabs[view] = true; // 탭 로드 상태 기록
      }

      //alert(execOrd);
      // execOrd.onActive();
    });
  });

  // 탭을 추가하고 콘텐츠를 로드하는 함수
  function addTab(tabTitle, view) {
    // 중복된 탭이 있는지 확인
    if ($(`.tab[data-view="${view}"]`).length === 0) {
      const tabHtml = `
        <div class="tab" data-view="${view}">
          ${tabTitle}
          <span class="close-tab" onclick="removeTab('${view}')">x</span>
        </div>
      `;
      $("#tabContainer").append(tabHtml);
    }

    // 탭 클릭 시 해당 HTML 파일 로드
    loadContent(view);
  }

  // 탭 활성화 함수
  function activateTab(view) {
    // 탭 및 콘텐츠를 활성화
    $(".tab").removeClass("active");
    $(`.tab[data-view="${view}"]`).addClass("active");
    loadContent(view); // 이미 로드된 탭의 내용을 보여줌
  }

  // 콘텐츠 로드 함수
  function loadContent(view) {
    $.ajax({
      url: `./src/views/${view}?timestamp=` + Date.now(),
      method: "GET",
      success: function (data) {
        $("#mainContent").html(data); // 로드한 콘텐츠를 표시
        moduleTarget.onCreate();
      },
      error: function () {
        $("#mainContent").html("Error loading content");
      }
    });
  }

  // 탭을 닫는 함수
  function removeTab(view) {
    $(`.tab[data-view="${view}"]`).remove();
    $("#mainContent").html(""); // 탭을 닫으면 내용을 지웁니다.
    delete loadedTabs[view]; // 탭 로드 상태 삭제
  }
});
