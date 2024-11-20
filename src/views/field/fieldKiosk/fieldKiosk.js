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
let workOrderGrid;

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
    value: 0,
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
  workOrderGrid = $(idPrefix + "#workOrderGrid")
    .dxDataGrid({
      dataSource: [
        // {
        //   lktSequnce: 1,
        //   skuCode: "1242835001240008",
        //   skuName: "women skirt",
        //   skuBarcode: "0212713015164008",
        //   objectCount: 2,
        //   planQty: 15,
        //   pickQty: 0,
        //   remainingQty: 15,
        //   statusCode: "04",
        //   statusName: "0",
        //   planDtm: null,
        //   pickDtm: null
        // }
      ],
      columns: [
        {
          dataField: "lktSequnce",
          caption: "순서",
          width: 70,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("순서"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "skuCode",
          caption: "상품코드",
          width: 200,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상품코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "skuName",
          caption: "상품명",

          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상품명"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "skuBarcode",
          caption: "바코드",
          width: 200,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("바코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "objectCount",
          caption: "주문수",
          width: 80,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("주문수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "planQty",
          caption: "예상수",
          width: 80,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("예상수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "pickQty",
          caption: "확정수",
          width: 80,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("확정수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "remainingQty",
          caption: "미처리",
          width: 80,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("미처리"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "statusName",
          caption: "상태",
          width: 100,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상태"); // 헤더 가운데 정렬
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
    })
    .dxDataGrid("instance");

  searchList();
  searchList2();
}

function onActive() {}

function searchList() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.outbound.WCS.MIDDLE.CATEGORIES"),
    lktBody: [
      {
        equipmentCode: "DAS-01"
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .equipmentPicktolightStatus(encoded)
    .done(function (response) {
      try {
        let resBody = response.lktBody[0];

        // "processObjectCount": 25,
        //       "totalObjectCount": 0,
        //       "processSkuCount": 20,
        //       "totalSkuCount": 0,
        //       "processQuantity": 102,
        //       "totalQuantity": 0

        // 주문 값 설정
        document.querySelector(
          ".summary-item:nth-child(1) .current"
        ).textContent = resBody.processObjectCount; // 현재값
        document.querySelector(
          ".summary-item:nth-child(1) .total"
        ).textContent = resBody.totalObjectCount; // 총합값

        // 품목 값 설정
        document.querySelector(
          ".summary-item:nth-child(2) .current"
        ).textContent = resBody.processSkuCount; // 현재값
        document.querySelector(
          ".summary-item:nth-child(2) .total"
        ).textContent = resBody.totalSkuCount; // 총합값

        // PCS 값 설정
        document.querySelector(
          ".summary-item:nth-child(3) .current"
        ).textContent = resBody.processQuantity; // 현재값
        document.querySelector(
          ".summary-item:nth-child(3) .total"
        ).textContent = resBody.totalQuantity; // 총합값
      } catch (ex) {}
    })

    .fail(function () {});
}

function searchList2() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.outbound.WCS.MIDDLE.CATEGORIES"),
    lktBody: [
      {
        equipmentCode: "DAS-01"
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .equipmentPicktolightInput(encoded)
    .done(function (response) {
      try {
        workOrderGrid.option("dataSource", response.lktBody);
      } catch (ex) {}
    })

    .fail(function () {});
}

export default {
  onCreate,
  onActive
};
