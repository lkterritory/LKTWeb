let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;


let intervalList = null;
let intervalPrintMq = null;

let workOrderGrid;
const idPrefix = "#spiral-error-errorList ";

let selectedStartDate = null;
let selectedEndDate = null;

let searchTextValue = "";
let extractedData = [];



function onCreate() {
  createCalendar();
  createDataGrid();
  searchList();
}


function createDataGrid(){
  $(idPrefix + '#searchBox').dxTextBox({
    inputAttr: { 'aria-label': 'SSCC' },
    onValueChanged: function (e) {
      searchTextValue = e.value || "";
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
      //{caption: 'No',dataField: 'ID'},
      {caption: 'SSCC',dataField: 'sscc'},
      {caption: 'PID',dataField: 'pid'},
      {caption: 'From', dataField: 'fromSystem'},
      {caption: 'To', dataField: 'toSystem',},
      {caption: '에러 일시', dataField: 'createdAt'},
      {caption: '에러 사유', dataField: 'errorMessage'},
    
      
    ],
    showBorders: true,
    
  });
}
function searchList(){

  $("#errorPopup").dxPopup({
    title: "에러 발생",
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

  apiWcs
    .errorListGet(requestBody)
    .done(function (response) {
      try {
        
        let errorDataList = response.lktBody;
        extractedData = errorDataList.flatMap(obj => obj.data || []); 

        console.log("변환된 데이터:", extractedData); 

        if (workOrderGrid) {
          workOrderGrid.option("dataSource", extractedData);
          workOrderGrid.refresh(); 
        }
      } catch (ex) {}
    })
    .fail(function (jqXHR) {
      let errorStatus = 'Failed';
      let errorMessage = "알 수 없는 오류가 발생했습니다.";
      let errorCode = "ERROR";

      try {
        if (jqXHR.responseJSON) {
          let response = jqXHR.responseJSON;
          
          errorStatus = response.status || errorStatus;
          errorCode = response.code || errorCode;
          errorMessage = response.message || errorMessage;
        }
      } catch (e) {}
  
      // 에러 메시지를 팝업에 표시
      $("#errorMessage").html(`
          <p><strong>상태:</strong> ${errorStatus}</p>
          <p><strong>코드:</strong> ${errorCode}</p>
          <p><strong>메시지:</strong> ${errorMessage}</p>
      `);
  
      $("#errorPopup").dxPopup("instance").show();
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

