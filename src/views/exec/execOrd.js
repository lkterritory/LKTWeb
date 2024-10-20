//import apiWcs from "/src/js/apiWcs.js";

import apiWcs from "../../js/apiWcs.js";

$(function () {
  // DateBox - 출고일자 선택
  $("#workDateContainer").dxDateBox({
    type: "date",
    displayFormat: "yyyy-MM-dd",
    value: new Date(),
    width: "200px"
  });

  // SelectBox - 작업차수 선택
  $("#workBatchContainer").dxSelectBox({
    items: ["1차", "2차", "3차"],
    placeholder: "작업차수 선택",
    value: null,
    width: "200px"
  });

  // 버튼 이벤트 처리
  $(".dx-button").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      loadWorkOrderData();

      const buttonId = e.component.option("text");
      if (buttonId === "조회") {
        loadWorkOrderData();
      } else if (buttonId === "주문수신") {
        // 주문수신 로직
      } else if (buttonId === "작업계획") {
        // 작업계획 로직
      } else if (buttonId === "메뉴얼 변경") {
        // 메뉴얼 변경 로직
      } else if (buttonId === "작업지시") {
        // 작업지시 로직
      } else if (buttonId === "설비완료") {
        // 설비완료 로직
      } else if (buttonId === "일마감") {
        // 일마감 로직
      }
    },
    width: "100px"
  });

  // DataGrid - 작업지시 정보
  $("#workOrderGrid").dxDataGrid({
    dataSource: [], // 서버에서 데이터를 가져와서 할당
    columns: [
      {dataField: "workDate", caption: "작업일자"},
      {dataField: "workBatch", caption: "작업차수"},
      {dataField: "description", caption: "설명"},
      {dataField: "equipmentType", caption: "설비종류"},
      {dataField: "equipmentName", caption: "설비명"},
      {dataField: "totalOrderCount", caption: "주문건수"},
      {dataField: "totalSkuCount", caption: "상품건수"}
    ],
    showBorders: true,
    paging: {
      pageSize: 10
    },
    pager: {
      showPageSizeSelector: true,
      allowedPageSizes: [10, 25, 50],
      showInfo: true
    }
  });

  // 데이터 로드 함수
  function loadWorkOrderData() {
    apiWcs
      .operation({})
      .done(function (response) {
        // 로그인 성공 시 대시보드로 이동

        const sampleData = response.lktBody;
        $("#workOrderGrid")
          .dxDataGrid("instance")
          .option("dataSource", sampleData);
      })
      .fail(function () {
        // 에러 발생 시 처리
        alert("error");
        errorPopup.removeClass("hidden");
      });

    // 여기에 서버 API 콜을 통해 데이터를 가져오는 로직을 추가
    // const sampleData = [
    //   {
    //     workDate: "2024-10-16",
    //     workBatch: "1차",
    //     description: "설명1",
    //     equipmentType: "설비1",
    //     equipmentName: "설비명1",
    //     orderCount: 5,
    //     productCount: 20
    //   },
    //   {
    //     workDate: "2024-10-17",
    //     workBatch: "2차",
    //     description: "설명2",
    //     equipmentType: "설비2",
    //     equipmentName: "설비명2",
    //     orderCount: 10,
    //     productCount: 40
    //   }
    // ];

    // $("#workOrderGrid").dxDataGrid("instance").option("dataSource", sampleData);
  }
});
