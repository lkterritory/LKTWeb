
let apiSpiral;

if (!window.apiSpiralModule) {
  window.apiSpiralModule = import(`../../../js/api/apiSpiral.js?t=${Date.now()}`);
}

apiSpiral = (await window.apiSpiralModule).default;



const idPrefix = "#spiral-error-errorList ";

let selectedStartDate = null;
let selectedEndDate = null;

let searchTextValue = "";
let workOrderGrid;
let dtBoxWork;
let searchBox;

function onCreate() {

  dtBoxWork = $(idPrefix + "#dtBoxWork")
  .dxDateBox({
    type: "date",
    displayFormat: "yyyy-MM-dd",
    value: new Date(),
    width: "200px",
    onValueChanged: function () {
      searchList();
    }
  })
  .dxDateBox("instance");

  searchBox = $(idPrefix + '#searchBox').dxTextBox({
    inputAttr: { 'aria-label': 'SSCC' },
    onValueChanged: function (e) {
      searchTextValue = e.value || "";
      if (e.value) {
        searchList(); 
      }
    }
  });

  $(idPrefix + '#searchButton').dxButton({
    stylingMode: 'contained',
    text: 'Contained',
    type: 'default',
    width: 120,
    onClick() {
      searchList();
   },
  });

  workOrderGrid = $(idPrefix + '#workOrderGrid')
    .dxDataGrid({
      dataSource: [],
  
    columns: [
      //{caption: 'No',dataField: 'ID'},
      {caption: 'SSCC',dataField: 'sscc'},
      {caption: 'PID',dataField: 'pid'},
      {caption: 'From', dataField: 'fromSystem'},
      {caption: 'To', dataField: 'toSystem',},
      {caption: '에러 일시', dataField: 'createdAt'},
      {caption: '에러 사유', dataField: 'errorMessage'},
    
      
    ],
    showBorders: true,
    
  }) .dxDataGrid("instance");
  
  searchList();
}


function searchList(){


   const requestData = {
    requestDateFrom:  DevExpress.localization.formatDate(
      $("#dtBoxWork").dxDateBox("instance").option("value"),
      "yyyy-MM-dd"
    ),
    requestDateTo:DevExpress.localization.formatDate(
      $("#dtBoxWork").dxDateBox("instance").option("value"),
      "yyyy-MM-dd"
    ),
    sscc: searchTextValue || "",
  };

  const requestBody = JSON.stringify(requestData)

  apiSpiral
    .errorListGet(requestBody)
    .done(function (response) {
      try {
        let sampleData = response.data || [];
        console.log(sampleData);
        // 데이터 그리드에 데이터 설정
        if (workOrderGrid) {
          workOrderGrid.option("dataSource", sampleData);  // 데이터 그리드에 데이터 연결
          workOrderGrid.refresh();  // 그리드 갱신
      }
        
      } catch (ex) {
        console.error(" 데이터 처리 중 오류 발생:", ex);
      }
    })
    .fail(function (e) {
     
  
    });
}



function onActive() {}
function onDestroy() {}

export default {
  onCreate,
  onActive,
  onDestroy,

};


