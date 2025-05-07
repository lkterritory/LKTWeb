
let apiSpiral;

if (!window.apiSpiralModule) {
  window.apiSpiralModule = import(`../../../js/api/apiSpiral.js?t=${Date.now()}`);
}

apiSpiral = (await window.apiSpiralModule).default;

let workOrderGrid;

const idPrefix = "#spiral-work-workList ";


let selectedStartDate = null;
let selectedEndDate = null;

let searchTextValue = "";
let extractedData = [];

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
      searchTextValue = e.value;  
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

  workOrderGrid = $(idPrefix + '#workOrderGrid').dxDataGrid({
    dataSource: [],
    columns: [
      //{caption: 'No',dataField: 'ID',},
      {
        caption: 'sscc', 
        dataField: 'sscc',
        headerFilter: {
          search: { enabled: true } 
        }
      },
      {
        caption: 'pid', 
        dataField: 'pid',
        headerFilter: {
          search: { enabled: true } 
        }
      },
      {
        caption: 'BCR > SMS',
        columns: [
          {
            caption: '상태', 
            dataField: 'status1',
            headerFilter: {
              search: { enabled: true } 
            }
           },
          {
            caption: '인터페이스 시간​', 
            dataField: 'createdAt1',
            headerFilter: {
              search: { enabled: true } 
            }
          }
        ]
      },
      {
        caption: 'SMS > WMS',
        columns: [
          { 
            caption: '상태', 
            dataField: 'status2',
            headerFilter: {
              search: { enabled: true } 
            }
          },
          { 
            caption: '인터페이스 시간​', 
            dataField: 'createdAt2',
            headerFilter: {
              search: { enabled: true } 
            }
          }
        ]
      },
      { 
        caption: 'WMS > SMS', 
        columns: [
          {
            caption: '상태', 
            dataField: 'status3'
          },
          {
            caption: '인터페이스 시간​', 
            dataField: 'createdAt3',
            headerFilter: {
              search: { enabled: true } 
            }
          }
        ]
      }, 
      {
        caption: 'SMS > BCR',
        columns: [
          {
            caption: '상태', 
            dataField: 'status4'
          },
          {
            caption: '인터페이스 시간​',
            dataField: 'createdAt4',
            headerFilter: {
              search: { enabled: true } 
            }
          }
        ]
      },
      {
        caption: '도착층', 
        dataField: 'actlDestFloor',
        headerFilter: {
          search: { enabled: true } 
        }
      },
      {
        caption: '도착시간', 
        dataField: 'timeArrival',
        headerFilter: {
          search: { enabled: true } 
        }
      }
    ],
    showBorders: true,
    
    //fail일 경우 에러 툴팁 출력
    onCellPrepared: function (e) {
      if (e.rowType === "data" && e.column.dataField.startsWith("status") && e.value === "Fail") {
        e.cellElement.mouseover(function (arg) {
            tooltipInstance.option("contentTemplate", function (contentElement) {
                contentElement.html(
                    `<div> ${e.data.errorMessage}</div>`);
            });
            tooltipInstance.show(arg.target);
        });
        e.cellElement.mouseout(function (arg) {
            tooltipInstance.hide();
        });
      }
    } 

  }).dxDataGrid("instance");;
  //에러 툴팁
  let tooltipInstance = $("#tooltipContainer").dxTooltip({
    position: "right"
  }).dxTooltip("instance");

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
    .historyListGet(requestBody)
    .done(function (response) {
      try {
        console.log(response)
        let workDataList = response.data || [];      

        if (workOrderGrid) {
          workOrderGrid.option("dataSource", workDataList);
          workOrderGrid.refresh(); 
        }
      } catch (ex) {}
    })
    .fail(function (e) {
     
  
    });
    
}




function onActive() {}

function onDestroy() {

}

export default {
  onCreate,
  onActive,
  onDestroy
};


