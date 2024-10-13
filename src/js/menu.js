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
});
