let apiCommon;
let lktUtil;

if (!window.apiCommonModule || !window.lktUtilModule) {
  window.apiCommonModule = import(
    `../../../js/api/apiCommon.js?t=${Date.now()}`
  );
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiCommon = (await window.apiCommonModule).default;
lktUtil = (await window.lktUtilModule).default;

function onCreate() {
  // 검색 버튼 이벤트 처리
  $("#btnSearch").dxButton({
    stylingMode: "contained",
    text: "조회",
    type: "default",
    onClick: function () {
      const inputCondition = $("#inputSearch").val();
      searchList(inputCondition);
    }
  });

  $("#btnAdd").dxButton({
    stylingMode: "contained",
    text: "추가",
    type: "default",
    onClick: function () {
      showPopup(false);
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
    },
    onRowDblClick: function (e) {
      const selectedRowData = e.data;
      showPopup(selectedRowData, true);
      //alert(selectedRowData);
    }
  });
}

function onActive() {
  // loadWorkOrderData();
}

function searchList(aParam) {
  $("#workOrderGrid")
    .dxDataGrid("instance")
    .option("dataSource", [
      {
        centerCode: "LKT",
        clientCode: "LKT",
        warehouseCode: "LKT",
        skuCode: "122516",
        skuName: "PSG) 카페드 파리",
        skuBarcode: "122516",
        boxInQty: 0,
        storageTemperatureCode: "RT",
        storageTemperatureName: "상온",
        forceDeleteCode: "00",
        forceDeleteName: "예",
        partCode: "OEM",
        partName: "OEM",
        statusCode: "01",
        statusName: "예"
      }
    ]);

  var param = {
    lktHeader: lktUtil.getLktHeader("PAGE.GET.CORES.SKUS"),
    lktBody: []
  };
  var encoded = btoa(JSON.stringify(param));
  apiCommon
    .coresSkusGet(encoded)
    .done(function (response) {
      $("#workOrderGrid")
        .dxDataGrid("instance")
        .option("dataSource", response.lktBody);
    })
    .fail(function (error) {
      // 에러 발생 시 처리
      alert("error" + JSON.stringify(error.statusText));
    });
}

function showPopup(rowData, isModi) {
  // "skuCode": "12250199",
  // "skuName": "클로버행운빵(대)9",
  // "skuBarcode": "122501",
  // "statusCode": "01"

  let formItems = [
    {
      dataField: "skuCode",
      label: {text: "상품코드"},
      editorType: "dxTextBox",
      editorOptions: {
        value: isModi ? rowData.skuCode : "" // 초기값 설정
        // readOnly: itm.isReadOnly // 읽기 전용 여부 설정
      }
    },
    {
      dataField: "skuName",
      label: {text: "상품명"},
      editorType: "dxTextBox",
      editorOptions: {
        value: isModi ? rowData.skuName : "" // 초기값 설정
        // readOnly: itm.isReadOnly // 읽기 전용 여부 설정
      }
    },
    {
      dataField: "skuBarcode",
      label: {text: "바코드"},
      editorType: "dxTextBox",
      editorOptions: {
        value: isModi ? rowData.skuBarcode : "" // 초기값 설정
        // readOnly: itm.isReadOnly // 읽기 전용 여부 설정
      }
    }
  ];

  $("#dynamicPopup")
    .dxPopup({
      title: isModi ? "상품수정" : "상품추가",
      visible: true,
      width: 400,
      height: 300,
      showCloseButton: true,
      contentTemplate: function (contentElement) {
        // 동적 폼 생성
        const formInstance = $("<div>")
          .appendTo(contentElement)
          .dxForm({
            formData: {},
            items: formItems
          })
          .dxForm("instance");

        $("<div>")
          .appendTo(contentElement)
          .dxButton({
            text: "실행",
            onClick: function () {
              const formData = formInstance.option("formData");

              var param = {
                lktHeader: lktUtil.getLktHeader("PAGE.POST.CORES.SKUS"),
                lktBody: [
                  {
                    skuCode: formData.skuCode,
                    skuName: formData.skuName,
                    skuBarcode: formData.skuBarcode,
                    statusCode: "01"
                  }
                ]
              };

              let apiIns;
              if (isModi) {
                apiIns = apiCommon.coresSkusEdit(JSON.stringify(param));
              } else {
                apiIns = apiCommon.coresSkusAdd(JSON.stringify(param));
              }
              apiIns
                .done(function (response) {
                  searchList("");
                })
                .fail(function (error) {
                  alert("error" + JSON.stringify(error.statusText));
                });

              $("#dynamicPopup").dxPopup("hide");
            }
          });

        $("<div>")
          .appendTo(contentElement)
          .dxButton({
            text: "취소",
            onClick: function () {
              $("#dynamicPopup").dxPopup("hide");
            }
          });
      }
    })
    .dxPopup("show");
}

export default {
  onCreate,
  onActive
};
