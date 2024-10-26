// import apiWcs from "/src/js/apiWcs.js";

import apiWcs from "../../../js/api/apiWcs.js?a=1";

// 데이터 로드 함수
function loadWorkOrderData() {
  var obj = {
    lktHeader: {
      type: "REQUEST",
      call: "PAGE.OUTBOUNDS.WCS.ORDERS",
      status: 0,
      message: "",
      authentication:
        "eyJjZW50ZXJDb2RlIjoiTEtUIiwiY2xpZW50Q29kZSI6IkxLVCIsIndhcmVob3VzZUNvZGUiOiJMS1QiLCJkYXRhYmFzZSI6eyJzZXJ2ZXIiOiIyMTEuMTEwLjIyOS4yMzkiLCJwb3J0IjoiMzMwNiIsImRhdGFiYXNlIjoiTEtUIiwidXNlcm5hbWUiOiJzcGMiLCJwYXNzd29yZCI6IjEwMTBxcHFwITNNIiwgImF0dHJpYnV0ZTAxIjoiTVlTUUwifSwid2FzIjp7InNlcnZlciI6IjIxMS4xMTAuMjI5LjIzOSIsInBvcnQiOiIxNDMzIn0sIm1xdHQiOnsic2VydmVyIjoiMjExLjExMC4yMjkuMjM5IiwicG9ydCI6IjE0MzMiLCJ1c2VybmFtZSI6ImxrdDBkYmEwMF9sa3QwMCIsInBhc3N3b3JkIjoiZGxkbmR5ZCEzTSJ9fQ==",
      userName: "LKT",
      centerCode: "LKT",
      clientCode: "LKT",
      warehouseCode: "LKT"
    },
    lktBody: [
      {
        workDate: "2024-02-17"
      }
    ]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .wcsOperation(encoded)
    .done(function (response) {
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
}

function onCreate() {
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
      {dataField: "totalSkuCount", caption: "상품건수"},

      {dataField: "totalPlanQuantity", caption: "낱개수량"},

      {dataField: "totalWorkQuantity", caption: "작업낱개수량"},
      {dataField: "totalWorkSkuCount", caption: "작업품목수량"},
      {dataField: "totalPersnet", caption: "진행율"},

      {dataField: "statusName", caption: "상태"},

      {dataField: "addWho", caption: "지시자"},
      {dataField: "addDtm", caption: "지시일자"},

      {dataField: "modWho", caption: "완료자"},
      {dataField: "modDtm", caption: "완료일자"}
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

  loadWorkOrderData();
}

function onActive() {
  loadWorkOrderData();
}

export default {
  onCreate,
  onActive
};
