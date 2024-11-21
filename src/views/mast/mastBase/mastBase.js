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

const idPrefix = "#mast-mastBase-mastBase ";

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
          dataField: "masterCode",
          caption: "마스터코드",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("마스터코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "masterName",
          caption: "마스터",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("마스터"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "masterCodeValue",
          caption: "코드",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "masterTextValue",
          caption: "값",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("값"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "masterDescription",
          caption: "설명",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("설명"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "masterParent",
          caption: "부모코드",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("부모코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "masterSequnce",
          caption: "설명",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("설명"); // 헤더 가운데 정렬
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
        // alert(selectedRowData);
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
    .coresCodesGet(encoded)
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
      dataField: "masterCode",
      label: {text: "마스터코드"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.masterCode : ""
      }
    },
    {
      dataField: "masterName",
      label: {text: "마스터"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.masterName : ""
      }
    },
    {
      dataField: "masterCodeValue",
      label: {text: "코드"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.masterCodeValue : ""
      }
    },
    {
      dataField: "masterTextValue",
      label: {text: "값"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.masterTextValue : ""
      }
    },
    {
      dataField: "masterDescription",
      label: {text: "설명"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.masterDescription : ""
      }
    },

    {
      dataField: "masterParent",
      label: {text: "부모코드"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.masterParent : ""
      }
    },

    {
      dataField: "masterSequnce",
      label: {text: "순번"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.masterSequnce : ""
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
    title: isModi ? "기초정보 수정" : "기초정보 등록",
    isModi: isModi, // 수정 여부
    formItems: formItems, // 폼 구성
    onExecute: function (formData) {
      var param = {
        lktHeader: lktUtil.getLktHeader("PAGE.LOCATION.GET"),
        lktBody: [
          {
            masterCode: formData.masterCode,
            masterName: formData.masterName,
            masterCodeValue: formData.masterCodeValue,
            masterTextValue: formData.masterTextValue,
            masterDescription: formData.masterDescription,
            masterParent: formData.masterParent,
            masterSequnce: formData.masterSequnce,

            stateCode: formData.stateCode
          }
        ]
      };

      if (isModi) {
        apiCommon
          .coresCodesEdit(JSON.stringify(param))
          .done(function (response) {})
          .fail(function () {});
      } else {
        apiCommon
          .coresCodesAdd(JSON.stringify(param))
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
