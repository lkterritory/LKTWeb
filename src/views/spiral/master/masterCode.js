
let apiSpiral;
let lktUtil;

if (!window.apiSpiralModule || !window.lktUtilModule) {
  window.apiSpiralModule = import(`../../../js/api/apiSpiral.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiSpiral = (await window.apiSpiralModule).default;
lktUtil = (await window.lktUtilModule).default;

const idPrefix = "#spiral-master-masterCode ";

let channelCdSearch, channelNmSearch;
let workOrderGrid;

let arrMenus = [];
let isDuplicateChecked = false; // 중복 확인 여부

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

  const requestData = {
    channelCd: channelCdSearch.option("value") || "",
    channelNm: channelNmSearch.option("value") || ""
  }

  const requestBody = JSON.stringify(requestData)


  apiSpiral
    .masterDestListGet(requestBody)
    .done(function (response) {
      try {
        let sampleData = response.data || [];
        
        workOrderGrid.option("dataSource", sampleData);
        console.log(response);


  
      } catch (ex) {}
    })
    .fail(function (e) {
     
  
    });
}

function showPopup(isModi, row) {
  let channelCdValue = row ? row.channelCd : ""; 
  let channelNmValue = row ? row.channelNm : ""; 
  let destFloorValue = row ? row.destFloor : ""; 


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
      if (!row) {
        row = workOrderGrid.getSelectedRowsData()[0] || null;
      }

      if (!isModi && !isDuplicateChecked) {
        DevExpress.ui.notify("중복 확인을 먼저 진행하세요.", "warning", 2000);
        return;
      }
      if (isModi) {
        const requestData = {
          data: [
            {
              actionType: "U",   //"U" 업데이트, "D" 삭제
              channelCd: formData.channelCd || "", 
              channelNm: formData.channelNm || "",
              destFloor: formData.destFloor || ""
            }
          ]
        };

        const requestBody = JSON.stringify(requestData)

        apiSpiral
          .masterDestUpdate(requestBody)
          .done(function (response) {
            try {
              //console.log(response);
              searchList();
            } catch (ex) {}
          })
          .fail(function (e) {
          
        
          });
      } else {
        const requestData = {
          channelCd: formData.channelCd || "",
          channelNm: formData.channelNm || "",
          destFloor: formData.destFloor || ""
        }; 
        const requestBody = JSON.stringify(requestData)

        apiSpiral
          .masterDestInsert(requestBody)
          .done(function (response) {
            try {
              //console.log(response);
              searchList();
            } catch (ex) {}
          })
          .fail(function (e) {
        
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
 // ✅ 중복 확인 API 요청 함수
 function checkDuplicate(channelCd, destFloor) {
  if (!channelCd?.trim() || !destFloor) {
    DevExpress.ui.notify("채널코드와 도착층을 입력하세요.", "warning", 2000);
    return;
  }
  const requestData = {
    channelCd: channelCd || "",
    destFloor: destFloor || ""
  };

  const requestBody = JSON.stringify(requestData)

  apiSpiral
    .masterDestDuplicateCheck(requestBody)
    .done(function (response) {
      try {
        let isDuplicate = response?.data?.isDuplicate
        console.log('api', response.data)
        if (isDuplicate) {
          isDuplicateChecked = false;
          DevExpress.ui.notify("중복된 데이터가 존재합니다.", "error", 2000);
        } else {
          isDuplicateChecked = true;
          DevExpress.ui.notify("사용 가능합니다.", "success", 2000);
         }
      } catch (e) {}
      
    })
    .fail(function (e) {
      
  
    });
}

//삭제 api
function deleteMasterCode(row){
  if (!row) {
      row = workOrderGrid.getSelectedRowsData()[0] || null;
  }

  if (!row?.channelCd) {
    DevExpress.ui.notify("삭제할 항목을 선택하세요.", "warning", 2000);
    return;
  }
  
  const requestData = {
    data: [
      {
        actionType: "D", // "D" 삭제
        channelCd: row.channelCd || "", 
        channelNm: row.channelNm || "",
        destFloor: row.destFloor || ""
      }
    ]
  };
  const requestBody = JSON.stringify(requestData)


  apiSpiral
    .masterDestUpdate(requestBody)
    .done(function (response) {
     try {
        searchList();
          DevExpress.ui.notify("삭제가 완료되었습니다.", "success", 2000);
      } catch (e) {}
    })
    .fail(function (e) {
     
  
    });
}

export default {
  onCreate,
  onActive
};
