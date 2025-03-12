let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;

const idPrefix = "#spiral-master-masterCode ";

let channelCdSearch, channelNmSearch;
let workOrderGrid;

let arrMenus = [];


function onCreate() {
  channelCdSearch = $(idPrefix + "#channelCdSearch")
    .dxTextBox({
      placeholder: "채널코드",
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
  
    channelNmSearch = $(idPrefix + "#channelNmSearch")
    .dxTextBox({
      placeholder: "채널명",
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
      showPopup(false);
    },
    width: "100px"
  });

  $(idPrefix + "#btnDel").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function () {
      let selectedRow = workOrderGrid.getSelectedRowsData()[0];
  
      if (!selectedRow) {
        DevExpress.ui.notify("삭제할 항목을 선택하세요.", "warning", 2000);
        return;
      }
  
      // 삭제 확인 메시지 표시
      DevExpress.ui.dialog.confirm("선택한 항목을 삭제하시겠습니까?", "삭제 확인").done(function (dialogResult) {
        if (dialogResult) {
          deleteMasterCode(selectedRow);
        }
      });
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
          dataField: "channelCd",
          caption: "채널코드",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("채널코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "channelNm",
          caption: "채널명",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("채널명"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "destFloor",
          caption: "도착층",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("도착층"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "createdBy",
          caption: "생성자",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("생성자"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "createdAt",
          caption: "생성시간",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("생성시간"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "updatedBy",
          caption: "수정자",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("수정자"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "updatedAt",
          caption: "수정시간",
          minWidth: 90,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("수정시간"); // 헤더 가운데 정렬
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

    searchList();
}

function onActive() {}

function searchList() {

  const requestBody = {
    channelCd: channelCdSearch.option("value") || "",
    channelNm: channelNmSearch.option("value") || ""
  }

  apiWcs
    .masterDestListGet(requestBody)
    .done(function (response) {
      try {
        let sampleData = response.lktBody || "";
        console.log(sampleData);
        masterCodeData = sampleData.flatMap(obj => obj.data || []); 

        workOrderGrid.option("dataSource", masterCodeData);
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

function showPopup(isModi, row) {
  let channelCdValue = row ? row.channelCd : ""; 
  let channelNmValue = row ? row.channelNm : ""; 
  let destFloorValue = row ? row.destFloor : ""; 
  let isDuplicateChecked = false; // 중복 확인 여부

  let formItems = [
    {
      dataField: "channelCd",
      label: { text: "채널코드" },
      editorType: "dxTextBox",
      editorOptions: {
        value: channelCdValue,
        disabled: isModi,
        onValueChanged : function(e){
          channelCdValue = e.value.trim();
          isDuplicateChecked = false;
        }
      }
    },
    {
      dataField: "channelNm",
      label: { text: "채널명" },
      editorType: "dxTextBox",
      editorOptions: {
        value: channelNmValue,
        disabled: isModi 
      }
    },
    {
      dataField: "destFloor",
      label: { text: "도착층" },
      editorType: "dxSelectBox",
      editorOptions: {
        items: [
          { id: "2", name: "2F" },
          { id: "3", name: "3F" }
        ],
        displayExpr: "name", 
        valueExpr: "id", 
        value: destFloorValue, 
        placeholder: "선택하세요",
        disabled: false, 
        onValueChanged: function (e) {
          destFloorValue = e.value;
          isDuplicateChecked = false; 
        }
      }
    }
  ];


  // 중복확인
  if (!isModi) {
    formItems.push({
      dataField: "check",
      label: { text: " " },
      editorType: "dxButton",
      editorOptions: {
        text: "중복 확인",
        onClick: function () {
          checkDuplicate(channelCdValue, destFloorValue);
        }
      }
    });
  }
  

  // 팝업 호출
  lktUtil.createDynamicPopup({
    width: 600,
    title: isModi ? "코드 수정" : "코드 등록",
    isModi: isModi, // 수정 여부
    formItems: formItems, // 폼 구성
    onExecute: function (formData, row) {
      if (!isModi && !isDuplicateChecked) {
        DevExpress.ui.notify("중복 확인을 먼저 진행하세요.", "warning", 2000);
        return;
      }
      if (isModi) {
        const requestBody = {
          actionType: "U",   //"U" 업데이트, "D" 삭제
          channelCd: row.channelCd || "",
          channelNm: row.channelNm || "",
          destFloor: row.destFloor || ""
        };
        apiWcs
          .masterDestUpdate(requestBody)
          .done(function (response) {
            try {
              let sampleData = response.lktBody;
  
              workOrderGrid.option("dataSource", sampleData);
            } catch (ex) {}
          })
          .fail(function () {});
      } else {
        const requestBody = {
          channelCd: formData.channelCd || "",
          channelNm: formData.channelNm || "",
          destFloor: formData.destFloor || ""
        }; 

        apiWcs
          .masterDestInsert(requestBody)
          .done(function (response) {
            try {
              let sampleData = response.lktBody;
  
              workOrderGrid.option("dataSource", sampleData);
            } catch (ex) {}
          })
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
 // ✅ 중복 확인 API 요청 함수
 function checkDuplicate(channelCd, destFloor) {
  if (!channelCd?.trim() || !destFloor) {
    DevExpress.ui.notify("채널코드와 도착층을 입력하세요.", "warning", 2000);
    return;
  }
  const requestBody = {
    channelCd: channelCd || "",
    destFloor: destFloor || ""
  };

  apiWcs
    .masterDestDuplicateCheck(requestBody)
    .done(function (response) {
      let isDuplicate = response?.lktBody?.data?.[0]?.isDuplicate;

      if (isDuplicate) {
        DevExpress.ui.notify("중복된 데이터가 존재합니다.", "error", 2000);
        isDuplicateChecked = false;
      } else {
        DevExpress.ui.notify("사용 가능합니다.", "success", 2000);
        isDuplicateChecked = true;
      }
    })
    .fail(function () {
      DevExpress.ui.notify("서버 오류 발생. 다시 시도해주세요.", "error", 2000);
    });
}

//삭제 api
function deleteMasterCode(row){
  if (!row?.channelCd) {
    DevExpress.ui.notify("삭제할 항목을 선택하세요.", "warning", 2000);
    return;
  }
  
  const requestBody = {
    actionType: "D",   //"U" 업데이트, "D" 삭제
    channelCd: row.channelCd || "",
    channelNm: row.channelNm || "",
    destFloor: row.destFloor || "",
  };
  apiWcs
    .masterDestUpdate(requestBody)
    .done(function (response) {
      if (response?.lktBody) {
        searchList();
        DevExpress.ui.notify("삭제가 완료되었습니다.", "success", 2000);
      } else {
        DevExpress.ui.notify("삭제 실패. 다시 시도해주세요.", "error", 2000);
      }
    })
    .fail(function () {
      DevExpress.ui.notify("서버 오류 발생. 삭제에 실패했습니다.", "error", 2000);
    });
}

export default {
  onCreate,
  onActive
};
