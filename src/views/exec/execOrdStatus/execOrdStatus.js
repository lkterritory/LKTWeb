let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;

const idPrefix = "#exec-execOrdStatus-execOrdStatus ";

let dtBoxWork;
let selBoxBatch;
let workOrderGrid;
let workOrderGridDetail;

function onCreate() {
  // DateBox - 출고일자 선택
  dtBoxWork = $(idPrefix + "#dtBoxWork")
    .dxDateBox({
      type: "date",
      displayFormat: "yyyy-MM-dd",
      value: new Date(),
      width: "200px",
      onValueChanged: function () {
        searchList();
      }
    })
    .dxDateBox("instance");
  //new Date(dtBoxWork.option("value")).toISOString().split("T")[0];

  // SelectBox - 작업차수 선택
  selBoxBatch = $(idPrefix + "#selBoxBatch")
    .dxSelectBox({
      items: [],
      displayExpr: "workBatch", // 화면에 표시할 항목
      valueExpr: "workBatch", // 선택된 값으로 사용할 항목
      placeholder: "작업차수 선택",
      value: null,
      width: "200px",
      onValueChanged: function (e) {
        console.log("선택된 값 ID:", e.value); // 선택된 ID 출력
        if (e.value) {
          searchList(); // 선택된 작업차수에 따라 데이터를 자동으로 조회
        }
      }
    })
    .dxSelectBox("instance");

  // 버튼 이벤트 처리
  $(idPrefix + "#btnSearch").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      searchList();
    },
    width: "100px"
  });

  let headerCss = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center"
  };
  // DataGrid
  workOrderGrid = $(idPrefix + "#workOrderGrid")
    .dxDataGrid({
      dataSource: [], // 서버에서 데이터를 가져와서 할당
      columns: [
        {
          dataField: "facilitiesCode",
          caption: "설비코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("설비코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "workDate",
          caption: "작업일자",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업일자"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "workBatch",
          caption: "작업차수",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업차수"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "orderNumber",
          caption: "주문번호",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("주문번호"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "toteBox",
          caption: "토트박스",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("토트박스"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "objeBox",
          caption: "박스번호",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("박스번호"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "printCode",
          caption: "프린트코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("프린트코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "sorterLabelCode",
          caption: "라벨코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("라벨코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "sorterCellCode",
          caption: "셀코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("셀코드"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "transportCode",
          caption: "배송코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("배송코드"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "totalPlanOrderCount",
          caption: "예정주문",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("예정주문"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "totalPlanSkuCount",
          caption: "예정상품",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("예정상품"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "totalPlanQuantity",
          caption: "예정수량",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("예정수량"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "totalWorkOrderCount",
          caption: "작업주문",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업주문"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "totalWorkSkuCount",
          caption: "작업상품",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업상품"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "totalWorkQuantity",
          caption: "작업수량",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업수량"); // 헤더 가운데 정렬
          }
        },
        // {dataField: "statusCode", caption: "설비코드"},
        {
          dataField: "statusName",
          caption: "상태",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상태"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "addDtm",
          caption: "지시일자",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("지시일자"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "modDtm",
          caption: "완료일자",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("완료일자"); // 헤더 가운데 정렬
          }
        }
      ],

      paging: {enabled: false},
      showBorders: true,
      scrolling: {
        mode: "standard" // or "virtual" | "infinite"
      },
      selection: {
        mode: "single"
      },
      columnAutoWidth: true,
      allowColumnResizing: true, // 컬럼 사이즈 조절 여부
      headerFilter: {
        visible: true // 헤더 필터 드롭다운을 표시
      },
      onRowClick: function (e) {
        const selectedRowData = e.data;
        searchListDetail(selectedRowData);
      }
    })
    .dxDataGrid("instance");

  workOrderGridDetail = $(idPrefix + "#workOrderGridDetail")
    .dxDataGrid({
      dataSource: [], // 서버에서 데이터를 가져와서 할당
      columns: [
        {
          dataField: "facilitiesCode",
          caption: "설비코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("설비코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "facilitiesName",
          caption: "설비명",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("설비명"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "workDate",
          caption: "작업일자",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업일자"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "workBatch",
          caption: "작업차수",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업차수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "orderNumber",
          caption: "주문번호",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("주문번호"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "skuCode",
          caption: "상품코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상품코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "skuName",
          caption: "상품명",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상품명"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "planQty",
          caption: "예정수량",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("예정수량"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "pickQty",
          caption: "작업수량",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업수량"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "tallyQty",
          caption: "검수수량",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("검수수량"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "statusName",
          caption: "상태",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상태"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "addDtm",
          caption: "지시일자",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("지시일자"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "modDtm",
          caption: "완료일자",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("완료일자"); // 헤더 가운데 정렬
          }
        }
      ],

      paging: {enabled: false},
      showBorders: true,
      scrolling: {
        mode: "standard" // or "virtual" | "infinite"
      },
      selection: {
        mode: "single"
      },
      columnAutoWidth: true,
      allowColumnResizing: true, // 컬럼 사이즈 조절 여부
      headerFilter: {
        visible: true // 헤더 필터 드롭다운을 표시
      }
    })
    .dxDataGrid("instance");

     searchList();
}

function onActive() {}

function searchList() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [
      {
        workDate: DevExpress.localization.formatDate(
          dtBoxWork.option("value"),
          "yyyy-MM-dd"
        ),
        workBatch: selBoxBatch.option("value")
      }
    ]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .statusOrders(encoded)
    .done(function (response) {
      try {
        let sampleData = response.lktBody;

        workOrderGrid.option("dataSource", sampleData);
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

function searchListDetail(row) {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [
      {
        workDate: row.workDate,
        workBatch: row.workBatch,
        orderNumber: row.orderNumber
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));
  apiWcs
    .statusOrderDetail(encoded)
    .done(function (response) {
      try {
        let sampleData = response.lktBody;

        workOrderGridDetail.option("dataSource", sampleData);
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

export default {
  onCreate,
  onActive
};
