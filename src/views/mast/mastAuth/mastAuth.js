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

const idPrefix = "#mast-mastAuth-mastAuth ";

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
      showPopup(false);
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
          dataField: "permissionCode",
          caption: "권한코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("권한코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "permissionName",
          caption: "권한명",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("권한명"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "stateName",
          caption: "상태",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상태명"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "addDtm",
          caption: "등록일",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("등록일"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "addWho",
          caption: "등록자",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("등록자"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "modDtm",
          caption: "수정일",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("수정일"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "modWho",
          caption: "수정자",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("수정자"); // 헤더 가운데 정렬
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
      // onRowClick: function (e) {
      //   const selectedRowData = e.data;
      // }
      onCellDblClick: function (e) {
        const selectedRowData = e.data;
        showPopup(true, selectedRowData);
      }
    })
    .dxDataGrid("instance");
}

function onActive() {}

function searchList() {
  // 테스트

  // let bodyTmp = [
  //   {
  //     permissionCode: "admin",
  //     permissionName: "관리자",
  //     menus: [
  //       {
  //         menuCode: "MNU_CORES_LOCATIONS"
  //       },
  //       {
  //         menuCode: "MNU_CORES_PERMISSIONS"
  //       },
  //       {
  //         menuCode: "MNU_CORES_SKUS"
  //       },
  //       {
  //         menuCode: "MNU_CORES_USERS"
  //       },
  //       {
  //         menuCode: "MNU_DASHBOARD_OVERALL"
  //       },
  //       {
  //         menuCode: "MNU_DASHBOARD_PICKTOLIGHT"
  //       },
  //       {
  //         menuCode: "MNU_OUTBOUND_EUC"
  //       },
  //       {
  //         menuCode: "MNU_OUTBOUND_LABELS_STATUS"
  //       },
  //       {
  //         menuCode: "MNU_OUTBOUND_ORDERS"
  //       },
  //       {
  //         menuCode: "MNU_OUTBOUND_ORDERS_STATUS"
  //       },
  //       {
  //         menuCode: "MNU_OUTBOUND_PICKTOLIGHT"
  //       },
  //       {
  //         menuCode: "MNU_OUTBOUND_SKUS_STATUS"
  //       },
  //       {
  //         menuCode: "MNU_SECOND_CLASS"
  //       }
  //     ],
  //     stateCode: "01",
  //     stateName: "예",
  //     addDtm: "2023-11-23 05:11:10",
  //     addWho: "SUPER",
  //     modDtm: "2023-11-23 05:11:10",
  //     modWho: "SUPER"
  //   },
  //   {
  //     permissionCode: "kiosk",
  //     permissionName: "현장",
  //     menus: [],
  //     stateCode: "01",
  //     stateName: "예",
  //     addDtm: "2023-11-23 05:11:10",
  //     addWho: "SUPER",
  //     modDtm: "2023-11-23 05:11:10",
  //     modWho: "SUPER"
  //   }
  // ];

  // workOrderGrid.option("dataSource", bodyTmp);
  // return;

  // end 테스트

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
    .coresAuthGet(encoded)
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
      dataField: "permissionCode",
      label: {text: "권한코드"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.permissionCode : "",
        disabled: isModi
      }
    },
    {
      dataField: "permissionName",
      label: {text: "권한명"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.permissionName : ""
      }
    }
  ];

  // 팝업 호출
  lktUtil.createDynamicPopupEx({
    width: 600,
    title: isModi ? "권한 수정" : "권한 등록",
    isModi: isModi, // 수정 여부
    formItems: formItems, // 폼 구성
    gridOptions: {
      dataSource: row ? row.menus : [],
      columns: [{dataField: "menuCode", caption: "메뉴"}],
      paging: {enabled: false},
      showBorders: true,
      scrolling: {
        mode: "standard" // or "virtual" | "infinite"
      },
      selection: {
        mode: "multiple", // 멀티셀렉트
        showCheckBoxesMode: "always" // 체크박스 항상 표시
      },
      onContentReady: function (e) {
        // 그리드가 렌더링된 뒤 전체 선택
        e.component.selectAll();
      },
      columnAutoWidth: true
    },
    onExecute: function (formData, row) {
      var param = {
        lktHeader: lktUtil.getLktHeader("PATCH.CORES.PERMISSION"),
        lktBody: [
          {
            permissionCode: formData.permissionCode,
            permissionName: formData.permissionName,
            locationCode: formData.locationCode,
            stateCode: "01",
            menus: row
          }
        ]
      };

      alert(JSON.stringify(param));

      if (isModi) {
        apiCommon
          .coresAuthEdit(JSON.stringify(param))
          .done(function (response) {})
          .fail(function () {});
      } else {
        apiCommon
          .coresAuthAdd(JSON.stringify(param))
          .done(function (response) {})
          .fail(function () {});
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
