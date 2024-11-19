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
          dataField: "endUserComputingName",
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

  // 내보내기 버튼 클릭 이벤트
  $(idPrefix + "#btnExport").dxButton({
    stylingMode: "contained",
    type: "default",
    width: "100px",
    text: "내보내기",
    onClick: function () {
      const dataGrid = $(idPrefix + "#workOrderGridDetail").dxDataGrid(
        "instance"
      );

      // 엑셀 파일로 내보내기
      if (typeof ExcelJS !== "undefined") {
        // ExcelJS 확인
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet 1");

        DevExpress.excelExporter
          .exportDataGrid({
            component: dataGrid,
            worksheet: worksheet
          })
          .then(function () {
            workbook.xlsx.writeBuffer().then(function (buffer) {
              saveAs(
                new Blob([buffer], {type: "application/octet-stream"}),
                `EUC__${Date.now()}.xlsx`
              );
            });
          })
          .catch(function (error) {
            console.error("Error exporting data grid:", error);
          });
      } else {
        console.error("ExcelJS is not loaded.");
      }
    }
  });
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
      dataField: itm.endUserComputingParamterCode,
      label: {text: itm.endUserComputingParamterName},
      editorType: "dxTextBox"
    };
    formItems.push(ftim);
  }

  let formData = {};

  // // 팝업 생성
  // $("#dynamicPopup")
  //   .dxPopup({
  //     title: rowData.macroName,
  //     visible: true,
  //     width: 400,
  //     height: "auto",
  //     showCloseButton: true,
  //     contentTemplate: function (contentElement) {
  //       // 동적 폼 생성
  //       $("<div>").appendTo(contentElement).dxForm({
  //         formData: formData,
  //         items: formItems
  //       });

  //       // 실행, 취소 버튼 추가

  //       $("<div>")
  //         .appendTo(contentElement)
  //         .dxButton({
  //           text: "실행",
  //           onClick: function () {
  //             // euc 실행
  //             //loadDataDeatil();

  //             searchListDetail(formData, rowData);
  //             $(idPrefix + "#dynamicPopup").dxPopup("hide");
  //           }
  //         });

  //       $("<div>")
  //         .appendTo(contentElement)
  //         .dxButton({
  //           text: "취소",
  //           onClick: function () {
  //             $(idPrefix + "#dynamicPopup").dxPopup("hide");
  //           }
  //         });
  //     }
  //   })
  //   .dxPopup("show");

  // 팝업 호출
  lktUtil.createDynamicPopup({
    title: rowData.endUserComputingName,
    isModi: false, // 수정 여부
    formItems: formItems, // 폼 구성
    onExecute: function (formData) {
      searchListDetail(formData, rowData);
      $("#dynamicPopup").dxPopup("hide");
    },
    onCancel: function () {
      // 취소 버튼 클릭 이벤트 처리
      $("#dynamicPopup").dxPopup("hide");
    }
  });
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
  } else {
    // 오른쪽 그리드 초기화

    let columnsRst = [];

    for (let i = 0; i < aParam.length; i++) {
      //alert(JSON.stringify(aParam[i]));

      if (i == 0) {
        let keys = Object.keys(aParam[i]);
        for (let key of keys) {
          columnsRst.push({
            dataField: key,
            caption: key
          });
        }
      }
    }

    // for (info of aParam) {
    //   columnsRst.push({
    //     dataField: Object.keys(info)[0],
    //     caption: Object.keys(info)[0]
    //   });
    // }

    $(idPrefix + "#workOrderGridDetail").dxDataGrid({
      dataSource: aParam, // 데이터 소스 설정
      columns: columnsRst,
      selection: {
        mode: "single" // 단일 셀렉션 모드
      },
      showBorders: true
    });
  }
}

function searchList() {
  //loadDataProc(null);

  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.GET.CORES.ENDUSER.COMPUTING"),
    lktBody: [{}]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiCommon
    .enduserComputing(encoded)
    .done(function (response) {
      loadDataProc(response.lktBody);
    })
    .fail(function () {
      // 에러 발생 시 처리
      alert("error");
    });
}

function searchListDetail(row, rowOri) {
  //  alert(JSON.stringify(row));

  $(idPrefix + "#workOrderGridDetail").dxDataGrid({
    dataSource: [], // 데이터 소스 설정
    columns: [],
    selection: {
      mode: "single" // 단일 셀렉션 모드
    },
    showBorders: true
  });

  workOrderGrid.option("dataSource", []);
  workOrderGrid.refresh(); // 그리드를 새로고침하여 빈 상태를 반영

  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.GET.CORES.ENDUSER.COMPUTING.EXECUTE"),
    lktBody: [
      {
        endUserComputingCode: rowOri.endUserComputingCode,
        lktOutDataDetail: row
      }
    ]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiCommon
    .enduserComputingExecute(encoded)
    .done(function (response) {
      loadDataDetailProc(response.lktBody);
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
