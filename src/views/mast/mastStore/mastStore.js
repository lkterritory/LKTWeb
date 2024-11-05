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

const idPrefix = "#mast-mastStore-mastStore ";

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
          dataField: "equipmentType",
          caption: "로케이션",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("로케이션"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "locationCode",
          caption: "매장코드",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("로케이션코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "locationCode",
          caption: "매장명",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("로케이션명"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "locationName",
          caption: "등록일",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("등록일"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "locationName",
          caption: "등록자",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("등록자"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "locationName",
          caption: "수정일",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("수정일"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "locationName",
          caption: "수정자",
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
        //alert("??");
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
      let sampleData = response.lktBody;

      workOrderGrid.option("dataSource", sampleData);
    })
    .fail(function () {
      // 에러 발생 시 처리
      alert("error");
      errorPopup.removeClass("hidden");
    });
}

function showPopup(isModi) {
  let formItems = [
    {
      dataField: "skuCode",
      label: {text: "지점코드"},
      editorType: "dxTextBox",
      editorOptions: {
        value: ""
      }
    },
    {
      dataField: "skuName",
      label: {text: "지점명"},
      editorType: "dxTextBox",
      editorOptions: {
        value: ""
      }
    },
    {
      dataField: "skuBarcode",
      label: {text: "로케이션"},
      editorType: "dxTextBox",
      editorOptions: {
        value: ""
      }
    }
  ];

  $(idPrefix + "#dynamicPopup")
    .dxPopup({
      title: isModi ? "지점 수정" : "지점 등록",
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
}

export default {
  onCreate,
  onActive
};
