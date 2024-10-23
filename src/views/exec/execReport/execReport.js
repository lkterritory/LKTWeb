$(document).ready(function () {
  // 왼쪽 그리드 설정
  $("#leftGrid").dxDataGrid({
    dataSource: [{list: "테스트1"}], // 데이터 소스 설정
    columns: [{dataField: "list", caption: "보고서 목록"}],
    showBorders: true,
    paging: {
      enabled: false // 페이지 기능 비활성화
    },
    onRowClick: function (e) {
      const selectedRowData = e.data;
      showDynamicPopup(selectedRowData);
    }
  });

  // 동적 입력란 팝업 함수
  function showDynamicPopup(rowData) {
    // 입력란 배열을 동적으로 생성
    const formItems = [
      {
        dataField: "completionDate",
        label: {text: "완료일자"},
        editorType: "dxDateBox",
        editorOptions: {
          displayFormat: "yyyy-MM-dd"
        }
      }
    ];

    // 팝업 생성
    $("#dynamicPopup")
      .dxPopup({
        title: rowData.title,
        visible: true,
        width: 400,
        height: 300,
        showCloseButton: true,
        contentTemplate: function (contentElement) {
          // 동적 폼 생성
          $("<div>").appendTo(contentElement).dxForm({
            formData: {},
            items: formItems
          });

          // 실행, 취소 버튼 추가
          $("<div>")
            .appendTo(contentElement)
            .dxButton({
              text: "실행",
              onClick: function () {
                alert("실행");
                $("#dynamicPopup").dxPopup("hide");
              }
            });

          $("<div>")
            .appendTo(contentElement)
            .dxButton({
              text: "취소",
              onClick: function () {
                $("#dynamicPopup").dxPopup("hide");
              }
            });
        }
      })
      .dxPopup("show");
  }

  // 오른쪽 그리드 설정
  $("#rightGrid").dxDataGrid({
    dataSource: [], // 데이터 소스 설정
    columns: [],
    showBorders: true,
    paging: {
      enabled: false // 페이지 기능 비활성화
    }
  });
});
