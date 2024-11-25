let apiWcs;
let apiCommon;
let lktUtil;

import zebra from "../../../scripts/utils/printer/zebra/index.js?a=1";

if (!window.apiWcsModule || !window.lktUtilModule || !window.apiCommonModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
  window.apiCommonModule = import(
    `../../../js/api/apiCommon.js?t=${Date.now()}`
  );
}

apiWcs = (await window.apiWcsModule).default;
apiCommon = (await window.apiCommonModule).default;
lktUtil = (await window.lktUtilModule).default;

const idPrefix = "#exec-execReprint-execReprint ";

let txtBoxSearch;
let workOrderGrid;

let selBoxBatch;
let dtBoxWork;

let dvList = [];

function searchConditions() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [
      {
        workDate: dtBoxWork.option("value").toISOString().split("T")[0]
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

function onCreate() {
  zebra.setup();

  // DateBox - 출고일자 선택
  dtBoxWork = $(idPrefix + "#dtBoxWork")
    .dxDateBox({
      type: "date",
      displayFormat: "yyyy-MM-dd",
      value: new Date(),
      width: "200px"
    })
    .dxDateBox("instance");

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
      }
    })
    .dxSelectBox("instance");

  txtBoxSearch = $(idPrefix + "#txtBoxSearch")
    .dxTextBox({
      placeholder: "검색",
      value: "",
      width: "200px",
      onValueChanged: function (e) {
        //console.log("입력된 값:", e.value);
      }
    })
    .dxTextBox("instance");

  // 버튼 이벤트 처리
  $(idPrefix + "#btnSearch").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      searchList();
    },
    width: "100px"
  });

  $(idPrefix + "#btnReprint").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      // lktOutData.centerCode = value.CENTER_CODE;
      // lktOutData.clientCode = value.CLIENT_CODE;
      // lktOutData.warehouseCode = value.WAREHOUSE_CODE;
      // lktOutData.workDate = value.WORK_DATE;
      // lktOutData.workBatch = value.WORK_BATCH;
      // lktOutData.workAuxiliaryBatch = value.WORK_AUXILIARY_BATCH;
      // lktOutData.orderNumber = value.ORDER_NUMBER;
      // lktOutData.labelNumber = value.LABEL_NUMBER;
      // lktOutData.labelZpl = value.LABEL_ZPL;
      // lktOutData.labelConnectionAddress = value.LABEL_CONNECTION_ADDRESS;

      const rowData = workOrderGrid.getSelectedRowsData();

      if (rowData.length == 0) return;
      //alert(rowData);
      console.log(
        "reprint:" +
          rowData[0].labelConnectionAddress +
          "\r\n" +
          rowData[0].labelZpl
      );
      zebra.writeToSelectedPrinter(
        rowData[0].labelConnectionAddress,
        rowData[0].labelZpl
      );
    },
    width: "100px"
  });

  let headerCss = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center"
  };

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
          dataField: "orderNumber",
          caption: "주문번호",
          // minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("주문번호"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "labelNumber",
          caption: "라벨번호",
          // minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("라벨번호"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "labelConnectionAddress",
          caption: "프린터IP",
          // minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("프린터IP"); // 헤더 가운데 정렬
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

        //alert(JSON.stringify(selectedRowData));
        //showPopup(true, selectedRowData);
      }
    })
    .dxDataGrid("instance");

  searchConditions();

  setInterval(() => {
    zebra.setup();
    dvList = zebra.getDeviceList();
    console.log("printList:" + dvList);
  }, 5000); // 5초에 한번
}

function onActive() {}

function searchList() {
  // workDate: "",
  // workBatch: "",
  // inputValue: "",

  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [
      {
        workDate: dtBoxWork.option("value").toISOString().split("T")[0],
        workBatch: selBoxBatch.option("value")
          ? selBoxBatch.option("value")
          : "",
        inputValue: txtBoxSearch.option("value")
      }
    ]
  };

  var encoded = btoa(JSON.stringify(obj));

  // let tmpp = {};
  // tmpp.workDate = "workDate";
  // tmpp.workBatch = "workBatch";
  // tmpp.workAuxiliaryBatch = "workAuxiliaryBatch";
  // tmpp.orderNumber = "orderNumber";
  // tmpp.labelNumber = "labelNumber";
  // tmpp.labelZpl = "labelZpl";
  // tmpp.labelConnectionAddress = "labelConnectionAddress";

  // workOrderGrid.option("dataSource", [tmpp]);

  apiWcs
    .statusLabels(encoded)
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

export default {
  onCreate,
  onActive
};
