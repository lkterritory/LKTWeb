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

const idPrefix = "#exec-execReport-execReport ";

let workOrderGrid;

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
          dataField: "reportName",
          caption: "EUC 목록"
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
  rowData.lktOutDataDetail =
    rowData.lktOutDataDetail != null ? rowData.lktOutDataDetail : [];

  for (const itm of rowData.lktOutDataDetail) {
    let ftim = {
      dataField: itm.reportParamterCode,
      label: {text: itm.reportParamterName},
      editorType: "dxTextBox"
    };
    formItems.push(ftim);
  }

  let formData = {};

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
          formData: formData,
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

              searchListDetail(formData, rowData);
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

function loadDataProc(aParam) {
  if (aParam == null) {
    aParam = [
      {
        centerCode: "LKT",
        clientCode: "LKT",
        warehouseCode: "LKT",
        endUserComputingCode: "SP_LKT_EUC_OUTBOUND_LOCATION_GET",
        endUserComputingName: "#01. 로케이션 정보",
        endUserComputingDescription: "#01. 로케이션 정보"
      }
    ];
  }

  workOrderGrid.option("dataSource", aParam);
}

function searchList() {
  //loadDataProc(null);

  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.GET.CORES.REPORT.VIEWER"),
    lktBody: [{}]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiCommon
    .reportViewer(encoded)
    .done(function (response) {
      try {
        loadDataProc(response.lktBody);
      } catch (ex) {}
    })

    .fail(function () {
      // 에러 발생 시 처리
    });
}

// function searchListDetail(row) {
//   var obj = {
//     lktHeader: lktUtil.getLktHeader("PAGE.GET.CORES.REPORT.VIEWER.EXECUTE"),
//     lktBody: [
//       {
//         centerCode: "HYN",
//         clientCode: "HY",
//         whrehouseCode: "HYN",
//         procedureCode: "SP_LKTPUB_SAMPLE"
//       }
//     ]
//   };

//   var encoded = btoa(JSON.stringify(obj));
//   apiCommon
//     .reportViewerExecute(encoded)
//     .done(function (response) {})

//     .fail(function () {
//       alert("error");
//     });
// }

function searchListDetail(row, rowOri) {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.GET.CORES.ENDUSER.COMPUTING.EXECUTE"),
    lktBody: [
      {
        reportCode: rowOri.reportCode,
        lktOutDataDetail: row
      }
    ]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiCommon
    .reportViewerExecute(encoded)
    .done(function (response) {
      //loadDataDetailProc(response.lktBody);
      //loadDataProc(response.lktBody);
    })

    .fail(function () {
      alert("error");
    });
}

export default {
  onCreate,
  onActive
};
