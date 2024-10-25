import apiWcs from "../../../js/apiWcs";

$(document).ready(function () {
  loadDataProc();

  function loadData() {
    var obj = {
      lktHeader: {
        type: "REQUEST",
        call: "PAGE.OUTBOUNDS.STATUS.EQUIPMENT",
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
          workDate: "2024-02-17"
        }
      ]
    };

    var encoded = btoa(JSON.stringify(obj));

    apiWcs
      .statusEquipment(encoded)
      .done(function (response) {})
      //loadDataProc(response.lktBody);
      .fail(function () {
        // 에러 발생 시 처리
        alert("error");
      });
  }

  function loadDataDeatil() {
    var obj = {
      lktHeader: {
        type: "REQUEST",
        call: "PAGE.OUTBOUNDS.STATUS.EQUIPMENT.DETAIL",
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
          workDate: "2024-02-17",
          workBatch: "001",
          equipmentCode: "111"
        }
      ]
    };
    var encoded = btoa(JSON.stringify(obj));
    apiWcs
      .statusEquipmentDetail(encoded)
      .done(function (response) {})

      .fail(function () {
        alert("error");
      });
  }

  function loadDataProc(aParam) {
    if (aParam == null) {
      aParam = [
        {
          workDate: "2023-06-15",
          workBatch: "2000002948",
          skuCode: "8000470",
          skuName: "8000470",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 1,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 1,
          statusCode: "01",
          statusName: "01",
          addDtm: "2023-07-04 14:27:18",
          modDtm: "2023-07-04 14:27:18"
        },
        {
          workDate: "2023-06-15",
          workBatch: "2000002948",
          skuCode: "8000470",
          skuName: "8000470",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 1,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 1,
          statusCode: "01",
          statusName: "01",
          addDtm: "2023-07-04 14:27:18",
          modDtm: "2023-07-04 14:27:18"
        },
        {
          workDate: "2023-06-15",
          workBatch: "2000002949",
          skuCode: "8000450",
          skuName: "8000450",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 10,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 10,
          statusCode: "10",
          statusName: "10",
          addDtm: "2023-07-04 14:27:39",
          modDtm: "2023-07-04 14:27:39"
        },
        {
          workDate: "2023-06-15",
          workBatch: "2000002949",
          skuCode: "8000454",
          skuName: "8000454",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 10,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 10,
          statusCode: "10",
          statusName: "10",
          addDtm: "2023-07-04 14:27:39",
          modDtm: "2023-07-04 14:27:39"
        },
        {
          workDate: "2023-06-15",
          workBatch: "2000002949",
          skuCode: "8000454",
          skuName: "8000454",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 10,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 10,
          statusCode: "10",
          statusName: "10",
          addDtm: "2023-07-04 14:27:39",
          modDtm: "2023-07-04 14:27:39"
        },
        {
          workDate: "2023-06-15",
          workBatch: "2000002949",
          skuCode: "8000454",
          skuName: "8000454",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 10,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 10,
          statusCode: "10",
          statusName: "10",
          addDtm: "2023-07-04 14:27:39",
          modDtm: "2023-07-04 14:27:39"
        },
        {
          workDate: "2023-06-15",
          workBatch: "2000002950",
          skuCode: "8000450",
          skuName: "8000450",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 12,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 12,
          statusCode: "01",
          statusName: "01",
          addDtm: "2023-07-04 14:27:44",
          modDtm: "2023-07-04 14:27:44"
        },
        {
          workDate: "2023-06-15",
          workBatch: "2000002950",
          skuCode: "8000454",
          skuName: "8000454",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 10,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 10,
          statusCode: "01",
          statusName: "01",
          addDtm: "2023-07-04 14:27:44",
          modDtm: "2023-07-04 14:27:44"
        },
        {
          workDate: "2023-06-15",
          workBatch: "2000002950",
          skuCode: "8000454",
          skuName: "8000454",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 10,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 10,
          statusCode: "01",
          statusName: "01",
          addDtm: "2023-07-04 14:27:44",
          modDtm: "2023-07-04 14:27:44"
        },
        {
          workDate: "2023-06-15",
          workBatch: "2000002951",
          skuCode: "8000465",
          skuName: "8000465",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 4,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 4,
          statusCode: "01",
          statusName: "01",
          addDtm: "2023-07-04 14:27:47",
          modDtm: "2023-07-04 14:27:47"
        },
        {
          workDate: "2023-06-15",
          workBatch: "2000002951",
          skuCode: "8000465",
          skuName: "8000465",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 2,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 2,
          statusCode: "01",
          statusName: "01",
          addDtm: "2023-07-04 14:27:47",
          modDtm: "2023-07-04 14:27:47"
        },
        {
          workDate: "2023-06-15",
          workBatch: "2000002951",
          skuCode: "8000468",
          skuName: "8000468",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 1,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 1,
          statusCode: "01",
          statusName: "01",
          addDtm: "2023-07-04 14:27:47",
          modDtm: "2023-07-04 14:27:47"
        },
        {
          workDate: "2023-06-15",
          workBatch: "2000002952",
          skuCode: "8000470",
          skuName: "8000470",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 1,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 1,
          statusCode: "01",
          statusName: "01",
          addDtm: "2023-07-04 14:27:51",
          modDtm: "2023-07-04 14:27:51"
        },
        {
          workDate: "2023-06-15",
          workBatch: "2000002952",
          skuCode: "8000493",
          skuName: "8000493",
          totalPlanOrderCount: 1,
          totalPlanQuantity: 4,
          totalWorkOrderCount: 1,
          totalWorkQuantity: 4,
          statusCode: "01",
          statusName: "01",
          addDtm: "2023-07-04 14:27:51",
          modDtm: "2023-07-04 14:27:51"
        }
      ];
    }

    $("#orderGrid1").dxDataGrid({
      dataSource: aParam, // 데이터 소스 설정
      selection: {
        mode: "single" // 단일 셀렉션 모드
      },
      columns: [
        {dataField: "workDate", caption: "작업일자"},
        {dataField: "workBatch", caption: "작업차수"},
        {dataField: "skuCode", caption: "상품코드"},
        {dataField: "skuName", caption: "상품명"},
        {dataField: "totalPlanOrderCount", caption: "예정주문"},
        {dataField: "totalPlanQuantity", caption: "예정수량"},
        {dataField: "totalWorkOrderCount", caption: "작업주문"},
        {dataField: "totalWorkQuantity", caption: "작업수량"},
        // {dataField: "statusCode", caption: "설비코드"},
        {dataField: "statusName", caption: "상태"},
        {dataField: "addDtm", caption: "지시일자"},
        {dataField: "modDtm", caption: "완료일자"}
      ],
      showBorders: true,
      paging: {
        enabled: false // 페이지 기능 비활성화
      },
      onRowClick: function (e) {
        const selectedRowData = e.data;

        //loadDataDeatil(selectedRowData);

        loadDataDetailProc(null);
        //alert(selectedRowData);
      }
    });
  }

  function loadDataDetailProc(aParam) {
    if (aParam == null) {
      aParam = [
        {
          facilitiesCode: "DAS",
          facilitiesName: "DAS",
          workDate: "2023-06-15",
          workBatch: "2000002949",
          orderNumber: "2100061116",
          skuCode: "8000454",
          skuName: "8000454",
          planQty: 10,
          pickQty: 0,
          tallyQty: 0,
          statusCode: "10",
          statusName: "10",
          addDtm: "2023-07-04 14:27:39",
          modDtm: "2023-07-04 14:27:39"
        },
        {
          facilitiesCode: "DAS",
          facilitiesName: "DAS",
          workDate: "2023-06-15",
          workBatch: "2000002949",
          orderNumber: "2100061117",
          skuCode: "8000454",
          skuName: "8000454",
          planQty: 10,
          pickQty: 0,
          tallyQty: 0,
          statusCode: "10",
          statusName: "10",
          addDtm: "2023-07-04 14:27:39",
          modDtm: "2023-07-04 14:27:39"
        },
        {
          facilitiesCode: "DAS",
          facilitiesName: "DAS",
          workDate: "2023-06-15",
          workBatch: "2000002949",
          orderNumber: "2100061120",
          skuCode: "8000454",
          skuName: "8000454",
          planQty: 10,
          pickQty: 0,
          tallyQty: 0,
          statusCode: "10",
          statusName: "10",
          addDtm: "2023-07-04 14:27:39",
          modDtm: "2023-07-04 14:27:39"
        },
        {
          facilitiesCode: "DAS",
          facilitiesName: "DAS",
          workDate: "2023-06-15",
          workBatch: "2000002950",
          orderNumber: "2100061114",
          skuCode: "8000454",
          skuName: "8000454",
          planQty: 10,
          pickQty: 0,
          tallyQty: 0,
          statusCode: "01",
          statusName: "01",
          addDtm: "2023-07-04 14:27:44",
          modDtm: "2023-07-04 14:27:44"
        },
        {
          facilitiesCode: "DAS",
          facilitiesName: "DAS",
          workDate: "2023-06-15",
          workBatch: "2000002950",
          orderNumber: "2100061115",
          skuCode: "8000454",
          skuName: "8000454",
          planQty: 10,
          pickQty: 0,
          tallyQty: 0,
          statusCode: "01",
          statusName: "01",
          addDtm: "2023-07-04 14:27:44",
          modDtm: "2023-07-04 14:27:44"
        }
      ];

      $("#orderGrid2").dxDataGrid({
        dataSource: aParam, // 데이터 소스 설정
        columns: [
          {dataField: "facilitiesCode", caption: "설비코드"},
          {dataField: "facilitiesName", caption: "설비명"},
          {dataField: "workDate", caption: "작업일자"},
          {dataField: "workBatch", caption: "작업차수"},
          {dataField: "orderNumber", caption: "주문번호"},
          {dataField: "skuCode", caption: "상품코드"},
          {dataField: "skuName", caption: "상품명"},
          {dataField: "planQty", caption: "예정수량"},
          {dataField: "pickQty", caption: "작업수량"},
          {dataField: "tallyQty", caption: "검수수량"},
          // {dataField: "statusCode", caption: "rst2"},
          {dataField: "statusName", caption: "상태"},
          {dataField: "addDtm", caption: "지시일자"},
          {dataField: "modDtm", caption: "완료일자"}
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

  // $("#orderGrid2").dxDataGrid({
  //   dataSource: [],
  //   paging: {pageSize: 5},
  //   pager: {
  //     showPageSizeSelector: true,
  //     allowedPageSizes: [5, 10],
  //     showInfo: true
  //   },
  //   columns: []
  // });

  // 조회 버튼 클릭 이벤트
  $("#searchBtn").click(function () {
    $("#orderGrid1").dxDataGrid({
      // dataSource: orders
    });

    $("#orderGrid2").dxDataGrid({
      // dataSource: []
    });
  });
});
