
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

function onCreate() {
  $(idPrefix + '#searchBox').dxTextBox({
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
  createCalendar();
  
  searchList();
}


function searchList(){

  $("#errorPopup").dxPopup({
    width: 400,
    height: 250,
    visible: false,
    dragEnabled: true,
    showCloseButton: true
  });

  const requestData = {
    requestDateFrom: selectedStartDate || "", 
    requestDateTo: selectedEndDate || "",
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

export default {
  onCreate,
  onActive,
};

