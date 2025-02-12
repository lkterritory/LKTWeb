

function onCreate() {
  createCalendar();
  createDataGrid();
}


function createDataGrid(){
  $('#simple').dxTextBox({
    inputAttr: { 'aria-label': 'SSCC' },
  });

  $('#default-contained').dxButton({
    stylingMode: 'contained',
    text: 'Contained',
    type: 'default',
    width: 120,
    onClick() {
      DevExpress.ui.notify('The Contained button was clicked');
    },
  });

  $('#workOrderGrid').dxDataGrid({
    dataSource: './src/data/data.json',
    keyExpr: 'ID',
    columns: [
      {caption: 'No',dataField: 'ID',},
      'SSCC','PID',
      {
        caption: 'BCR > SMS',
        columns: [
          {caption: '상태', dataField: 'STATUS_1', },
          {caption: '인터페이스 시간​', dataField: 'CREATED_AT_1'}
        ]
      },
      {
        caption: 'SMS > WMS',
        columns: [
          { caption: '상태', dataField: 'STATUS_2'},
          { caption: '인터페이스 시간​', dataField: 'CREATED_AT_2'}
        ]
      },
      { 
        caption: 'WMS > SMS', 
        columns: [
          {caption: '상태', dataField: 'STATUS_3'},
          {caption: '인터페이스 시간​', dataField: 'CREATED_AT_3'}
        ]
      }, 
      {
        caption: 'SMS > BCR',
        columns: [
          {caption: '상태', dataField: 'STATUS_4'},
          {caption: '인터페이스 시간​', dataField: 'CREATED_AT_4'}
        ]
      },
      {caption: '도착층', dataField: 'ACTL_DEST_FLOOR'},
      {caption: '도착시간', dataField: 'TIME_ARRIVAL'}
    ],
    showBorders: true,
    
    // //fail일 경우 에러 툴팁 출력
    // onCellPrepared: function (e) {
    //   if (e.rowType === "data" && e.column.dataField.startsWith("STATUS") && e.value === "Fail") {
    //     e.cellElement.mouseover(function (arg) {
    //         tooltipInstance.option("contentTemplate", function (contentElement) {
    //             contentElement.html(
    //                 `<div> ${e.data.ERROR_MESSAGE_4}</div>`);
    //         });
    //         tooltipInstance.show(arg.target);
    //     });
    //     e.cellElement.mouseout(function (arg) {
    //         tooltipInstance.hide();
    //     });
    //   }
    // } 

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

  $('#range-selection').dxDateRangeBox({
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
    
    $('#days-selected').text(daysCount);
  }

  showSelectedDays({ value: initialValue });
}

function onActive() {}

export default {
  onCreate,
  onActive
};

