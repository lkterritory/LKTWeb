$(document).ready(function () {
  // 사이드 메뉴 클릭 이벤트 처리
  $(".menu-item").click(function () {
    let view = $(this).data("view");
    loadContent(view);
  });

  // 콘텐츠 로드 함수
  function loadContent(view) {
    $.ajax({
      url: `./src/views/${view}`,
      method: "GET",
      success: function (data) {
        $("#mainContent").html(data); // 콘텐츠 표시
      },
      error: function () {
        $("#mainContent").html("Error loading content");
      }
    });
  }

  // 페이지네이션 버튼 클릭 이벤트 처리
  $("#prevBtn").click(function () {
    alert("PREV clicked");
  });

  $("#nextBtn").click(function () {
    alert("NEXT clicked");
  });

  // 내보내기 버튼 클릭 이벤트 처리
  $("#sendBtn").click(function () {
    alert("데이터를 내보냈습니다.");
  });
});
