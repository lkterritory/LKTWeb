let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;

const idPrefix = "#field-fieldKiosk-fieldKiosk ";

let txtBoxSearch;

function onCreate() {
  txtBoxSearch = $(idPrefix + "#txtBoxBarcode")
    .dxTextBox({
      placeholder: "바코드",
      value: "",
      width: "200px",
      onValueChanged: function (e) {
        //console.log("입력된 값:", e.value);
      }
    })
    .dxTextBox("instance");

  // // Progress Bar 설정
  // $(idPrefix + "#progressBar").dxProgressBar({
  //   value: 91,
  //   min: 0,
  //   max: 100,
  //   showStatus: true,
  //   statusFormat: function (value) {
  //     return `<span class="centered-status">${value}%</span>`;
  //   }
  // });

  // Progress Bar 설정
  $(idPrefix + "#progressBar").dxProgressBar({
    value: 91,
    min: 0,
    max: 100,
    showStatus: true,
    statusFormat: function (value) {
      return `${value * 100}%`;
    },
    onContentReady: function (e) {
      const $element = e.element.find(".dx-progressbar-status");
      $element.css({
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -60%)",
        color: "#ffffff", // 텍스트 색상
        fontSize: "20px"
        // fontWeight: "bold"
      });
    }
  });

  let headerCss = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center"
  };

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
      {
        dataField: "순서",
        caption: "순서",
        width: 70,
        headerCellTemplate: function (headerCell) {
          headerCell.css(headerCss).text("순서"); // 헤더 가운데 정렬
        }
      },
      {
        dataField: "상품코드",
        caption: "상품코드",
        width: 100,
        headerCellTemplate: function (headerCell) {
          headerCell.css(headerCss).text("상품코드"); // 헤더 가운데 정렬
        }
      },
      {
        dataField: "상품명",
        caption: "상품명",
        width: 200,
        headerCellTemplate: function (headerCell) {
          headerCell.css(headerCss).text("상품명"); // 헤더 가운데 정렬
        }
      },
      {
        dataField: "바코드",
        caption: "바코드",
        width: 100,
        headerCellTemplate: function (headerCell) {
          headerCell.css(headerCss).text("바코드"); // 헤더 가운데 정렬
        }
      },
      {
        dataField: "주문수",
        caption: "주문수",
        width: 80,
        headerCellTemplate: function (headerCell) {
          headerCell.css(headerCss).text("주문수"); // 헤더 가운데 정렬
        }
      },
      {
        dataField: "예상수",
        caption: "예상수",
        width: 80,
        headerCellTemplate: function (headerCell) {
          headerCell.css(headerCss).text("예상수"); // 헤더 가운데 정렬
        }
      },
      {
        dataField: "확정수",
        caption: "확정수",
        width: 80,
        headerCellTemplate: function (headerCell) {
          headerCell.css(headerCss).text("확정수"); // 헤더 가운데 정렬
        }
      },
      {
        dataField: "상태",
        caption: "상태",
        width: 100,
        headerCellTemplate: function (headerCell) {
          headerCell.css(headerCss).text("상태"); // 헤더 가운데 정렬
        }
      },
      {
        dataField: "진행상태",
        caption: "진행상태",
        width: 100,
        headerCellTemplate: function (headerCell) {
          headerCell.css(headerCss).text("진행상태"); // 헤더 가운데 정렬
        }
      }
    ],
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
  });
}

function onActive() {}

export default {
  onCreate,
  onActive
};
