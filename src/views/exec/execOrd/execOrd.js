import apiWcs from "../../../js/api/apiWcs.js?a=1";
import lktUtil from "../../../js/util/lktUtil.js";

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
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      const selectedDate = $("#workDateContainer")
        .dxDateBox("instance")
        .option("value");
      const selectedBatch = $("#workBatchContainer")
        .dxSelectBox("instance")
        .option("value");

      const buttonId = e.component.option("text");
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
        var encoded = btoa(JSON.stringify(obj));
        apiWcs
          .wcsOperationPlan(encoded)
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
      } else if (buttonId === "작업시작") {
        // 작업시작
        var obj = {
          lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
          lktBody: []
        };
        var encoded = btoa(JSON.stringify(obj));
        apiWcs
          .wcsOperationStart(encoded)
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

        const selectedData = workOrderGrid.getSelectedRowsData();

        var obj = {
          lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
          lktBody: []
        };
        var encoded = btoa(JSON.stringify(obj));
        apiWcs
          .wcsOperationcCompleted(encoded)
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
        var encoded = btoa(JSON.stringify(obj));
        apiWcs
          .wcsOperationcClosing(encoded)
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
        var encoded = btoa(JSON.stringify(obj));
        apiWcs
          .wcsOperationcCancel(encoded)
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

  // DataGrid - 작업지시 정보
  $("#workOrderGrid").dxDataGrid({
    dataSource: [], // 서버에서 데이터를 가져와서 할당
    columns: [
      {dataField: "workDate", caption: "작업일자"},
      {dataField: "workBatch", caption: "작업차수"},
      {dataField: "description", caption: "설명"},
      {dataField: "equipmentType", caption: "설비종류"},
      {dataField: "equipmentName", caption: "설비명"},
      {dataField: "totalOrderCount", caption: "주문건수"},
      {dataField: "totalSkuCount", caption: "상품건수"},

      {dataField: "totalPlanQuantity", caption: "낱개수량"},

      {dataField: "totalWorkQuantity", caption: "작업낱개수량"},
      {dataField: "totalWorkSkuCount", caption: "작업품목수량"},
      {dataField: "totalPersnet", caption: "진행율"},

      {dataField: "statusName", caption: "상태"},

      {dataField: "addWho", caption: "지시자"},
      {dataField: "addDtm", caption: "지시일자"},

      {dataField: "modWho", caption: "완료자"},
      {dataField: "modDtm", caption: "완료일자"}
    ],
    showBorders: true,
    paging: {
      pageSize: 10
    },
    pager: {
      showPageSizeSelector: true,
      allowedPageSizes: [10, 25, 50],
      showInfo: true
    },
    selection: {
      mode: "single"
    }
  });

  loadWorkOrderData();
}

function onActive() {
  loadWorkOrderData();
}

export default {
  onCreate,
  onActive
};
