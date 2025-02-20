const idPrefix = "#spiral-master-masterCode ";

function onCreate() {
  createDataGrid();
}

let codeData = [] // 데이터 저장 변수

async function fetchData() {
  try {
    const response = await $.ajax({
      url: './src/data/masterCode.json',
      method: 'GET',
      dataType: 'json'
    });
    codeData = response; // 전역 변수에 데이터 저장
    return codeData; // 데이터 반환
  } catch (error) {
    return null;
  }
}

const floorData = [
  { ID: 1, Name: "2F" },
  { ID: 2, Name: "3F" }
];

async function createDataGrid() {
  await fetchData();

  const masterCode = new DevExpress.data.ArrayStore({
    key: 'ID',
    data: codeData,  // 데이터를 ArrayStore로 관리
  });

  const dataGrid = $(idPrefix + '#workOrderGrid').dxDataGrid({
    dataSource: masterCode,
    keyExpr: 'ID',
    showBorders: true,
    paging: { enabled: false },
    selection: {
      mode: 'multiple',
    },
    editing: {
      mode: 'popup',
      allowAdding: true,  //데이터 추가
      //allowUpdating: true, //데이터 수정
      //allowDeleting: true, //데이터 삭제
      popup: {
        title: '분류 마스터 코드',
        showTitle: true,
        width: 500,
        height: 300
      },
      form: {
        items: [{
          itemType: 'group',
          colCount: 1,
          colSpan: 2,
          items: [
            {
              dataField: 'CHANNEL_CD',
            },
            {
              dataField: 'CHANNEL_NM',
            },
            {
              dataField: 'StateID',
            },
          ],
        }],
      },
    },
    columns: [
      { dataField: 'CHANNEL_CD', caption: '채널코드' },
      { dataField: 'CHANNEL_NM', caption: '채널명' },
      {
        dataField: 'StateID',
        caption: '도착층',
        lookup: {
          dataSource: floorData,
          displayExpr: 'Name',
          valueExpr: 'ID',
        },
      },
      { dataField: 'CREATED_BY', caption: '생성자' },
      { dataField: 'CREATED_AT', caption: '생성시간' },
      { dataField: 'UPDATED_BY', caption: '수정자' },
      { dataField: 'UPDATED_AT', caption: '수정시간' },
    ],
    toolbar: {
      items: [
        {
          location: 'before',
          widget: 'dxTextBox',
          options: {
            placeholder: "채널코드",
            onValueChanged: function (e) {
              searchValues.channelCd = e.value.toLowerCase();
            },
            onEnterKey: function () {
              applyFilter();
            }
          }
        },
        {
          location: 'before',
          widget: 'dxTextBox',
          options: {
            placeholder: "채널명",
            onValueChanged: function (e) {
              searchValues.channelNm = e.value.toLowerCase();
            },
            onEnterKey: function () {
              applyFilter();
            }
          }
        },
        {
          location: 'after',
          name: 'addRowButton',
          showText: 'always',
          options: {
            text: '추가',
          }
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            text: '삭제',
            icon: 'trash',
            disabled: true,
            onClick() {
              let selectedKeys = dataGrid.getSelectedRowKeys();
              
              // 선택된 항목만 삭제
              codeData = codeData.filter(emp => !selectedKeys.includes(emp.ID));

              // ArrayStore에 데이터 갱신
              masterCode.clear();  // 기존 데이터 제거
              masterCode.push(codeData.map(item => ({ type: 'insert', data: item })));  // 새로운 데이터 삽입

              // DataGrid 업데이트
              dataGrid.refresh();  // 데이터를 갱신
            },
          },
        },
      ],
    },
    onSelectionChanged(data) {
      dataGrid.option('toolbar.items[3].options.disabled', !data.selectedRowsData.length);
    },
  }).dxDataGrid('instance');

  const searchValues = {
    channelCd: '',
    channelNm: ''
  };

  // 필터 적용 함수
  function applyFilter() {
    dataGrid.filter([
      ['CHANNEL_CD', 'contains', searchValues.channelCd],
      'and',
      ['CHANNEL_NM', 'contains', searchValues.channelNm]
    ]);
  }
}

function onActive() {}

export default {
  onCreate,
  onActive
};

