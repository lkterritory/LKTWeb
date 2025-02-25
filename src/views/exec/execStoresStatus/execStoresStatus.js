let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;

const idPrefix = "#exec-execStoresStatus-execStoresStatus ";

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
      onValueChanged: function (e) {
        searchConditions();
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
      searchConditions();
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
          dataField: "equipmentCode",
          caption: "설비 호기",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("설비 호기"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "storeCode",
          caption: "지점코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("지점코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "totalInterfaceReferenceCount",
          caption: "IDB",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("IDB"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "totalSkuCount",
          caption: "상품 갯수",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상품 갯수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "totalLabelCount",
          caption: "라벨 갯수",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("라벨 갯수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "totalQuantity",
          caption: "예정량",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("예정량"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "processQuantity",
          caption: "확정량",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("확정량"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "statusName",
          caption: "상태",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상태"); // 헤더 가운데 정렬
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
          dataField: "storeCode",
          caption: "지점코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("지점코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "interfaceReferenceNumber",
          caption: "IDB",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("IDB"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "serialShippingContainerCode",
          caption: "SSCC",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("SSCC"); // 헤더 가운데 정렬
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
          dataField: "labelCode",
          caption: "라벨코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("라벨코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "planQuantity",
          caption: "예정량",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("예정량"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "pickingQunatity",
          caption: "확정량",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("확정량"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "statusName",
          caption: "상태",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상태"); // 헤더 가운데 정렬
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
    searchConditions(); 
}



function searchList() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("OUTBOUND.STATUS.STORE"),
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
    .statusStores(encoded)
    .done(function (response) {
      try {
        // response.lktBody = [
        //   {
        //     "equipmentType": "DAS",
        //     "workDate": "2025-02-24",
        //     "workBatch": "2000002948",
        //     "equipmentCode": "DAS-1",
        //     "storeCode": "KR0500",
        //     "totalOrderCount": 2,
        //     "totalInterfaceReferenceCount": 2,
        //     "totalSkuCount": 1,
        //     "totalLabelCount": 2,
        //     "totalQuantity": 1,
        //     "processQuantity": 2,
        //     "statusCode": "01",
        //     "statusName": "작업중"
        //   },
        //   {
        //     "equipmentType": "DAS",
        //     "workDate": "2025-02-24",
        //     "workBatch": "2000002949",
        //     "equipmentCode": "DAS-2",
        //     "storeCode": "KR0501",
        //     "totalOrderCount": 2,
        //     "totalInterfaceReferenceCount": 2,
        //     "totalSkuCount": 1,
        //     "totalLabelCount": 2,
        //     "totalQuantity": 1,
        //     "processQuantity": 2,
        //     "statusCode": "01",
        //     "statusName": "작업중"
        //   }
        // ]
        let storesData = response.lktBody;
        console.log(storesData)
        workOrderGrid.option("dataSource", storesData);
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

function searchListDetail(row) {
  var obj = {
    lktHeader: lktUtil.getLktHeader("OUTBOUND.STATUS.STORE.DETAIL"),
    lktBody: [
      {
        workDate: row.workDate,
        workBatch: row.workBatch,
        storeCode: row.storeCode
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));
  apiWcs
    .statusStoresDetail(encoded)
    .done(function (response) {
      try {
        // response.lktBody = [
        //   {
        //     "equipmentType": "DAS",
        //     "workDate": "2025-02-24",
        //     "workBatch": "2000002948",
        //     "equipmentCode": "DAS-1",
        //     "storeCode": "KR0500",
        //     "interfaceReferenceNumber": "ABC",
        //     "serialShippingContainerCode": "1234",
        //     "skuCode": "12345",
        //     "labelCode": "12222",
        //     "skuCode": "상품코드",
        //     "skuName": "상품명",
        //     "planQuantity": 30,
        //     "pickingQunatity": 30,
        //     "statusCode": "10",
        //     "statusName": "피킹완료"
        //   }
        // ]
        let storeDetailData = response.lktBody;
        console.log(storeDetailData)
        workOrderGridDetail.option("dataSource", storeDetailData);
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}
function searchConditions() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [
      {
        workDate: DevExpress.localization.formatDate(
          dtBoxWork.option("value"),
          "yyyy-MM-dd"
        )
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));
  apiWcs
    .workbatch(encoded)
    .done(function (response) {
      try {
        selBoxBatch.option("items", response.lktBody);
      } catch (ex) {}
    })
    .fail(function () {});
}

function onActive() {}

export default {
  onCreate,
  onActive
};
