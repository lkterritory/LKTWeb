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

const idPrefix = "#mast-mastLocation-mastLocation ";

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

  // "equipmentCode": "DAS-02",
  // "storageTemperatureCode": "RT",
  // "storageTemperatureName": "상온",
  // "indicatorCode": "94A718",
  // "storeCode": "KR0260",
  // "storeName": "KR0260",
  // "printConnectionAddress": "192.168.26.74",
  // "locationCode": "1L0116",
  // "locationName": "1L0116",
  // "stateCode": "01",
  // "stateName": "예"
  // DataGrid
  workOrderGrid = $(idPrefix + "#workOrderGrid")
    .dxDataGrid({
      dataSource: [], // 서버에서 데이터를 가져와서 할당
      columns: [
        {
          dataField: "equipmentCode",
          caption: "설비",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("설비"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "indicatorCode",
          caption: "표시기",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("표시기"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "printConnectionAddress",
          caption: "프린터",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("프린터"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "locationCode",
          caption: "로케이션",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("로케이션"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "storeCode",
          caption: "지점",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("지점"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "stateName",
          caption: "상태",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상태"); // 헤더 가운데 정렬
          }
        }

        // {
        //   dataField: "storageTemperatureCode",
        //   caption: "온도대 코드",
        //   headerCellTemplate: function (headerCell) {
        //     headerCell.css(headerCss).text("온도대 코드"); // 헤더 가운데 정렬
        //   }
        // },
        // {
        //   dataField: "storageTemperatureName",
        //   caption: "온도대",
        //   headerCellTemplate: function (headerCell) {
        //     headerCell.css(headerCss).text("온도대"); // 헤더 가운데 정렬
        //   }
        // }
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
        // alert(selectedRowData);
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
    .coresLocationGet(encoded)
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

function showPopup(isModi, row) {
  let formItems = [
    {
      dataField: "locationCode",
      label: {text: "로케이션"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.locationCode : ""
      }
    },
    {
      dataField: "equipmentCode",
      label: {text: "설비"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.equipmentCode : ""
      }
    },
    {
      dataField: "storageTemperatureCode",
      label: {text: "온도대 코드"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.storageTemperatureCode : ""
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
        displayExpr: "name",
        valueExpr: "id",
        value: row != null ? row.stateCode : "01",
        placeholder: "선택하세요", // 선택 안내 텍스트
        onValueChanged: function (e) {
          console.log("선택된 값:", e.value); // 선택된 id 값
        }
      }
    }
  ];

  // $(idPrefix + "#dynamicPopup")
  //   .dxPopup({
  //     title: isModi ? "로케이션 수정" : "로케이션 등록",
  //     visible: true,
  //     width: 400,
  //     height: 300,
  //     showCloseButton: true,
  //     contentTemplate: function (contentElement) {
  //       // 동적 폼 생성
  //       const formInstance = $("<div>")
  //         .appendTo(contentElement)
  //         .dxForm({
  //           formData: {},
  //           items: formItems
  //         })
  //         .dxForm("instance");

  //       $("<div>")
  //         .appendTo(contentElement)
  //         .dxButton({
  //           text: "실행",
  //           onClick: function () {
  //             const formData = formInstance.option("formData");
  //             var param = {
  //               lktHeader: lktUtil.getLktHeader("PAGE.LOCATION.GET"),
  //               lktBody: [
  //                 {
  //                   equipmentCode: formData.equipmentCode,
  //                   storageTemperatureCode: formData.storageTemperatureCode,
  //                   locationCode: formData.locationCode,

  //                   stateCode: formData.stateCode
  //                 }
  //               ]
  //             };

  //             if (isModi) {
  //               apiCommon
  //                 .coresLocationEdit(JSON.stringify(param))
  //                 .done(function (response) {})
  //                 .fail(function () {
  //                   errorPopup.removeClass("hidden");
  //                 });
  //             } else {
  //               apiCommon
  //                 .coresLocationAdd(JSON.stringify(param))
  //                 .done(function (response) {})
  //                 .fail(function () {});
  //             }

  //             $("#dynamicPopup").dxPopup("hide");
  //           }
  //         });

  //       $("<div>")
  //         .appendTo(contentElement)
  //         .dxButton({
  //           text: "취소",
  //           onClick: function () {
  //             $("#dynamicPopup").dxPopup("hide");
  //           }
  //         });
  //     }
  //   })
  //   .dxPopup("show");

  // 팝업 호출
  lktUtil.createDynamicPopup({
    title: isModi ? "로케이션 수정" : "로케이션 등록",
    isModi: isModi, // 수정 여부
    formItems: formItems, // 폼 구성
    onExecute: function (formData) {
      var param = {
        lktHeader: lktUtil.getLktHeader("PAGE.LOCATION.GET"),
        lktBody: [
          {
            equipmentCode: formData.equipmentCode,
            storageTemperatureCode: formData.storageTemperatureCode,
            locationCode: formData.locationCode,

            stateCode: formData.stateCode
          }
        ]
      };

      if (isModi) {
        apiCommon
          .coresLocationEdit(JSON.stringify(param))
          .done(function (response) {})
          .fail(function () {});
      } else {
        apiCommon
          .coresLocationAdd(JSON.stringify(param))
          .done(function (response) {})
          .fail(function () {});
      }

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
