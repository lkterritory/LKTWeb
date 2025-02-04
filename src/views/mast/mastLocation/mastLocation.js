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

const idPrefix = "#mast-mastLocation-mastLocation ";

let txtBoxSearch;
let workOrderGrid;

function onCreate() {
  // 외부페이지 적용 테스트
  // // Define the iframe URL
  // const iframeUrl = "http://localhost/gnut";

  // // Create iframe element
  // const iframe = $(`<iframe src="${iframeUrl}" frameborder="0"></iframe>`);

  // // Add styles to iframe
  // iframe.css({
  //   width: "100%",
  //   height: "100%", // Full height
  //   border: "none",
  //   overflow: "auto"
  // });

  // // Append iframe to the target div
  // $(".work-order-content").append(iframe);
  // end 외부페이지 적용 테스트 end

  txtBoxSearch = $(idPrefix + "#txtBoxSearch")
    .dxTextBox({
      placeholder: "검색",
      value: "",
      width: "200px",
      onValueChanged: function (e) {
        //console.log("입력된 값:", e.value);
      },
      onEnterKey: function(e) { 
        searchList();
      }
    })
    .dxTextBox("instance");

  // 버튼 이벤트 처리
  $(idPrefix + "#btnDown").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Work Orders");

      DevExpress.excelExporter
        .exportDataGrid({
          component: workOrderGrid, // dxDataGrid 인스턴스
          worksheet: worksheet,
          autoFilterEnabled: true
        })
        .then(() => {
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(
              new Blob([buffer], {type: "application/octet-stream"}),
              "location.xlsx"
            );
          });
        });
    },
    width: "100px"
  });

  // 버튼 이벤트 처리
  $(idPrefix + "#btnUpload").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      $("#fileInput").click(); // 숨겨진 파일 선택 input 클릭
    },
    width: "100px"
  });

  // 버튼 이벤트 처리
  $(idPrefix + "#btnSearch").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      searchList();
    },
    width: "100px"
  });

  $(idPrefix + "#btnAdd").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      showPopup(false);
    },
    width: "100px"
  });

  $(idPrefix + "#btnDel").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      searchList();
    },
    width: "100px"
  });

  let headerCss = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center"
  };

  // "equipmentCode": "DAS-02",
  // "storageTemperatureCode": "RT",
  // "storageTemperatureName": "상온",
  // "indicatorCode": "94A718",
  // "storeCode": "KR0260",
  // "storeName": "KR0260",
  // "printConnectionAddress": "192.168.26.74",
  // "locationCode": "1L0116",
  // "locationName": "1L0116",
  // "stateCode": "01",
  // "stateName": "예"
  // DataGrid
  workOrderGrid = $(idPrefix + "#workOrderGrid")
    .dxDataGrid({
      dataSource: [], // 서버에서 데이터를 가져와서 할당
      columns: [
        {
          dataField: "locationCode",
          caption: "로케이션",
          width: 300,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("로케이션"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "equipmentCode",
          caption: "설비",
          width: 300,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("설비"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "indicatorCode",
          caption: "표시기",
          width: 300,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("표시기"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "printConnectionAddress",
          caption: "프린터",

          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("프린터"); // 헤더 가운데 정렬
          }
        },

        {
          dataField: "storeCode",
          caption: "지점",
          width: 300,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("지점"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "stateName",
          caption: "상태",
          width: 100,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상태"); // 헤더 가운데 정렬
          }
        }

        // {
        //   dataField: "storageTemperatureCode",
        //   caption: "온도대 코드",
        //   headerCellTemplate: function (headerCell) {
        //     headerCell.css(headerCss).text("온도대 코드"); // 헤더 가운데 정렬
        //   }
        // },
        // {
        //   dataField: "storageTemperatureName",
        //   caption: "온도대",
        //   headerCellTemplate: function (headerCell) {
        //     headerCell.css(headerCss).text("온도대"); // 헤더 가운데 정렬
        //   }
        // }
      ],

      paging: {enabled: false},
      showBorders: true,
      scrolling: {
        mode: "standard" // or "virtual" | "infinite"
      },
      selection: {
        mode: "single"
      },
      columnAutoWidth: true,
      allowColumnResizing: true, // 컬럼 사이즈 조절 여부
      headerFilter: {
        visible: true // 헤더 필터 드롭다운을 표시
      },
      onCellDblClick: function (e) {
        //alert(e.value);
        const selectedRowData = e.data;

        showPopup(true, selectedRowData, e.column.dataField);

        //showPopup(true, selectedRowData);
      }
    })
    .dxDataGrid("instance");
}

function onActive() { 
}

function searchList() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [
      {
        value: txtBoxSearch.option("value")
      }
    ]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiCommon
    .coresLocationGet(encoded)
    .done(function (response) {
      try {
        let sampleData = response.lktBody;

        workOrderGrid.option("dataSource", sampleData);
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

function showPopup(isModi, row, field) {
  let formItems = [
    {
      dataField: "locationCode",
      label: {text: "로케이션"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.locationCode : "",
        disabled: isModi
      }
    },
    {
      dataField: "equipmentCode",
      label: {text: "설비"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.equipmentCode : "",
        disabled: field != "equipmentCode"
      }
    },
    {
      dataField: "indicatorCode",
      label: {text: "표시기"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.indicatorCode : "",
        disabled: field != "indicatorCode"
      }
    },
    {
      dataField: "printConnectionAddress",
      label: {text: "프린터"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.printConnectionAddress : "",
        disabled: field != "printConnectionAddress"
      }
    },
    {
      dataField: "storeCode",
      label: {text: "지점"},
      editorType: "dxTextBox",
      editorOptions: {
        value: row != null ? row.storeCode : "",
        disabled: field != "storeCode"
      }
    },

    {
      dataField: "stateCode",
      label: {text: "사용유무"},
      editorType: "dxSelectBox",
      editorOptions: {
        items: [
          {id: "01", name: "사용"},
          {id: "00", name: "미사용"}
        ],
        displayExpr: "name",
        valueExpr: "id",
        value: row != null ? row.stateCode : "01",
        placeholder: "선택하세요", // 선택 안내 텍스트
        onValueChanged: function (e) {
          console.log("선택된 값:", e.value); // 선택된 id 값
        }
      }
    }
  ];

  // 팝업 호출
  lktUtil.createDynamicPopup({
    title: isModi ? "로케이션 수정" : "로케이션 등록",
    isModi: isModi, // 수정 여부
    formItems: formItems, // 폼 구성
    onExecute: function (formData) {
      var param = {
        lktHeader: lktUtil.getLktHeader("PAGE.LOCATION.GET"),
        lktBody: [
          {
            locationCode: formData.locationCode,
            equipmentCode: formData.equipmentCode,
            indicatorCode: formData.indicatorCode,
            printConnectionAddress: formData.printConnectionAddress,
            storageTemperatureCode: row.storageTemperatureCode,
            storeCode: formData.storeCode,
            stateCode: formData.stateCode
          }
        ]
      };

      if (isModi) {
        apiCommon
          .coresLocationEdit(JSON.stringify(param))
          .done(function (response) {})
          .fail(function () {});
      } else {
        apiCommon
          .coresLocationAdd(JSON.stringify(param))
          .done(function (response) {})
          .fail(function () {});
      }

      $("#dynamicPopup").dxPopup("hide");
    },
    onCancel: function () {
      // 취소 버튼 클릭 이벤트 처리
      $("#dynamicPopup").dxPopup("hide");
    }
  });
}

// 엑셀 업로드 함수
window.uploadExcel = function (fileInput) {
  const file = fileInput.files[0]; // 업로드된 파일
  if (!file) return;

  const workbook = new ExcelJS.Workbook();
  const reader = new FileReader();

  reader.onload = function (event) {
    const buffer = event.target.result;

    workbook.xlsx.load(buffer).then((workbook) => {
      const worksheet = workbook.getWorksheet(1); // 첫 번째 워크시트

      const data = [];
      worksheet.eachRow((row, rowIndex) => {
        if (rowIndex === 1) {
          // 첫 번째 행은 헤더로 간주, 필요시 무시
          console.log("Header Row:", row.values);
          return;
        }

        const rowData = row.values;
        data.push({
          locationCode: rowData[1], // 첫 번째 열
          equipmentCode: rowData[2], // 두 번째 열
          indicatorCode: rowData[3], // 세 번째 열
          printConnectionAddress: rowData[4], // 네 번째 열
          storeCode: rowData[5], // 다섯 번째 열
          storageTemperatureCode: "RT",
          stateCode: "01"
        });
      });

      console.log("Parsed Data:", data);

      fileInput.value = ""; // 파일 선택 초기화

      var param = {
        lktHeader: lktUtil.getLktHeader("PAGE.LOCATION.GET"),
        lktBody: data
      };

      // alert(JSON.stringify(param));
      // return;
      apiCommon
        .coresLocationAdd(JSON.stringify(param))
        .done(function (response) {
          searchList();
        })
        .fail(function () {});
    });
  };

  reader.readAsArrayBuffer(file); // 파일 읽기
};

export default {
  onCreate,
  onActive
};
