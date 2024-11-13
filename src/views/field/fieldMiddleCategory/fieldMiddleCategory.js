let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;

const idPrefix = "#field-fieldMiddleCategory-fieldMiddleCategory ";

let txtBoxSku;

function onCreate() {
  txtBoxSku = $(idPrefix + "#orderNumberContainer")
    .dxTextBox({
      placeholder: "상품코드",
      onEnterKey: function (e) {
        // 엔터 키가 눌렸는지 확인
        if (e.event.key === "Enter") {
          // 원하는 동작 수행
          // alert(e.component.option("value"));
          searchList();
        }
      }
    })
    .dxTextBox("instance");
  $(idPrefix + "#boxNumberContainer").dxTextBox({placeholder: "상품명"});
  $(idPrefix + "#waveContainer").dxTextBox({placeholder: "작업차수"});

  txtBoxSku.option("value", "52912023030316025");

  // 동적으로 항목을 추가하는 함수
  function renderSorterBoxes(data) {
    let tmp = {
      facilitiesCode: "CD",
      facilitiesName: "CC",
      orderQty: 2
    };

    let sorterData = [
      {
        title: "DAS-1호기",
        type1: "Box",
        type2: "PCS",
        type1Val: "2",
        type2Val: "30"
      },
      {
        title: "DAS-2호기",
        type1: "Box",
        type2: "PCS",
        type1Val: "2",
        type2Val: "30"
      },
      {
        title: "DAS-3호기",
        type1: "Box",
        type2: "PCS",
        type1Val: "2",
        type2Val: "30"
      },
      {
        title: "3DAS-4호기",
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
        title: "DAS-6호기",
        type1: "Box",
        type2: "PCS",
        type1Val: "2",
        type2Val: "30"
      },
      {
        title: "DAS-7호기",
        type1: "Box",
        type2: "PCS",
        type1Val: "2",
        type2Val: "30"
      }
    ];

    sorterData.push({
      title: "합계",
      type1: "Box",
      type2: "PCS",
      type1Val: "2",
      type2Val: "30"
    });

    // {title: "합계", type1: "Box", type2: "PCS", type1Val: "2", type2Val: "30"}

    const container = $("#dynamicBoxContainer");
    container.empty(); // 초기화

    sorterData.forEach((item) => {
      const boxHtml = `
        <div class="sorter-box">
          <div class="title">${item.title}</div>
          <div class="type">${item.type1}</div>
          <div class="type-con">${item.type1Val}</div>
          <div class="type">${item.type2}</div>
          <div class="type-con">${item.type2Val}</div>
        </div>
      `;
      container.append(boxHtml);
    });
  }

  renderSorterBoxes(null); // 초기 로드

  searchList();
}

function onActive() {}

function searchList() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.outbound.WCS.MIDDLE.CATEGORIES"),
    lktBody: [
      {
        input: txtBoxSku.option("value")
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .wcsMiddleCategories(encoded)
    .done(function (response) {})

    .fail(function () {
      // 에러 발생 시 처리
      // alert("error");
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
