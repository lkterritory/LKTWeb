
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
    dataSource: '../../data/data.json',
    keyExpr: 'ID',
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

createDataGrid();