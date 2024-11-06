let apiCommon;
let lktUtil;

if (!window.apiCommonModule || !window.lktUtilModule) {
  window.apiCommonModule = import(
    `../../../js/api/apiCommon.js?t=${Date.now()}`
  );
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiCommon = (await window.apiCommonModule).default;
lktUtil = (await window.lktUtilModule).default;

const idPrefix = "#exec-execEuc-execEuc ";

let workOrderGrid;
let workOrderGridDetail;

function onCreate() {
  // 왼쪽 그리드 설정

  let headerCss = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center"
  };
  workOrderGrid = $(idPrefix + "#workOrderGrid")
    .dxDataGrid({
      dataSource: [], // 데이터 소스 설정
      selection: {
        mode: "single" // 단일 셀렉션 모드
      },
      columns: [
        {
          dataField: "macroName",
          caption: "EUC 목록",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("EUC 목록");
          }
        }
      ],
      showBorders: true,
      paging: {
        enabled: false // 페이지 기능 비활성화
      },
      onRowClick: function (e) {
        const selectedRowData = e.data;
        showDynamicPopup(selectedRowData);
        //alert(selectedRowData);
      }
    })
    .dxDataGrid("instance");

  searchList();
}

function onActive() {}

// 동적 입력란 팝업 함수
function showDynamicPopup(rowData) {
  // 입력란 배열을 동적으로 생성

  let formItems = [];

  for (const itm of rowData.parameters) {
    let ftim = {
      dataField: "parameterCode",
      label: {text: itm.parameterName},
      editorType: "dxTextBox"
    };
    formItems.push(ftim);
  }

  // 팝업 생성
  $(idPrefix + "#dynamicPopup")
    .dxPopup({
      title: rowData.macroName,
      visible: true,
      width: 400,
      height: 300,
      showCloseButton: true,
      contentTemplate: function (contentElement) {
        // 동적 폼 생성
        $("<div>").appendTo(contentElement).dxForm({
          formData: {},
          items: formItems
        });

        // 실행, 취소 버튼 추가
        $("<div>")
          .appendTo(contentElement)
          .dxButton({
            text: "실행",
            onClick: function () {
              // euc 실행
              //loadDataDeatil();
              loadDataDetailProc(null);
              $(idPrefix + "#dynamicPopup").dxPopup("hide");
            }
          });

        $("<div>")
          .appendTo(contentElement)
          .dxButton({
            text: "취소",
            onClick: function () {
              $(idPrefix + "#dynamicPopup").dxPopup("hide");
            }
          });
      }
    })
    .dxPopup("show");
}

// 내보내기 버튼 클릭 이벤트
$("#btnExport").dxButton({
  stylingMode: "contained",
  type: "default",
  width: "100px",
  text: "내보내기",
  onClick: function () {
    const dataGrid = $(idPrefix + "#workOrderGridDetail").dxDataGrid(
      "instance"
    );

    // 엑셀 파일로 내보내기
    DevExpress.excelExporter
      .exportDataGrid({
        component: dataGrid,
        worksheet: new ExcelJS.Workbook().addWorksheet("Sheet 1")
      })
      .then(function (workbook) {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(
            new Blob([buffer], {type: "application/octet-stream"}),
            "rightGridData.xlsx"
          );
        });
      });
  }
});

function loadDataProc(aParam) {
  if (aParam == null) {
    aParam = [
      {
        macroCode: "SP_EUC_LIST",
        macroName: "EUC 목록 조회",
        parameters: [
          {
            parameterCode: "P_WORK_BATCH",
            parameterName: "출고차수",
            parameterPlaceholder: "출고차수",
            parameterDesc: "출고차수"
          },
          {
            parameterCode: "P_WORK_DATE",
            parameterName: "출고일자",
            parameterPlaceholder: "출고일자",
            parameterDesc: "출고일자 (yyyymmdd)"
          }
        ]
      }
    ];
  }

  workOrderGrid.option("dataSource", aParam);
}

function loadDataDetailProc(aParam) {
  if (aParam == null) {
    aParam = [
      {rst1: "test1", rst2: "테스트1"},
      {rst1: "test2", rst2: "테스트2"}
    ];

    // 오른쪽 그리드 초기화
    $(idPrefix + "#workOrderGridDetail").dxDataGrid({
      dataSource: aParam, // 데이터 소스 설정
      columns: [
        {dataField: "rst1", caption: "rst2"},
        {dataField: "rst2", caption: "rst2"}
      ],
      selection: {
        mode: "single" // 단일 셀렉션 모드
      },
      showBorders: true,
      paging: {
        pageSize: 10
      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [10, 25, 50],
        showInfo: true
      }
    });
  }
}

function searchList() {
  loadDataProc(null);

  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.GET.CORES.ENDUSER.COMPUTING"),
    lktBody: [{}]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiCommon
    .enduserComputing(encoded)
    .done(function (response) {})
    //loadData(response.lktBody);
    .fail(function () {
      // 에러 발생 시 처리
      alert("error");
    });
}

function searchListDetail(row) {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.GET.CORES.ENDUSER.COMPUTING.EXECUTE"),
    lktBody: [
      {
        centerCode: "HYN",
        clientCode: "HY",
        whrehouseCode: "HYN",
        procedureCode: "SP_LKTPUB_SAMPLE"
      }
    ]
  };

  var encoded = btoa(JSON.stringify(obj));
  apiCommon
    .enduserComputingExecute(encoded)
    .done(function (response) {})

    .fail(function () {
      alert("error");
    });
}

export default {
  onCreate,
  onActive
};
