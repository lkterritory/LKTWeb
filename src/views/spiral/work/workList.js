let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;

let workOrderGrid;
let intervalList = null;
let intervalPrintMq = null;

const idPrefix = "#spiral-work-workList ";


let selectedStartDate = null;
let selectedEndDate = null;

let searchTextValue = "";
let extractedData = [];

function onCreate() {
 
  createCalendar();
  createDataGrid();
  searchList()
}

function searchList(){

  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [
      {
        requestDateFrom: selectedStartDate,
        requestDateTo: selectedEndDate,
        sscc: searchTextValue,
      }
    ]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .historyListGet(encoded)
    .done(function (response) {
      try {
        let wrokDataList = response.lktBody;
        extractedData = wrokDataList.flatMap(obj => obj.data || []); 

        console.log(extractedData)

        if (workOrderGrid) {
          workOrderGrid.option("dataSource", extractedData);
          workOrderGrid.refresh(); 
        }
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}
function createDataGrid(){
  $(idPrefix + '#searchBox').dxTextBox({
    inputAttr: { 'aria-label': 'SSCC' },
    onValueChanged: function (e) {
      searchTextValue = e.value; 
      console.log("📢 입력된 값:", searchTextValue); 
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
      'sscc','pid',
      {
        caption: 'BCR > SMS',
        columns: [
          {caption: '상태', dataField: 'status1', },
          {caption: '인터페이스 시간​', dataField: 'createdAt1'}
        ]
      },
      {
        caption: 'SMS > WMS',
        columns: [
          { caption: '상태', dataField: 'status2'},
          { caption: '인터페이스 시간​', dataField: 'createdAt2'}
        ]
      },
      { 
        caption: 'WMS > SMS', 
        columns: [
          {caption: '상태', dataField: 'status3'},
          {caption: '인터페이스 시간​', dataField: 'createdAt3'}
        ]
      }, 
      {
        caption: 'SMS > BCR',
        columns: [
          {caption: '상태', dataField: 'status4'},
          {caption: '인터페이스 시간​', dataField: 'createdAt4'}
        ]
      },
      {caption: '도착층', dataField: 'actlDestFloor'},
      {caption: '도착시간', dataField: 'timeArrival'}
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

  });
  //에러 툴팁
  let tooltipInstance = $("#tooltipContainer").dxTooltip({
    position: "right"
  }).dxTooltip("instance");

}



//캘린더
function createCalendar(){
  const msInDay = 1000 * 60 * 60 * 24;
  const now = new Date();
  const initialValue = [
    new Date(now.getTime() - msInDay * 3),
    new Date(now.getTime() + msInDay * 3),
  ];

  $(idPrefix + '#calendarContainer').dxDateRangeBox({
    value: initialValue,
    onValueChanged: function(e) {
      updateSelectedDates(e); 
      
      if(selectedStartDate && selectedEndDate){
        searchList();
      }
    }
  });

  // kr 시간으로 변경
  function formatDateToLocal(date) {
    let offset = date.getTimezoneOffset() * 60000; 
    let localDate = new Date(date.getTime() - offset); 
    return localDate.toISOString().split('T')[0]; 
  }

  function getCurrentMonthRange() {
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    const min = new Date(now.setDate(1));
    const max = new Date(now.setDate(lastDay));

    return { min, max };
  }

  function updateSelectedDates({ value: [startDate, endDate] }) {
   
    let daysCount = 0;
    if (startDate && endDate) {
      daysCount = (endDate - startDate) / msInDay + 1;
    }
    startDate = startDate ? formatDateToLocal(startDate) : null;
    endDate = endDate ? formatDateToLocal(endDate) : null;

    selectedStartDate = startDate;
    selectedEndDate = endDate;

    $(idPrefix + '#days-selected').text(daysCount);

  }

  updateSelectedDates({ value: initialValue });
}

function onActive() {}

function onDestroy() {
  // alert("dest");

  if (intervalList) {
    clearInterval(intervalList);
    intervalList = null;
  }

  if (intervalPrintMq) {
    clearInterval(intervalPrintMq);
    intervalPrintMq = null;
  }
}

export default {
  onCreate,
  onActive,
  onDestroy
};

