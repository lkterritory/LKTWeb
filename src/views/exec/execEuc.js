$(document).ready(function () {
  // 왼쪽 그리드에 데이터를 로드
  $("#leftGrid").dxDataGrid({
    dataSource: [
      {name: "피킹 리스트 목록(연락처)"},
      {name: "미작업 피킹 리스트 목록"},
      {name: "피킹 리스트 목록"}
    ],
    columns: ["name"],
    showBorders: true,
    onRowClick: function (e) {
      // 클릭한 항목에 따라 오른쪽 그리드의 데이터를 로드
      loadRightGrid(e.data.name);
    }
  });

  // 오른쪽 그리드 로드 함수
  function loadRightGrid(type) {
    let dataSource = [];
    if (type === "피킹 리스트 목록(연락처)") {
      dataSource = [{field1: "연락처1"}, {field1: "연락처2"}];
    } else if (type === "미작업 피킹 리스트 목록") {
      dataSource = [{field1: "미작업1"}, {field1: "미작업2"}];
    } else {
      dataSource = [{field1: "리스트1"}, {field1: "리스트2"}];
    }

    $("#rightGrid").dxDataGrid({
      dataSource: dataSource,
      columns: ["field1"],
      showBorders: true
    });
  }

  // 페이지네이션 및 내보내기 버튼 기능 추가
  $("#prevButton").on("click", function () {
    alert("이전 페이지");
  });

  $("#nextButton").on("click", function () {
    alert("다음 페이지");
  });

  $("#exportButton").on("click", function () {
    alert("내보내기 기능");
  });
});
