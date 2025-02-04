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

  //  = DevExpress.ui.dxButton.getInstance($("#btnSearch")[0]);
  //alert(buttonInstance.option("text"));

  // 버튼 이벤트 처리
  let btns = $(idPrefix + ".dx-button")
    .dxButton({
      width: "100px",
      stylingMode: "contained",
      type: "default",
      onClick: function (e) {
        let rowSel = workOrderGrid.getSelectedRowsData();

        const buttonId = $(e.element).data("id");

        if (buttonId === "조회") {
          searchList();
        } else if (buttonId === "계획생성") {
          // 계획생성
          var obj = {
            lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.RDERS"),
            lktBody: [
              {
                workDate: DevExpress.localization.formatDate(
                  dtBoxWork.option("value"),
                  "yyyy-MM-dd"
                ),
                workBatch: rowSel[0].workBatch
              }
            ]
          };

          apiWcs
            .wcsOperationPlan(JSON.stringify(obj))
            .done(function (response) {
              //searchList();
            })
            .fail(function () {
              // 에러 발생 시 처리
            });
        } else if (buttonId === "작업지시") {
          if (rowSel.length <= 0) {
            return;
          }

          if (
            !rowSel[0].equipmentCode ||
            rowSel[0].equipmentCode == null ||
            rowSel[0].equipmentCode == ""
          ) {
            return;
          }

          // 작업시작
          var obj = {
            lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
            lktBody: [
              {
                workDate: DevExpress.localization.formatDate(
                  dtBoxWork.option("value"),
                  "yyyy-MM-dd"
                ),
                workBatch: rowSel[0].workBatch,
                equipmentCode: rowSel[0].equipmentCode
              }
            ]
          };

          //alert(JSON.stringify(obj));

          apiWcs
            .wcsOperationStart(JSON.stringify(obj))
            .done(function (response) {
              try {
                searchList();
              } catch (ex) {}
            })
            .fail(function () {
              // 에러 발생 시 처리
            });
        } else if (buttonId === "차수 작업완료") {
          var obj = {
            lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
            lktBody: [
              {
                workDate: DevExpress.localization.formatDate(
                  dtBoxWork.option("value"),
                  "yyyy-MM-dd"
                ),
                workBatch: rowSel[0].workBatch
              }
            ]
          };

          apiWcs
            .wcsOperationcCompleted(JSON.stringify(obj))
            .done(function (response) {
              searchList();
            })
            .fail(function () {
              // 에러 발생 시 처리
            });
        } else if (buttonId === "전체 작업완료") {
          //전체 작업완료
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

          apiWcs
            .wcsOperationcClosing(JSON.stringify(obj))
            .done(function (response) {
              try {
                searchList();
              } catch (ex) {}
            })
            .fail(function () {
              // 에러 발생 시 처리
            });
        } else if (buttonId === "작업취소") {
          // 작업취소
          var obj = {
            lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
            lktBody: [
              {
                workDate: DevExpress.localization.formatDate(
                  dtBoxWork.option("value"),
                  "yyyy-MM-dd"
                ),
                workBatch: rowSel[0].workBatch
              }
            ]
          };

          apiWcs
            .wcsOperationcCancel(JSON.stringify(obj))
            .done(function (response) {
              try {
                searchList();
              } catch (ex) {}
            })
            .fail(function () {
              // 에러 발생 시 처리
            });
        }
      }
    })
    .dxButton("instance");

  // alert("dd");
  // alert(btns[0]);

  let facTmp = [
    "DAS-01",
    "DAS-02",
    "DAS-03",
    "DAS-04",
    "DAS-05",
    "DAS-06",
    "DAS-07",
    "DAS-08",
    "DAS-09",
    "DAS-10"
  ];

  let headerCss = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center"
  };

  // DataGrid - 작업지시 정보
  workOrderGrid = $(idPrefix + "#workOrderGrid")
    .dxDataGrid({
      dataSource: [
        // {
        //   workDate: "text",
        //   workBatch: "text2",
        //   pickingGroup: "DAS01",
        //   equipmentCode: "DAS-01"
        // },
        // {
        //   workDate: "text",
        //   workBatch: "text3",
        //   pickingGroup: "1HM_01",
        //   equipmentCode: "DAS-01"
        // },
        // {
        //   workDate: "text",
        //   workBatch: "text4",
        //   pickingGroup: "DAS-02",
        //   equipmentCode: "DAS-01"
        // },
        // {
        //   workDate: "text",
        //   workBatch: "text5",
        //   pickingGroup: "1HM_01",
        //   equipmentCode: "DAS-01"
        // },
        // {
        //   workDate: "text",
        //   workBatch: "text6",
        //   pickingGroup: "DAS-04",
        //   equipmentCode: "DAS-01"
        // },
        // {
        //   workDate: "text",
        //   workBatch: "text7",
        //   pickingGroup: "DAS-03",
        //   equipmentCode: "DAS-01"
        // }
      ], // 서버에서 데이터를 가져와서 할당
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
        // {
        //   dataField: "equipmentType",
        //   caption: "설비종류",
        //   minWidth: 90,
        //   headerCellTemplate: function (headerCell) {
        //     headerCell.css(headerCss).text("설비종류"); // 헤더 가운데 정렬
        //   }
        // },

        {
          dataField: "pickingGroup",
          caption: "피킹그룹",
          width: 180,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("피킹그룹"); // 헤더 가운데 정렬
          },
          cellTemplate: function (cellElement, cellInfo) {
            // 특정 조건을 확인하여 SelectBox를 표시

            cellElement.text(cellInfo.value); // 조건에 맞지 않으면 일반 텍스트로 표시
          }
        },
        {
          dataField: "equipmentCode",
          caption: "설비명",
          width: 100,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("설비명"); // 헤더 가운데 정렬
          },
          cellTemplate: function (cellElement, cellInfo) {
            const pickingGroup = cellInfo.data.pickingGroup;

            // if (pickingGroup == "1HM_01") {
            if (true) {
              const selectBox = $("<div>")
                .dxSelectBox({
                  items: facTmp,
                  value: cellInfo.value, // 초기 값
                  onValueChanged: function (e) {
                    // 데이터 소스 업데이트
                    const dataSource = cellInfo.component.option("dataSource");
                    const rowIndex = cellInfo.rowIndex;
                    const dataField = cellInfo.column.dataField;

                    if (dataSource && rowIndex !== undefined) {
                      dataSource[rowIndex][dataField] = e.value; // 데이터 소스 업데이트
                    }
                  }
                })
                .appendTo(cellElement);
              selectBox.dxSelectBox("instance").focus();

              cellElement.css({
                display: "flex",
                alignItems: "center",
                height: "40px"
              });
            } else {
              cellElement.css({
                display: "flex",
                alignItems: "center",
                height: "40px"
              });
              cellElement.text(cellInfo.value); // 조건에 맞지 않으면 일반 텍스트로 표시
            }
          }
        },
        // {
        //   dataField: "equipmentCode",
        //   caption: "설비명",
        //   minWidth: 90,

        //   headerCellTemplate: function (headerCell) {
        //     headerCell.css(headerCss).text("설비명"); // 헤더 가운데 정렬
        //   }
        // },
        // {
        //   dataField: "equipmentName",
        //   caption: "설비명",
        //   minWidth: 90,

        //   headerCellTemplate: function (headerCell) {
        //     headerCell.css(headerCss).text("설비명"); // 헤더 가운데 정렬
        //   }
        // },
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
          dataField: "totalStoreCount",
          caption: "지점수",
          allowFiltering: false,
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("지점수"); // 헤더 가운데 정렬
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
          dataField: "totalPcs",
          caption: "낱개수량",
          allowFiltering: false,
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("낱개수량"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "processOrderCount",
          caption: "작업주문건수",
          allowFiltering: false,
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업주문건수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "processStoreCount",
          caption: "작업지점수",
          allowFiltering: false,
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업지점수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "processSkuCount",
          caption: "작업품목수량",
          allowFiltering: false,
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업품목수량"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "processPcs",
          caption: "작업낱개수량",
          allowFiltering: false,
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("작업낱개수량"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "rateOfProcess",
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
          dataField: "compWho",
          caption: "완료자",

          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("완료자"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "compDtm",
          caption: "완료일자",
          allowFiltering: false,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("완료일자"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "sscc",
          caption: "SSCC",
          allowFiltering: false,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("SSCC"); // 헤더 가운데 정렬
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
        workDate: DevExpress.localization.formatDate(
          dtBoxWork.option("value"),
          "yyyy-MM-dd"
        )
      }
    ]
  };

  console.log("wcsOperation-get", JSON.stringify(obj));

  var encoded = btoa(JSON.stringify(obj));
  apiWcs
    .wcsOperation(encoded)
    .done(function (response) {
      try {
        let resBody = response.lktBody;

        $(idPrefix + "#workOrderGrid")
          .dxDataGrid("instance")
          .option("dataSource", resBody);
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
