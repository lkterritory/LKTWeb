// 데이터 로드 함수
import apiCommon from "../../../js/api/apiCommon";
import lktUtil from "../../../js/util/lktUtil";

// 데이터 로드 함수
function loadData() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.GET.CORES.SKUS"),
    lktBody: []
  };
  var encoded = btoa(JSON.stringify(obj));
  apiCommon
    .coresSkusGet(encoded)
    .done(function (response) {
      $("#workOrderGrid")
        .dxDataGrid("instance")
        .option("dataSource", response.lktBody);
    })
    .fail(function () {
      // 에러 발생 시 처리
      alert("error");
      errorPopup.removeClass("hidden");
    });
}

function onCreate() {
  // 검색 버튼 이벤트 처리
  $("#searchBtn").dxButton({
    stylingMode: "contained",
    text: "조회",
    type: "default",
    onClick: function () {
      // alert("tp");
      const inputCondition = $("#singleInput").val();
      loadData();
    }
  });

  // DataGrid - 작업지시 정보
  $("#workOrderGrid").dxDataGrid({
    dataSource: [], // 서버에서 데이터를 가져와서 할당
    columns: [
      // {dataField: "centerCode", caption: ""},
      // {dataField: "clientCode", caption: ""},
      // {dataField: "warehouseCode", caption: ""},
      {dataField: "skuCode", caption: "상품코드"},
      {dataField: "skuName", caption: "상품명"},
      {dataField: "skuBarcode", caption: "상품바코드"},
      {dataField: "boxInQty", caption: "입수량"},
      // {dataField: "storageTemperatureCode", caption: ""},
      {dataField: "storageTemperatureName", caption: "온도대"},
      // {dataField: "forceDeleteCode", caption: ""},
      // {dataField: "forceDeleteName", caption: ""},
      // {dataField: "partCode", caption: ""},
      {dataField: "partName", caption: "파트명"},
      // {dataField: "statusCode", caption: ""},
      {dataField: "statusName", caption: "상태"}
    ],

    showBorders: true,
    paging: {
      pageSize: 10
    },
    pager: {
      showPageSizeSelector: true,
      allowedPageSizes: [10, 25, 50],
      showInfo: true
    }
  });
}

function onActive() {
  // loadWorkOrderData();
}

export default {
  onCreate,
  onActive
};
