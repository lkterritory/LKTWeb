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

const idPrefix = "#mast-mastUser-mastUser ";

let txtBoxSearch;
let workOrderGrid;

let resAuth = [];

function onCreate() {
  //  searchConditionsAuth();

  txtBoxSearch = $(idPrefix + "#txtBoxSearch")
    .dxTextBox({
      placeholder: "검색",
      value: "",
      width: "200px",
      onValueChanged: function (e) {
        //console.log("입력된 값:", e.value);
      },
      onEnterKey: function(e) { 
        searchList();
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

      // "centerCode": "LKT",
      // "clientCode": "LKT",
      // "warehouseCode": "LKT",
      // "username": "dasco",
      // "storageTemperatureCode": "RF",
      // "storageTemperatureName": "냉장",
      // "permissionCode": "admin",
      // "permissionName": "admin",
      // "stateCode": "01",
      // "stateName": "예"

      columns: [
        {
          dataField: "username",
          caption: "아이디",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("아이디"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "storageTemperatureCode",
          caption: "온도대",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("온도대"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "storageTemperatureName",
          caption: "온도대",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("온도대"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "permissionName",
          caption: "권한명",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("권한명"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "stateName",
          caption: "싱태명",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("싱태명"); // 헤더 가운데 정렬
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
      onCellDblClick: function (e) {
        const selectedRowData = e.data;
        showPopup(true, selectedRowData);
      }
    })
    .dxDataGrid("instance");
}

function onActive() {}

function searchList() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [
      {
        value: txtBoxSearch.option("value")
      }
    ]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiCommon
    .coresUsersGet(encoded)
    .done(function (response) {
      try {
        let sampleData = response.lktBody;

        workOrderGrid.option("dataSource", sampleData);
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

function showPopup(isModi, row) {
  let formItems = [
    {
      dataField: "username",
      label: {text: "사용자 ID"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.username : "",
        disabled: isModi
      }
    },

    {
      dataField: "permissionCode",
      label: {text: "권한"},
      editorType: "dxSelectBox",
      editorOptions: {
        items: [
          {id: "admin", name: "관리자"},
          {id: "user", name: "사용자1"}
        ],
        displayExpr: "name",
        valueExpr: "id",
        value: row != null ? row.permissionCode : "",
        placeholder: "선택하세요",
        onValueChanged: function (e) {
          console.log("선택된 값:", e.value); // 선택된 id 값
        }
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
        value: row != null ? row.stateCode : "",
        placeholder: "선택하세요",
        onValueChanged: function (e) {
          console.log("선택된 값:", e.value); // 선택된 id 값
        }
      }
    }
  ];

  // 팝업 호출
  lktUtil.createDynamicPopup({
    title: isModi ? "사용자수정" : "사용자 등록", // 팝업 타이틀
    isModi: isModi, // 수정 여부
    formItems: formItems, // 폼 구성
    onExecute: function (formData) {
      // 실행 버튼 클릭 이벤트 처리
      const param = {
        lktHeader: lktUtil.getLktHeader("PAGE.POST.CORES.SKUS"),
        lktBody: [
          {
            username: formData.username,
            permissionCode: formData.permissionCode,
            stateCode: formData.stateCode
          }
        ]
      };

      apiCommon
        .coresUsersAdd(JSON.stringify(param))
        .done(function (response) {
          DevExpress.ui.notify("등록이 완료되었습니다.", "success", 2000);
          $("#dynamicPopup").dxPopup("hide");
        })
        .fail(function () {
          DevExpress.ui.notify("등록에 실패했습니다.", "error", 2000);
          $("#dynamicPopup").dxPopup("hide");
        });
    },
    onCancel: function () {
      // 취소 버튼 클릭 이벤트 처리
      $("#dynamicPopup").dxPopup("hide");
    }
  });
}

function searchConditionsAuth() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: []
  };
  var encoded = btoa(JSON.stringify(obj));
  apiCommon
    .permissionSettingsSummary(encoded)
    .done(function (response) {
      try {
        resAuth = response.lktBody;
      } catch (ex) {}
    })
    .fail(function () {});
}

export default {
  onCreate,
  onActive
};
