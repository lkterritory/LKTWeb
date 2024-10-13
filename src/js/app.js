let tabs = [];

function addTab(title, view) {
  // 이미 해당 탭이 있는지 확인
  if (!tabs.includes(view)) {
    tabs.push(view);

    // 새로운 탭 추가
    let tabHtml = `<div class="tab" data-view="${view}">${title} <span class="close-tab">X</span></div>`;
    $("#tabContainer").append(tabHtml);

    // 새로운 탭의 콘텐츠 로드
    loadContent(view);

    // 탭 닫기 이벤트 처리
    $(".close-tab").click(function () {
      let tabView = $(this).parent().data("view");
      closeTab(tabView);
    });
  }

  // 새로 열린 탭 활성화
  activateTab(view);
}

function activateTab(view) {
  $(".tab").removeClass("active");
  $(`.tab[data-view="${view}"]`).addClass("active");
  loadContent(view);
}

function closeTab(view) {
  tabs = tabs.filter((tab) => tab !== view);
  $(`.tab[data-view="${view}"]`).remove();
  $("#mainContent").empty();
  if (tabs.length > 0) {
    activateTab(tabs[tabs.length - 1]);
  }
}

function loadContent(view) {
  $("#mainContent").load(`./src/views/${view}`);
}
