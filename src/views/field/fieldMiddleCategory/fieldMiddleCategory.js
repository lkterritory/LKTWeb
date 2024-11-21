let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;

const idPrefix = "#field-fieldMiddleCategory-fieldMiddleCategory ";

let txtBoxSkuCode;
let txtBoxSkuName;
let txtBoxWorkBatch;

function onCreate() {
  txtBoxSkuCode = $(idPrefix + "#orderNumberContainer")
    .dxTextBox({
      placeholder: "상품코드",
      onEnterKey: function (e) {
        if (e.event.key === "Enter") {
          // alert(e.component.option("value"));
          searchList();
        }
      },
      onClick: function () {
        txtBoxSkuCode.focus(); // 포커스 이동
        const inputElement = txtBoxSkuCode.element().find("input")[0]; // 내부 input 요소 가져오기
        if (inputElement) {
          inputElement.focus(); // 포커스 이동
          inputElement.select(); // 텍스트 전체 선택
        }
      }
    })
    .dxTextBox("instance");
  txtBoxSkuName = $(idPrefix + "#boxNumberContainer")
    .dxTextBox({
      placeholder: "상품명",
      readOnly: true
    })
    .dxTextBox("instance");
  txtBoxWorkBatch = $(idPrefix + "#waveContainer")
    .dxTextBox({placeholder: "작업차수", readOnly: true})
    .dxTextBox("instance");

  txtBoxSkuCode.option("value", "52912023030316025");

  // renderSorterBoxes(null); // 초기 로드

  searchList();
}

function onActive() {
  txtBoxSkuCode.focus(); // 포커스 이동
  txtBoxSkuCode.element().find("input").select(); // 텍스트 전체 선택
}

function searchList() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.outbound.WCS.MIDDLE.CATEGORIES"),
    lktBody: [
      {
        inputValue: txtBoxSkuCode.option("value")
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .wcsMiddleCategories(encoded)
    .done(function (response) {
      try {
        renderSorterBoxes(response.lktBody[0].lktOutDataDetail); // 초기 로드
      } catch (ex) {}
    })

    .fail(function () {
      // 에러 발생 시 처리
      // alert("error");
    });
}

// 동적으로 항목을 추가하는 함수
function renderSorterBoxes(data) {
  let tmp = {
    // facilitiesCode: "CD",
    // facilitiesName: "CC",
    // orderQty: 2

    euqipmentCode: "DAS-01",
    undistributedQuantity: 0,
    undistributedQuantityPcs: 0,

    type1: "Box",
    type2: "PCS"
  };

  let sumBox = 0;
  let sumPcs = 0;
  data.forEach((item, index) => {
    item.type1 = "Box";
    item.type2 = "PCS";
    item.undistributedQuantityPcs = 0; // 임시

    sumBox += item.undistributedQuantity;
    sumPcs += item.undistributedQuantityPcs;
  });

  data.push({
    euqipmentCode: "합계",
    type1: "Box",
    type2: "PCS",
    undistributedQuantity: sumBox,
    undistributedQuantityPcs: sumPcs
  });
  // {title: "합계", type1: "Box", type2: "PCS", type1Val: "2", type2Val: "30"}

  const container = $("#dynamicBoxContainer");
  container.empty(); // 초기화

  data.forEach((item, index) => {
    let boxHtml = `
      <div class="sorter-box">
        <div class="title">${item.euqipmentCode}</div>
        <div class="type">${item.type1}</div>
        <div class="type-con">${item.undistributedQuantity}</div>
        <div class="type">${item.type2}</div>
        <div class="type-con">${item.undistributedQuantityPcs}</div>
      </div>
    `;

    if (index == data.length - 1) {
      boxHtml = `
      <div class="sorter-box sorter-box-last">
        <div class="title title-last">${item.euqipmentCode}</div>
        <div class="type">${item.type1}</div>
        <div class="type-con">${item.undistributedQuantity}</div>
        <div class="type">${item.type2}</div>
        <div class="type-con">${item.undistributedQuantityPcs}</div>
      </div>
    `;
    }
    container.append(boxHtml);
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
    });
}

export default {
  onCreate,
  onActive
};
