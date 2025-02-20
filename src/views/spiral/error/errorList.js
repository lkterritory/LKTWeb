const idPrefix = "#spiral-error-errorList ";


function onCreate() {
  createCalendar();
  createDataGrid();
}

function createDataGrid(){
  $(idPrefix + '#searchBox').dxTextBox({
    inputAttr: { 'aria-label': 'SSCC' },
  });

  $(idPrefix + '#searchButton').dxButton({
    stylingMode: 'contained',
    text: 'Contained',
    type: 'default',
    width: 120,
    onClick() {
      DevExpress.ui.notify('The Contained button was clicked');
    },
  });
  
  $(idPrefix + '#workOrderGrid').dxDataGrid({
    dataSource: './src/data/data.json',
  
    columns: [
      {caption: 'No',dataField: 'ID'},
      'SSCC',
      'PID',
      {caption: 'From', dataField: 'FROM_SYSTEM'},
      {caption: 'To', dataField: 'TO_SYSTEM',},
      {caption: '에러 일시', dataField: 'CREATED_AT_3'},
      {caption: '에러 사유', dataField: 'ERROR_MESSAGE_3'},
    
      
    ],
    showBorders: true,
    
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
    onValueChanged: showSelectedDays,
  });

  function getCurrentMonthRange() {
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    const min = new Date(now.setDate(1));
    const max = new Date(now.setDate(lastDay));

    return { min, max };
  }

  function showSelectedDays({ value: [startDate, endDate] }) {

    let daysCount = 0;
    if (startDate && endDate) {
      daysCount = (endDate - startDate) / msInDay + 1;
    }
    
    $(idPrefix + '#days-selected').text(daysCount);
  }

  showSelectedDays({ value: initialValue });
}

function onActive() {}

export default {
  onCreate,
  onActive
};

