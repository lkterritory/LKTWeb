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

let intervalList = null;

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

window.onClickReprintPrint = function () {
  zebra.setup();

  $(".printstate").css({
    color: "red", // 텍스트 색상
    fontWeight: "bold" // 텍스트 굵게
  });
};

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

  // 버튼 일괄 출력 처리
  $(idPrefix + "#btnBatchLabel").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      searchBatchListCount();
    },
    width: "100px"
  });

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
      //if (dvList.length <= 0) return;
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

  intervalList = setInterval(() => {
    dvList = zebra.getDeviceList();
    console.log("printList:" + dvList);

    if (dvList.length > 0)
      $(".printstate").css({
        color: "green", // 텍스트 색상
        fontWeight: "bold" // 텍스트 굵게
      });
    else
      $(".printstate").css({
        color: "red", // 텍스트 색상
        fontWeight: "bold" // 텍스트 굵게
      });
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
        workDate: DevExpress.localization.formatDate(
          dtBoxWork.option("value"),
          "yyyy-MM-dd"
        ),
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

function searchBatchListCount() {
  // 테스트 수량

  // const filteredData = [
  //   {storeCode: "KR0001", labelCount: "100"},
  //   {storeCode: "KR0002", labelCount: "1000"}
  // ];

  // for (let i = 0; i < 30; i++) {
  //   filteredData.push({storeCode: "KR0001", labelCount: i + ""});
  // }

  // showPopup(filteredData);
  // return;

  // 테스트 종료

  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: []
  };

  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .statusLabelsPrintCount(encoded)
    .done(function (response) {
      try {
        showPopup(response.lktBody);
      } catch (ex) {
        console.error(ex);
      }
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

function searchBatchList(aRow, param2) {
  //  테스트 시작

  // let intervalId;
  // console.log(JSON.stringify(aRow) + ":" + param2);
  // try {
  //   let nIdx = 0;

  //   intervalId = setInterval(() => {
  //     console.log(
  //       "batchprint:" +
  //         aRow[nIdx].labelConnectionAddress +
  //         "\r\n" +
  //         aRow[nIdx].labelZpl
  //     );
  //     zebra.writeToSelectedPrinter(
  //       aRow[nIdx].labelConnectionAddress,
  //       aRow[nIdx].labelZpl
  //     );

  //     alert(JSON.stringify(aRow[0]));
  //     searchBatchListOK(aRow[0]);
  //     nIdx++;
  //     if (nIdx >= response.lktBody.length) {
  //       clearInterval(intervalId); // 반복 종료
  //     }
  //   }, 200);
  // } catch (ex) {
  //   clearInterval(intervalId);
  //   console.error(ex);
  // }
  // return;

  // 테스트 종료

  // [{"storeCode":"KR0001","labelCount":"3"}]:3
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [
      {
        storeCode: aRow[0].storeCode,
        printCount: param2
      }
    ]
  };

  //  alert(JSON.stringify(obj));

  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .statusLabelsPrint(encoded)
    .done(function (response) {
      let intervalId;
      try {
        if (response.lktBody.length > 0) {
          let rowData = response.lktBody;
          //let cntAll = response.lktBody.length;
          let nIdx = 0;

          intervalId = setInterval(() => {
            console.log(
              "batchprint:" +
                rowData[nIdx].labelConnectionAddress +
                "\r\n" +
                rowData[nIdx].labelZpl
            );
            zebra.writeToSelectedPrinter(
              rowData[nIdx].labelConnectionAddress,
              rowData[nIdx].labelZpl
            );

            searchBatchListOK(rowData[0]);
            nIdx++;
            // if (nIdx >= response.lktBody.length) {
            if (nIdx >= param2) {
              clearInterval(intervalId); // 반복 종료
            }
          }, 200);
        }
      } catch (ex) {
        clearInterval(intervalId); // 반복 종료
        console.error(ex);
      }
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

function searchBatchListOK(aRow) {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [
      {
        labelNumber: aRow.labelNumber,
        storeCode: aRow.storeCode
      }
    ]
  };

  apiWcs
    .statusLabelsPrintPatch(JSON.stringify(obj))
    .done(function (response) {
      try {
        if (response.lktBody.length > 0) {
        }
      } catch (ex) {
        console.error(ex);
      }
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

// onRowClick: function (e) {
//   const selectedRowData = e.data;
//   // alert(selectedRowData);
//   showPopup(true, selectedRowData);
// }
function showPopup(aData) {
  const dataGrid = aData;

  // 팝업 호출
  lktUtil.createGridPopup({
    title: "라벨일괄출력",
    gridDataSource: dataGrid, // 초기 데이터

    onSearch: function (searchText, gridInstance) {
      console.log("조회된 검색어:", searchText);
      if (!searchText) searchText = "";

      // 예제: 조회 데이터를 그리드에 업데이트d
      let filteredData = dataGrid.filter((item) =>
        item.storeCode.includes(searchText)
      );

      gridInstance.option("dataSource", filteredData);
      // gridInstance.option("onRowClick", function (e) {
      //   console.log("Row clicked:", e.data); // 클릭한 행의 데이터
      //   alert("Row data: " + JSON.stringify(e.data));
      // });
    },
    onExecute: function (formData, param2) {
      if (formData.length <= 0) return;
      // alert(JSON.stringify(formData));

      $("#dynamicPopup").dxPopup("hide");
      //alert(JSON.stringify(formData));
      searchBatchList(formData, param2);
    }
  });
}

function fetchGridData(equipmentCode) {
  // 여기서 실제 데이터를 가져오는 로직 작성
  return [
    {id: 1, name: "Item 1", status: "Available"},
    {id: 2, name: "Item 2", status: "Unavailable"},
    {id: 3, name: "Item 3", status: "Available"}
  ];
}

function onDestroy() {
  // alert("dest");

  if (intervalList) {
    clearInterval(intervalList);
    intervalList = null;
  }
}

export default {
  onCreate,
  onActive,
  onDestroy
};
