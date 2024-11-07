let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;

const idPrefix = "#field-fieldKiosk-fieldKiosk ";

function onCreate() {
  // Progress Bar 설정
  $(idPrefix + "#progressBar").dxProgressBar({
    value: 91,
    min: 0,
    max: 100,
    showStatus: true,
    statusFormat: function (value) {
      return `${value}%`;
    }
  });

  // DevExtreme DataGrid 설정
  $(idPrefix + "#workOrderGrid").dxDataGrid({
    dataSource: [
      {
        순서: 178,
        상품코드: "520450",
        상품명: "반)딸기우유 마블쉬폰",
        바코드: "520450",
        주문수: 7,
        예상수: 9,
        확정수: 8,
        상태: "중단",
        진행상태: "피킹 명령"
      }
    ],
    columns: [
      {dataField: "순서", caption: "순서", width: 70},
      {dataField: "상품코드", caption: "상품코드", width: 100},
      {dataField: "상품명", caption: "상품명", width: 200},
      {dataField: "바코드", caption: "바코드", width: 100},
      {dataField: "주문수", caption: "주문수", width: 80},
      {dataField: "예상수", caption: "예상수", width: 80},
      {dataField: "확정수", caption: "확정수", width: 80},
      {dataField: "상태", caption: "상태", width: 100},
      {dataField: "진행상태", caption: "진행상태", width: 100}
    ],
    showBorders: true,
    paging: {
      pageSize: 10
    },
    pager: {
      showPageSizeSelector: true,
      allowedPageSizes: [10, 20, 50],
      showInfo: true
    }
  });
}

function onActive() {}

export default {
  onCreate,
  onActive
};
