import apiWcs from "../../../js/api/apiWcs.js";

function onCreate() {
  $("#orderNumberContainer").dxTextBox({placeholder: "주문번호"});
  $("#boxNumberContainer").dxTextBox({placeholder: "박스번호"});
  $("#waveContainer").dxTextBox({placeholder: "웨이브"});
  $("#shipperContainer").dxTextBox({placeholder: "화주사"});

  // Summary fields
  $("#deliveryTypeContainer").dxTextBox({
    value: "택배유형/포장유형",
    readOnly: true
  });
  $("#productCountContainer").dxTextBox({value: "0 / 0", readOnly: true});
  $("#unitCountContainer").dxTextBox({value: "0 / 0", readOnly: true});
  $("#inspectionProgressContainer").dxTextBox({value: "0%", readOnly: true});

  // Barcode input
  $("#barcodeInputContainer").dxTextBox({
    placeholder: "바코드를 스캔해주세요",
    onEnterKey: function (e) {
      inspectionsComplition(e.component.option("value"));

      processBarcode(e.component.option("value"));
    }
  });

  // Inspection type
  $("#inspectionTypeContainer").dxRadioGroup({
    items: ["개별검수", "일괄검수"],
    value: "개별검수",
    layout: "horizontal"
  });

  // Buttons
  $("#inspectButton").dxButton({
    text: "검수",
    type: "default",
    onClick: function () {
      inspectionsConfirm();
    }
  });

  $("#reissueButton").dxButton({
    text: "재발행",
    type: "normal",
    onClick: function () {
      alert("재발행 버튼 클릭됨");
    }
  });

  // Data grid for product inspection details
  $("#productGrid").dxDataGrid({
    dataSource: [],
    columns: [
      //   {dataField: "productCode", caption: "상품코드"},
      //   {dataField: "temperatureZone", caption: "온도대"},
      //   {dataField: "productName", caption: "상품명"},
      //   {dataField: "plannedQuantity", caption: "예정수량"},
      //   {dataField: "pickingQuantity", caption: "피킹수량"},
      //   {dataField: "inspectionQuantity", caption: "검수수량"},
      //   {dataField: "statusName", caption: "상태명"},
      //   {dataField: "labelCode", caption: "라벨코드"}

      {dataField: "sequnce", caption: "순번"},
      {dataField: "skuTemperature", caption: "온도대"},
      {dataField: "skuCode", caption: "상품코드"},
      {dataField: "skuName", caption: "상품명"},
      {dataField: "skuBarcode", caption: "바코드"},
      {dataField: "orderQty", caption: "수량"},
      // {dataField: "statusCode", caption: ""},
      {dataField: "statusName", caption: "상태"},
      {dataField: "skuVariant", caption: "이형"}
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

  // Sample data loading function
  function loadInspectionData() {
    const sampleData = [
      {
        productCode: "P001",
        temperatureZone: "냉장",
        productName: "샘플상품1",
        plannedQuantity: 10,
        pickingQuantity: 8,
        inspectionQuantity: 5,
        statusName: "진행중",
        labelCode: "L001"
      },
      {
        productCode: "P002",
        temperatureZone: "냉동",
        productName: "샘플상품2",
        plannedQuantity: 15,
        pickingQuantity: 15,
        inspectionQuantity: 10,
        statusName: "완료",
        labelCode: "L002"
      }
    ];

    $("#productGrid").dxDataGrid("instance").option("dataSource", sampleData);
  }

  // Load initial data
  searchList();
  //loadInspectionData();

  // Barcode processing function
  function processBarcode(barcode) {
    console.log("Scanned barcode:", barcode);
    alert("바코드 처리됨: " + barcode);
  }
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
    .done(function (response) {
      $("#productGrid")
        .dxDataGrid("instance")
        .option("dataSource", response.lktBody);
    })

    .fail(function () {
      // 에러 발생 시 처리
      alert("error");
    });
}

function inspectionsConfirm() {
  let dtSel = $("#productGrid").dxDataGrid("instance").getSelectedRowsData();

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
