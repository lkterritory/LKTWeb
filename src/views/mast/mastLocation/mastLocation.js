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
      {dataField: "equipmentType", caption: "설비명"},

      {dataField: "locationCode", caption: "로케이션"},
      {dataField: "locationName", caption: "박스번호(주문번호)"}
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
        equipmentType: "DAS",
        equipmentCode: "1",
        locationCode: "RF-1124",
        locationName: "242A66"
      }
    ]);

  var param = {
    lktHeader: lktUtil.getLktHeader("PAGE.GET.CORES.LOCATION"),
    lktBody: []
  };
  var encoded = btoa(JSON.stringify(param));
  apiCommon
    .coresLocationGet(encoded)
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
      dataField: "equipmentType",
      label: {text: "설비명"},
      editorType: "dxTextBox",
      editorOptions: {
        value: isModi ? rowData.equipmentType : ""
      }
    },
    {
      dataField: "locationCode",
      label: {text: "로케이션코드"},
      editorType: "dxTextBox",
      editorOptions: {
        value: isModi ? rowData.skuName : "" // 초기값 설정
      }
    },
    {
      dataField: "locationName",
      label: {text: "locationName"},
      editorType: "dxTextBox",
      editorOptions: {
        value: isModi ? rowData.locationName : "" // 초기값 설정
      }
    }
  ];

  $("#dynamicPopup")
    .dxPopup({
      title: isModi ? "로케이션수정" : "로케이션추가",
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
                lktHeader: lktUtil.getLktHeader("PAGE.POST.CORES.LOCATION"),
                lktBody: [{}]
              };

              let apiIns;
              if (isModi) {
                apiIns = apiCommon.coresLocationEdit(JSON.stringify(param));
              } else {
                apiIns = apiCommon.coresLocationAdd(JSON.stringify(param));
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
