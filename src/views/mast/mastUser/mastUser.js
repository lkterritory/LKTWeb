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
    .coresUsersGet(encoded)
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

  // DataGrid -
  $("#workOrderGrid").dxDataGrid({
    dataSource: [], // 서버에서 데이터를 가져와서 할당
    columns: [],

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
