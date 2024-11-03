let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;

// 데이터 로드 함수
function loadWorkOrderData() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [
      {
        workDate: "2024-02-17"
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));
  apiWcs
    .wcsOperation(encoded)
    .done(function (response) {
      let sampleData = response.lktBody;

      // for (let i = 0; i < 10; i++) {
      //   sampleData.push(response.lktBody[0]);
      // }

      // sampleData.push({workDate: "1234"});

      $("#workOrderGrid")
        .dxDataGrid("instance")
        .option("dataSource", sampleData);
    })
    .fail(function () {
      // 에러 발생 시 처리
      alert("error");
      errorPopup.removeClass("hidden");
    });
}

function onCreate() {
  // DateBox - 출고일자 선택
  $("#workDateContainer").dxDateBox({
    type: "date",
    displayFormat: "yyyy-MM-dd",
    value: new Date(),
    width: "200px"
  });

  // SelectBox - 작업차수 선택
  $("#workBatchContainer").dxSelectBox({
    items: ["1차", "2차", "3차"],
    placeholder: "작업차수 선택",
    value: null,
    width: "200px"
  });

  // 버튼 이벤트 처리
  $(".dx-button").dxButton({
    // elementAttr: {
    //   style: "background-color: #ff5722; color: #ffffff; border-color: #ff5722;"
    // },

    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      const selectedDate = $("#workDateContainer")
        .dxDateBox("instance")
        .option("value");
      const selectedBatch = $("#workBatchContainer")
        .dxSelectBox("instance")
        .option("value");

      //loadWorkOrderData();

      const buttonId = $(e.element).data("id");
      alert(buttonId);
      if (buttonId === "조회") {
        loadWorkOrderData();
      } else if (buttonId === "계획생성") {
        // 계획생성
        var obj = {
          lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
          lktBody: [
            {
              workDate: selectedDate,
              workBatch: selectedBatch
            }
          ]
        };

        var obj = btoa(JSON.stringify(obj)); // 테스트
        apiWcs
          .wcsOperationPlan(JSON.stringify(obj))
          .done(function (response) {
            if (response.lktHeader.resultCode != "200") {
              $("#networkPopup")
                .dxPopup({
                  title:
                    response.lktHeader.resultCode +
                    "\r\n" +
                    response.lktHeader.resultMessage,
                  visible: true,
                  width: 300,
                  height: 100,
                  contentTemplate: function (contentElement) {
                    const formInstance = $("<div>")
                      .appendTo(contentElement)
                      .dxForm({
                        formData: {},
                        items: []
                      })
                      .dxForm("instance");
                  }
                })
                .dxPopup("show");
            }
          })
          .fail(function () {
            // 에러 발생 시 처리
            alert("error");
            errorPopup.removeClass("hidden");
          });
      } else if (buttonId === "작업시작") {
        // 작업시작
        var obj = {
          lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
          lktBody: []
        };

        apiWcs
          .wcsOperationStart(JSON.stringify(obj))
          .done(function (response) {
            const sampleData = response.lktBody;
            $("#workOrderGrid")
              .dxDataGrid("instance")
              .option("dataSource", sampleData);
          })
          .fail(function () {
            // 에러 발생 시 처리
            alert("error");
            errorPopup.removeClass("hidden");
          });
      } else if (buttonId === "차수 작업완료") {
        // 차수 작업완료
        alert("ddd");

        var obj = {
          lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
          lktBody: []
        };

        apiWcs
          .wcsOperationcCompleted(JSON.stringify(obj))
          .done(function (response) {
            const sampleData = response.lktBody;
            $("#workOrderGrid")
              .dxDataGrid("instance")
              .option("dataSource", sampleData);
          })
          .fail(function () {
            // 에러 발생 시 처리
            alert("error");
            errorPopup.removeClass("hidden");
          });
      } else if (buttonId === "전체 작업완료") {
        //전체 작업완료
        var obj = {
          lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
          lktBody: []
        };

        apiWcs
          .wcsOperationcClosing(JSON.stringify(obj))
          .done(function (response) {
            const sampleData = response.lktBody;
            $("#workOrderGrid")
              .dxDataGrid("instance")
              .option("dataSource", sampleData);
          })
          .fail(function () {
            // 에러 발생 시 처리
            alert("error");
            errorPopup.removeClass("hidden");
          });
      } else if (buttonId === "작업취소") {
        // 작업취소
        var obj = {
          lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
          lktBody: []
        };

        apiWcs
          .wcsOperationcCancel(JSON.stringify(obj))
          .done(function (response) {
            const sampleData = response.lktBody;

            $("#workOrderGrid")
              .dxDataGrid("instance")
              .option("dataSource", sampleData);
          })
          .fail(function () {
            // 에러 발생 시 처리
            alert("error");
            errorPopup.removeClass("hidden");
          });
      }
    },
    width: "100px"
  });

  let headerCss = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center"
  };
  // DataGrid - 작업지시 정보
  $("#workOrderGrid").dxDataGrid({
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
  });

  //loadWorkOrderData();
}

function onActive() {
  //loadWorkOrderData();
}

export default {
  onCreate,
  onActive
};
