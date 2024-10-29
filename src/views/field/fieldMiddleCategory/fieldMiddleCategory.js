import apiWcs from "../../../js/api/apiWcs";
import lktUtil from "../../../js/util/lktUtil";

function onCreate() {
  // DateBox - 작업차수 선택
  $("#workDateContainer").dxDateBox({
    type: "date",
    displayFormat: "yyyy-MM-dd",
    value: new Date(),
    width: "150px"
  });

  // 동적으로 항목을 추가하는 함수
  function renderSorterBoxes() {
    const sorterData = [
      {title: "3D-SORTER - 1호기", type1: "Box", type2: "PCS"},
      {title: "3D-SORTER - 2호기", type1: "Box", type2: "PCS"},
      {title: "3D-SORTER - 3호기", type1: "Box", type2: "PCS"},
      {title: "DAS", type1: "Box", type2: "PCS"},
      {title: "합계", type1: "Box", type2: "PCS"}
    ];

    const container = $("#dynamicBoxContainer");
    container.empty(); // 초기화

    sorterData.forEach((item) => {
      const boxHtml = `
        <div class="sorter-box">
          <div class="title">${item.title}</div>
          <div class="type">${item.type1}</div>
          <div class="type">${item.type2}</div>
        </div>
      `;
      container.append(boxHtml);
    });
  }

  renderSorterBoxes(); // 초기 로드

  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.MIDDLE.CATEGORIES"),
    lktBody: [
      {
        input: $("#skuCode").val()
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));
  apiWcs
    .wcsMiddleCategories(encoded)
    .done(function (response) {
      const sampleData = response.lktBody;
      $("#workOrderGrid")
        .dxDataGrid("instance")
        .option("dataSource", sampleData);
    })
    .fail(function () {
      // 에러 발생 시 처리
      alert("error");
    });
}

function onActive() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.MIDDLE.CATEGORIES"),
    lktBody: [
      {
        input: $("#skuCode").val()
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));
  apiWcs
    .wcsMiddleCategories(encoded)
    .done(function (response) {
      const sampleData = response.lktBody;
      $("#workOrderGrid")
        .dxDataGrid("instance")
        .option("dataSource", sampleData);
    })
    .fail(function () {
      // 에러 발생 시 처리
      alert("error");
    });
}

export default {
  onCreate,
  onActive
};
