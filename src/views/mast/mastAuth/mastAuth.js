let apiCommon;
let lktUtil;

if (!window.apiCommonModule || !window.lktUtilModule) {
  window.apiCommonModule = import(
    `../../../js/api/apiCommon.js?t=${Date.now()}`
  );
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiCommon = (await window.apiCommonModule).default;
lktUtil = (await window.lktUtilModule).default;

const idPrefix = "#mast-mastAuth-mastAuth ";

let txtBoxSearch;
let workOrderGrid;

function onCreate() {
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

  $(idPrefix + "#btnAdd").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      showPopup(false);
    },
    width: "100px"
  });

  $(idPrefix + "#btnDel").dxButton({
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
          caption: "권한코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("권한코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "workDate",
          caption: "권한명",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("권한명"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "workBatch",
          caption: "상태명",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상태명"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "orderNumber",
          caption: "등록일",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("등록일"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "toteBox",
          caption: "등록자",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("등록자"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "objeBox",
          caption: "수정일",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("수정일"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "printCode",
          caption: "수정자",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("수정자"); // 헤더 가운데 정렬
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
      }
    })
    .dxDataGrid("instance");
}

function onActive() {}

function searchList() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [
      {
        value: txtBoxSearch.option("value")
      }
    ]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiCommon
    .coresAuthGet(encoded)
    .done(function (response) {
      try {
        let sampleData = response.lktBody;

        workOrderGrid.option("dataSource", sampleData);
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리

      errorPopup.removeClass("hidden");
    });
}

function showPopup(isModi) {
  let formItems = [
    {
      dataField: "skuCode",
      label: {text: "권한코드"},
      editorType: "dxTextBox",
      editorOptions: {
        value: ""
      }
    },
    {
      dataField: "skuName",
      label: {text: "권한명"},
      editorType: "dxTextBox",
      editorOptions: {
        value: ""
      }
    }
  ];

  $("#dynamicPopup")
    .dxPopup({
      title: isModi ? "권한 수정" : "권한 등록",
      visible: true,
      width: 400,
      height: 300,
      showCloseButton: true,
      contentTemplate: function (contentElement) {
        // 동적 폼 생성
        const formInstance = $("<div>")
          .appendTo(contentElement)
          .dxForm({
            formData: {},
            items: formItems
          })
          .dxForm("instance");

        $("<div>")
          .appendTo(contentElement)
          .dxButton({
            text: "실행",
            onClick: function () {
              const formData = formInstance.option("formData");

              var param = {
                lktHeader: lktUtil.getLktHeader("PAGE.POST.CORES.SKUS"),
                lktBody: [
                  {
                    skuCode: formData.skuCode,
                    skuName: formData.skuName,
                    skuBarcode: formData.skuBarcode,
                    statusCode: "01"
                  }
                ]
              };

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

  // 팝업 호출
  lktUtil.createDynamicPopup({
    title: isModi ? "권한 수정" : "권한 등록",
    isModi: isModi, // 수정 여부
    formItems: formItems, // 폼 구성
    onExecute: function (formData) {
      var param = {
        lktHeader: lktUtil.getLktHeader("PAGE.POST.CORES.SKUS"),
        lktBody: [
          {
            skuCode: formData.skuCode,
            skuName: formData.skuName,
            skuBarcode: formData.skuBarcode,
            statusCode: "01"
          }
        ]
      };

      $("#dynamicPopup").dxPopup("hide");
    },
    onCancel: function () {
      // 취소 버튼 클릭 이벤트 처리
      $("#dynamicPopup").dxPopup("hide");
    }
  });
}

export default {
  onCreate,
  onActive
};
