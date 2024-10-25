import apiCommon from "../../../js/apiCommon.js?";

$(document).ready(function () {
  //loadData();
  loadDataProc(null);
  //loadDetailData();

  function loadData() {
    var obj = {
      lktHeader: {
        type: "REQUEST",
        call: "PAGE.GET.REPORT.VIEWER",
        status: 0,
        message: "",
        authentication:
          "eyJjZW50ZXJDb2RlIjoiTEtUIiwiY2xpZW50Q29kZSI6IkxLVCIsIndhcmVob3VzZUNvZGUiOiJMS1QiLCJkYXRhYmFzZSI6eyJzZXJ2ZXIiOiIyMTEuMTEwLjIyOS4yMzkiLCJwb3J0IjoiMzMwNiIsImRhdGFiYXNlIjoiTEtUIiwidXNlcm5hbWUiOiJzcGMiLCJwYXNzd29yZCI6IjEwMTBxcHFwITNNIiwgImF0dHJpYnV0ZTAxIjoiTVlTUUwifSwid2FzIjp7InNlcnZlciI6IjIxMS4xMTAuMjI5LjIzOSIsInBvcnQiOiIxNDMzIn0sIm1xdHQiOnsic2VydmVyIjoiMjExLjExMC4yMjkuMjM5IiwicG9ydCI6IjE0MzMiLCJ1c2VybmFtZSI6ImxrdDBkYmEwMF9sa3QwMCIsInBhc3N3b3JkIjoiZGxkbmR5ZCEzTSJ9fQ==",
        userName: "LKT",
        centerCode: "LKT",
        clientCode: "LKT",
        warehouseCode: "LKT"
      },
      lktBody: [{}]
    };

    var encoded = btoa(JSON.stringify(obj));

    apiCommon
      .reportViewer(encoded)
      .done(function (response) {})
      //loadData(response.lktBody);
      .fail(function () {
        // 에러 발생 시 처리
        alert("error");
      });
  }

  function loadDataDeatil() {
    var obj = {
      lktHeader: {
        type: "REQUEST",
        call: "PAGE.GET.CORES.REPORT.VIEWER.EXECUTE",
        status: 0,
        message: "",
        authentication:
          "eyJjZW50ZXJDb2RlIjoiTEtUIiwiY2xpZW50Q29kZSI6IkxLVCIsIndhcmVob3VzZUNvZGUiOiJMS1QiLCJkYXRhYmFzZSI6eyJzZXJ2ZXIiOiIyMTEuMTEwLjIyOS4yMzkiLCJwb3J0IjoiMzMwNiIsImRhdGFiYXNlIjoiTEtUIiwidXNlcm5hbWUiOiJzcGMiLCJwYXNzd29yZCI6IjEwMTBxcHFwITNNIiwgImF0dHJpYnV0ZTAxIjoiTVlTUUwifSwid2FzIjp7InNlcnZlciI6IjIxMS4xMTAuMjI5LjIzOSIsInBvcnQiOiIxNDMzIn0sIm1xdHQiOnsic2VydmVyIjoiMjExLjExMC4yMjkuMjM5IiwicG9ydCI6IjE0MzMiLCJ1c2VybmFtZSI6ImxrdDBkYmEwMF9sa3QwMCIsInBhc3N3b3JkIjoiZGxkbmR5ZCEzTSJ9fQ==",
        userName: "LKT",
        centerCode: "LKT",
        clientCode: "LKT",
        warehouseCode: "LKT"
      },
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
      .reportViewerExecute(encoded)
      .done(function (response) {})

      .fail(function () {
        alert("error");
      });
  }

  function loadDataProc(aParam) {
    if (aParam == null) {
      aParam = [
        {
          macroCode: "SP_REPORT_LIST",
          macroName: "보고서 목록 조회",
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

    // 왼쪽 그리드 설정
    $("#leftGrid").dxDataGrid({
      dataSource: aParam, // 데이터 소스 설정
      selection: {
        mode: "single" // 단일 셀렉션 모드
      },
      columns: [{dataField: "macroName", caption: "보고서 목록 조회"}],
      showBorders: true,
      paging: {
        enabled: false // 페이지 기능 비활성화
      },
      onRowClick: function (e) {
        const selectedRowData = e.data;
        showDynamicPopup(selectedRowData);
        //alert(selectedRowData);
      }
    });
  }

  function loadDataDetailProc(aParam) {
    if (aParam == null) {
      aParam = [
        {rst1: "test1", rst2: "테스트1"},
        {rst1: "test2", rst2: "테스트2"}
      ];

      // 오른쪽 그리드 초기화
      $("#rightGrid").dxDataGrid({
        dataSource: aParam, // 데이터 소스 설정
        columns: [
          {dataField: "rst1", caption: "rst2"},
          {dataField: "rst2", caption: "rst2"}
        ],
        showBorders: true,
        paging: {
          pageSize: 10
        },
        selection: {
          mode: "single" // 단일 셀렉션 모드
        },
        pager: {
          showPageSizeSelector: true,
          allowedPageSizes: [10, 25, 50],
          showInfo: true
        }
      });
    }
  }

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
    $("#dynamicPopup")
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
                // 보고서 실행
                //loadDataDeatil();
                loadDataDetailProc(null);
                $("#dynamicPopup").dxPopup("hide");
              }
            });

          $("<div>")
            .appendTo(contentElement)
            .dxButton({
              text: "취소",
              onClick: function () {
                $("#dynamicPopup").dxPopup("hide");
              }
            });
        }
      })
      .dxPopup("show");
  }

  // 내보내기 버튼 클릭 이벤트
  $("#exportButton").dxButton({
    text: "내보내기",
    onClick: function () {
      const dataGrid = $("#rightGrid").dxDataGrid("instance");

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
});
