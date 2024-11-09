let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;

const idPrefix = "#field-fieldMiddleCategory-fieldMiddleCategory ";

function onCreate() {
  $(idPrefix + "#orderNumberContainer").dxTextBox({placeholder: "주문번호"});
  $(idPrefix + "#boxNumberContainer").dxTextBox({placeholder: "박스번호"});
  $(idPrefix + "#waveContainer").dxTextBox({placeholder: "웨이브"});
  $(idPrefix + "#shipperContainer").dxTextBox({placeholder: "화주사"});

  // Barcode input
  $(idPrefix + "#txtBoxBarcode").dxTextBox({
    placeholder: "바코드를 스캔해주세요",
    onEnterKey: function (e) {
      inspectionsComplition(e.component.option("value"));

      processBarcode(e.component.option("value"));
    }
  });

  // Load initial data
  // searchList();
  //loadInspectionData();

  // 동적으로 항목을 추가하는 함수
  function renderSorterBoxes() {
    const sorterData = [
      {
        title: "3D-1호기",
        type1: "Box",
        type2: "PCS",
        type1Val: "2",
        type2Val: "30"
      },
      {
        title: "3D-2호기",
        type1: "Box",
        type2: "PCS",
        type1Val: "2",
        type2Val: "30"
      },
      {
        title: "3D-3호기",
        type1: "Box",
        type2: "PCS",
        type1Val: "2",
        type2Val: "30"
      },
      {
        title: "3D-4호기",
        type1: "Box",
        type2: "PCS",
        type1Val: "2",
        type2Val: "30"
      },
      {
        title: "3D-5호기",
        type1: "Box",
        type2: "PCS",
        type1Val: "2",
        type2Val: "30"
      },
      {
        title: "3D-6호기",
        type1: "Box",
        type2: "PCS",
        type1Val: "2",
        type2Val: "30"
      },
      {title: "DAS", type1: "Box", type2: "PCS", type1Val: "2", type2Val: "30"},
      {title: "합계", type1: "Box", type2: "PCS", type1Val: "2", type2Val: "30"}
    ];

    const container = $("#dynamicBoxContainer");
    container.empty(); // 초기화

    sorterData.forEach((item) => {
      const boxHtml = `
        <div class="sorter-box">
          <div class="title">${item.title}</div>
          <div class="type">${item.type1}</div>
          <div class="type">${item.type1Val}</div>
          <div class="type">${item.type2}</div>
          <div class="type">${item.type2Val}</div>
        </div>
      `;
      container.append(boxHtml);
    });
  }

  renderSorterBoxes(); // 초기 로드
}

function onActive() {}

function searchList() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.INSPECTIONS"),
    lktBody: []
  };
  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .wcsInspectionsList(encoded)
    .done(function (response) {})

    .fail(function () {
      // 에러 발생 시 처리
      alert("error");
    });
}

function inspectionsConfirm() {
  // 검수확인
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.INSPECTIONS"),
    lktBody: {
      skuCode: dtSel.skuCode,
      skuName: dtSel.skuName,
      orderQty: dtSel.orderQty,
      confirmQty: dtSel.confirmQty
    }
  };

  apiWcs
    .wcsInspectionsConfirm(JSON.stringify(obj))
    .done(function (response) {})

    .fail(function () {
      // 에러 발생 시 처리
      alert("error");
    });
}

function inspectionsComplition() {
  // 검수완료
  var obj = {
    lktHeader: lktUtil.getLktHeader(
      "PAGE.OUTBOUNDS.WCS.INSPECTIONS.COMPLETION"
    ),
    lktBody: [{input: "52912023030316025", orderNumber: "AAAA"}]
  };

  apiWcs
    .wcswcsInspectionsCompletion(JSON.stringify(obj))
    .done(function (response) {})

    .fail(function () {
      // 에러 발생 시 처리
      alert("error");
    });
}

export default {
  onCreate,
  onActive
};
