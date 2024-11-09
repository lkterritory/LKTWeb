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

const idPrefix = "#mast-mastItem-mastItem ";

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
          dataField: "skuBarcode",
          caption: "상품바코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상품코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "boxInQty",
          caption: "입수량",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("입수량"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "storageTemperatureName",
          caption: "온도대",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("온도대"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "partName",
          caption: "파트명",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("파트명"); // 헤더 가운데 정렬
          }
        },

        // {
        //   dataField: "stateCode",
        //   caption: "상태",
        //   minWidth: 90,
        //   headerCellTemplate: function (headerCell) {
        //     headerCell.css(headerCss).text("상품코드"); // 헤더 가운데 정렬
        //   }
        // }

        {
          dataField: "stateName",
          caption: "사용유무",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("사용유무"); // 헤더 가운데 정렬
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
        showPopup(true, selectedRowData);
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
    .coresSkusGet(encoded)
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

function showPopup(isModi, row) {
  let formItems = [
    {
      dataField: "skuCode",
      label: {text: "싱품코드"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row.skuCode
      }
    },
    {
      dataField: "skuName",
      label: {text: "상품명"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row.skuName
      }
    },
    {
      dataField: "skuBarcode",
      label: {text: "바코드"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row.skuBarcode
      }
    },
    {
      dataField: "stateCode",
      label: {text: "사용유무"},
      editorType: "dxSelectBox",
      editorOptions: {
        items: [
          {id: "01", name: "사용"},
          {id: "00", name: "미사용"}
        ],
        displayExpr: "name", // 보여줄 텍스트
        valueExpr: "id", // 실제 값으로 사용할 필드
        value: row.stateCode, // 초기 선택값
        placeholder: "선택하세요", // 선택 안내 텍스트
        onValueChanged: function (e) {
          console.log("선택된 값:", e.value); // 선택된 id 값
        }
      }
    }
  ];

  $(idPrefix + "#dynamicPopup")
    .dxPopup({
      title: isModi ? "상품 수정" : "상품 등록",
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
              // 사용유무
              // 00, 01
              // 아니요, 예
              var param = {
                lktHeader: lktUtil.getLktHeader("PAGE.POST.CORES.SKUS"),
                lktBody: [
                  {
                    skuCode: formData.skuCode,
                    skuName: formData.skuName,
                    skuBarcode: formData.skuBarcode,
                    stateCode: formData.stateCode
                  }
                ]
              };

              apiCommon
                .coresSkusEdit(JSON.stringify(param))
                .done(function (response) {
                  let sampleData = response.lktBody;

                  workOrderGrid.option("dataSource", sampleData);
                })
                .fail(function () {
                  // 에러 발생 시 처리
                  alert("error");
                  errorPopup.removeClass("hidden");
                });

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
