// $(document).ready(function () {
//   // menu.json을 로드하고 사이드 메뉴 생성
//   $.getJSON("./src/data/menu.json", function (data) {
//     let menuHtml = "<ul>";
//     data.menuItems.forEach(function (item) {
//       menuHtml += `<li class="menu-item">${item.title}<ul class="submenu">`;
//       item.submenus.forEach(function (submenu) {
//         menuHtml += `<li class="submenu-item" data-view="${submenu.view}">${submenu.title}</li>`;
//       });
//       menuHtml += "</ul></li>";
//     });
//     menuHtml += "</ul>";
//     $("#sideMenu").html(menuHtml);

//     // 서브메뉴 클릭 이벤트 처리
//     $(".submenu-item").click(function () {
//       let view = $(this).data("view");
//       let tabTitle = $(this).text();
//       addTab(tabTitle, view);
//     });
//   });

//   // 탭을 추가하고 콘텐츠를 로드하는 함수
//   function addTab(tabTitle, view) {
//     // 중복된 탭이 있는지 확인
//     if ($(`.tab[data-view="${view}"]`).length === 0) {
//       const tabHtml = `
//         <div class="tab" data-view="${view}">
//           ${tabTitle}
//           <span class="close-tab" onclick="removeTab('${view}')">x</span>
//         </div>
//       `;
//       $("#tabContainer").append(tabHtml);
//     }

//     // 탭 클릭 시 해당 HTML 파일 로드
//     loadContent(view);
//   }

//   // 콘텐츠 로드 함수
//   function loadContent(view) {
//     $.ajax({
//       url: `./src/views/${view}`,
//       method: "GET",
//       success: function (data) {
//         $("#mainContent").html(data); // 로드한 콘텐츠를 표시
//       },
//       error: function () {
//         $("#mainContent").html("Error loading content");
//       }
//     });
//   }

//   // 탭을 닫는 함수
//   function removeTab(view) {
//     $(`.tab[data-view="${view}"]`).remove();
//     $("#mainContent").html(""); // 탭을 닫으면 내용을 지웁니다.
//   }
// });

$(document).ready(function () {
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
    $(".submenu-item").click(function () {
      let view = $(this).data("view");
      let tabTitle = $(this).text();
      addTab(tabTitle, view);
    });
  });

  // 탭을 추가하고 콘텐츠를 로드하는 함수
  function addTab(tabTitle, view) {
    // 중복된 탭이 있는지 확인
    if ($(`.tab[data-view="${view}"]`).length === 0) {
      const tabHtml = `
        <div class="tab active" data-view="${view}">
          ${tabTitle}
          <span class="close-tab" onclick="removeTab('${view}')">x</span>
        </div>
      `;
      $("#tabContainer .tab").removeClass("active"); // 다른 탭의 활성화 상태 해제
      $("#tabContainer").append(tabHtml);
      loadContent(view);
    } else {
      // 이미 존재하는 탭을 클릭할 경우 해당 탭으로 전환
      $(".tab").removeClass("active");
      $(`.tab[data-view="${view}"]`).addClass("active");
      loadContent(view);
    }
  }

  // 콘텐츠 로드 함수
  function loadContent(view) {
    $.ajax({
      url: `./src/views/${view}`,
      method: "GET",
      success: function (data) {
        $("#mainContent").html(data); // 로드한 콘텐츠를 표시
      },
      error: function () {
        $("#mainContent").html("Error loading content");
      }
    });
  }

  // 탭을 닫는 함수
  window.removeTab = function (view) {
    const currentTab = $(`.tab[data-view="${view}"]`);
    const isActiveTab = currentTab.hasClass("active");

    currentTab.remove(); // 탭 삭제

    // 만약 삭제한 탭이 활성화된 탭이라면, 마지막 남은 탭으로 이동
    if (isActiveTab) {
      const lastTab = $("#tabContainer .tab").last();
      if (lastTab.length) {
        lastTab.addClass("active");
        const lastView = lastTab.data("view");
        loadContent(lastView); // 마지막 탭의 콘텐츠를 로드
      } else {
        $("#mainContent").html(""); // 남은 탭이 없으면 콘텐츠를 지움
      }
    }
  };
});
