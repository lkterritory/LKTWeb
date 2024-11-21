let apiWcs;
let apiCommon;
let lktUtil;

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

let dtBoxWork;
let selBoxBatch;
let workOrderGrid;

const idPrefix = "#exec-execOrd-execOrd ";

function onCreate() {
  // DateBox - 출고일자 선택
  dtBoxWork = $(idPrefix + "#dtBoxWork")
    .dxDateBox({
      type: "date",
      displayFormat: "yyyy-MM-dd",
      value: new Date(),
      width: "200px",
      onValueChanged: function (e) {
        //alert(e.value.toISOString());
        console.log("새로운 날짜 값:", e.value); // 변경된 값 출력

        searchConditions();
      }
    })
    .dxDateBox("instance");
  //new Date(dtBoxWork.option("value")).toISOString().split("T")[0];

  // SelectBox - 작업차수 선택
  selBoxBatch = $(idPrefix + "#selBoxBatch")
    .dxSelectBox({
      items: [
        {workBatch: "1차", workBatch: "1차"},
        {workBatch: "1차", workBatch: "2차"},
        {workBatch: "2차", workBatch: "3차"}
      ],
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

  // 버튼 이벤트 처리
  $(idPrefix + ".dx-button").dxButton({
    width: "100px",
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      let rowSel = workOrderGrid.getSelectedRowsData();

      //alert(JSON.stringify(rowSel));
      // return;

      const buttonId = $(e.element).data("id");

      if (buttonId === "조회") {
        searchList();
      } else if (buttonId === "계획생성") {
        // 계획생성
        var obj = {
          lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.RDERS"),
          lktBody: [
            {
              workDate: new Date(dtBoxWork.option("value"))
                .toISOString()
                .split("T")[0],
              workBatch: rowSel[0].workBatch
            }
          ]
        };

        apiWcs
          .wcsOperationPlan(JSON.stringify(obj))
          .done(function (response) {
            // if (response.lktHeader.resultCode != "200") {
            //   $("#networkPopup")
            //     .dxPopup({
            //       title:
            //         response.lktHeader.resultCode +
            //         "\r\n" +
            //         response.lktHeader.resultMessage,
            //       visible: true,
            //       width: 300,
            //       height: 100,
            //       contentTemplate: function (contentElement) {
            //         const formInstance = $("<div>")
            //           .appendTo(contentElement)
            //           .dxForm({
            //             formData: {},
            //             items: []
            //           })
            //           .dxForm("instance");
            //       }
            //     })
            //     .dxPopup("show");
            // }
          })
          .fail(function () {
            // 에러 발생 시 처리

            errorPopup.removeClass("hidden");
          });
      } else if (buttonId === "작업시작") {
        // 작업시작
        var obj = {
          lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
          lktBody: [
            {
              workDate: new Date(dtBoxWork.option("value"))
                .toISOString()
                .split("T")[0],
              workBatch: rowSel[0].workBatch
            }
          ]
        };

        apiWcs
          .wcsOperationStart(JSON.stringify(obj))
          .done(function (response) {
            try {
              const sampleData = response.lktBody;
            } catch (ex) {}
          })
          .fail(function () {
            // 에러 발생 시 처리
          });
      } else if (buttonId === "차수 작업완료") {
        // 차수 작업완료

        var obj = {
          lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
          lktBody: [
            {
              workDate: new Date(dtBoxWork.option("value"))
                .toISOString()
                .split("T")[0],
              workBatch: rowSel[0].workBatch
            }
          ]
        };

        apiWcs
          .wcsOperationcCompleted(JSON.stringify(obj))
          .done(function (response) {})
          .fail(function () {
            // 에러 발생 시 처리

            errorPopup.removeClass("hidden");
          });
      } else if (buttonId === "전체 작업완료") {
        //전체 작업완료
        var obj = {
          lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
          lktBody: [
            {
              workDate: new Date(dtBoxWork.option("value"))
                .toISOString()
                .split("T")[0]
            }
          ]
        };

        apiWcs
          .wcsOperationcClosing(JSON.stringify(obj))
          .done(function (response) {
            try {
              const sampleData = response.lktBody;
            } catch (ex) {}
          })
          .fail(function () {
            // 에러 발생 시 처리

            errorPopup.removeClass("hidden");
          });
      } else if (buttonId === "작업취소") {
        // 작업취소
        var obj = {
          lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
          lktBody: [
            {
              workDate: new Date(dtBoxWork.option("value"))
                .toISOString()
                .split("T")[0],
              workBatch: rowSel[0].workBatch
            }
          ]
        };

        apiWcs
          .wcsOperationcCancel(JSON.stringify(obj))
          .done(function (response) {
            try {
              const sampleData = response.lktBody;
            } catch (ex) {}
          })
          .fail(function () {
            // 에러 발생 시 처리

            errorPopup.removeClass("hidden");
          });
      }
    }
  });

  let headerCss = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center"
  };
  // DataGrid - 작업지시 정보
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
          dataField: "equipmentType",
          caption: "설비종류",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("설비종류"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "equipmentName",
          caption: "설비명",
          minWidth: 90,

          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("설비명"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "totalOrderCount",
          caption: "주문건수",
          allowFiltering: false,
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("주문건수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "totalSkuCount",
          caption: "상품건수",
          allowFiltering: false,
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상품건수"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "totalPlanQuantity",
          caption: "낱개수량",
          allowFiltering: false,
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("낱개수량"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "totalWorkQuantity",
          caption: "작업낱개수량",
          allowFiltering: false,
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업낱개수량"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "totalWorkSkuCount",
          caption: "작업품목수량",
          allowFiltering: false,
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업품목수량"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "totalPersnet",
          caption: "진행율",
          allowFiltering: false,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("진행율"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "statusName",
          caption: "상태",

          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상태"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "addWho",
          caption: "지시자",

          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("지시자"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "addDtm",
          caption: "지시일자",
          allowFiltering: false,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("지시일자"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "modWho",
          caption: "완료자",

          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("완료자"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "modDtm",
          caption: "완료일자",
          allowFiltering: false,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("완료일자"); // 헤더 가운데 정렬
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

  searchConditions();
  // searchConditions2();

  // searchConditionsCode("EQUIPMENT_TYPE");
  // searchConditionsCode("STORAGE_TEMPERATURE");
  // searchConditionsCode("USE_STATE_CODE");

  // searchConditionsAuth();
  // searchConditionsMenu();
} // end oncreate

function onActive() {}

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

function searchConditions2() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [{equipmentType: "DAS"}]
  };
  var encoded = btoa(JSON.stringify(obj));
  apiCommon
    .equipmentSummary(encoded)
    .done(function (response) {
      // $(idPrefix + "#workOrderGrid")
      //   .dxDataGrid("instance")
      //   .option("dataSource", sampleData);
    })
    .fail(function () {});
}

// EQUIPMENT_TYPE, STORAGE_TEMPERATURE, USE_STATE_CODE
function searchConditionsCode(aMasterCode) {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [{masterCode: aMasterCode}]
  };
  var encoded = btoa(JSON.stringify(obj));
  apiCommon
    .code(encoded)
    .done(function (response) {})
    .fail(function () {});
}

function searchConditionsAuth() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: []
  };
  var encoded = btoa(JSON.stringify(obj));
  apiCommon
    .permissionSettingsSummary(encoded)
    .done(function (response) {})
    .fail(function () {});
}

function searchConditionsMenu() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: []
  };
  var encoded = btoa(JSON.stringify(obj));
  apiCommon
    .menuSummary(encoded)
    .done(function (response) {})
    .fail(function () {});
}

function searchList() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [
      {
        workDate: dtBoxWork.option("value").toISOString().split("T")[0] //"2024-02-17"
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));
  apiWcs
    .wcsOperation(encoded)
    .done(function (response) {
      try {
        let sampleData = response.lktBody;

        // for (let i = 0; i < 10; i++) {
        //   sampleData.push(response.lktBody[0]);
        // }

        // sampleData.push({workDate: "1234"});

        $(idPrefix + "#workOrderGrid")
          .dxDataGrid("instance")
          .option("dataSource", sampleData);
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리

      errorPopup.removeClass("hidden");
    });
}

export default {
  onCreate,
  onActive
};
