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

const idPrefix = "#mast-mastStore-mastStore ";

let txtBoxSearch;
let workOrderGrid;

function onCreate() {
  txtBoxSearch = $(idPrefix + "#txtBoxSearch")
    .dxTextBox({
      placeholder: "검색",
      value: "",
      width: "200px",
      onValueChanged: function (e) {
        //console.log("입력된 값:", e.value);
      }
    })
    .dxTextBox("instance");

  // 버튼 이벤트 처리
  $(idPrefix + "#btnSearch").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      searchList();
    },
    width: "100px"
  });

  $(idPrefix + "#btnAdd").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      showPopup(false, null);
    },
    width: "100px"
  });

  $(idPrefix + "#btnDel").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      searchList();
    },
    width: "100px"
  });

  let headerCss = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center"
  };
  // DataGrid
  workOrderGrid = $(idPrefix + "#workOrderGrid")
    .dxDataGrid({
      dataSource: [], // 서버에서 데이터를 가져와서 할당
      columns: [
        {
          dataField: "storeCode",
          caption: "지점코드",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("지점코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "storeName",
          caption: "지점명",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("지점명"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "storeAddressLineOne",
          caption: "주소1",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("주소1"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "storeAddressLineTwo",
          caption: "주소2",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("주소2"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "storePhoneOne",
          caption: "전화번호1",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("전화번호1"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "storePhoneTwo",
          caption: "전화번호2",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("전화번호2"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "stateName",
          caption: "사용유무",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("사용유무"); // 헤더 가운데 정렬
          }
        }
      ],

      paging: {enabled: false},
      showBorders: true,
      scrolling: {
        mode: "standard" // or "virtual" | "infinite"
      },
      selection: {
        mode: "single"
      },
      columnAutoWidth: true,
      allowColumnResizing: true, // 컬럼 사이즈 조절 여부
      headerFilter: {
        visible: true // 헤더 필터 드롭다운을 표시
      },
      onRowClick: function (e) {
        const selectedRowData = e.data;
        alert(selectedRowData);
        showPopup(true, selectedRowData);
      }
    })
    .dxDataGrid("instance");
}

function onActive() {}

function searchList() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.GET.CORES.STORES"),
    lktBody: [
      {
        value: txtBoxSearch.option("value")
      }
    ]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiCommon
    .coresStoresGet(encoded)
    .done(function (response) {
      let sampleData = response.lktBody;

      workOrderGrid.option("dataSource", sampleData);
    })
    .fail(function () {
      // 에러 발생 시 처리
      alert("error");
      errorPopup.removeClass("hidden");
    });
}

function showPopup(isModi, row) {
  let formItems = [
    {
      dataField: "storeCode",
      label: {text: "지점코드"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.storeCode : ""
      }
    },
    {
      dataField: "storeName",
      label: {text: "지점명"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.storeName : ""
      }
    },
    {
      dataField: "storeAddressLineOne",
      label: {text: "주소1"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.storeAddressLineOne : ""
      }
    },
    {
      dataField: "storeAddressLineTwo",
      label: {text: "주소2"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.storeAddressLineTwo : ""
      }
    },
    {
      dataField: "storePhoneOne",
      label: {text: "전화번호1"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.storePhoneOne : ""
      }
    },
    {
      dataField: "storePhoneTwo",
      label: {text: "전화번호2"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.storePhoneTwo : ""
      }
    },
    {
      dataField: "stateCode",
      label: {text: "사용유무"},
      editorType: "dxSelectBox",
      editorOptions: {
        items: [
          {id: "01", name: "사용"},
          {id: "00", name: "미사용"}
        ],
        displayExpr: "name",
        valueExpr: "id",
        value: row != null ? row.stateCode : "01",
        placeholder: "선택하세요", // 선택 안내 텍스트
        onValueChanged: function (e) {
          console.log("선택된 값:", e.value); // 선택된 id 값
        }
      }
    }
  ];

  // 팝업 호출
  lktUtil.createDynamicPopup({
    title: isModi ? "지점 수정" : "지점 등록",
    isModi: isModi, // 수정 여부
    formItems: formItems, // 폼 구성
    onExecute: function (formData) {
      var param = {
        lktHeader: lktUtil.getLktHeader("PAGE.POST.CORES.SKUS"),
        lktBody: [
          {
            storeCode: formData.storeCode,
            storeName: formData.storeName,
            storeAddressLineOne: formData.storeAddressLineOne,
            storeAddressLineTwo: formData.storeAddressLineTwo,
            storePhoneOne: formData.storePhoneOne,
            storePhoneTwo: formData.storePhoneTwo,
            stateCode: formData.stateCode
          }
        ]
      };

      if (isModi) {
        apiCommon
          .coresStoresEdit(JSON.stringify(param))
          .done(function (response) {})
          .fail(function () {
            // 에러 발생 시 처리
            alert("error");
            errorPopup.removeClass("hidden");
          });
      } else {
        apiCommon
          .coresStoresAdd(JSON.stringify(param))
          .done(function (response) {})
          .fail(function () {
            // 에러 발생 시 처리
            alert("error");
            errorPopup.removeClass("hidden");
          });
      }

      $("#dynamicPopup").dxPopup("hide");
    },
    onCancel: function () {
      // 취소 버튼 클릭 이벤트 처리
      $("#dynamicPopup").dxPopup("hide");
    }
  });
}

export default {
  onCreate,
  onActive
};
