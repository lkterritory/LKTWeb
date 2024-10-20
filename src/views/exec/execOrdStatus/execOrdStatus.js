$(document).ready(function () {
  const orders = [
    {
      작업일자: "2024-10-20",
      작업차수: "1",
      설비코드: "EQ001",
      설비명: "설비1",
      주문건수: 10,
      분류건수: 5
    },
    {
      작업일자: "2024-10-20",
      작업차수: "2",
      설비코드: "EQ002",
      설비명: "설비2",
      주문건수: 8,
      분류건수: 4
    }
  ];

  const details = {
    EQ001: [
      {
        주문번호: "ORD001",
        상품코드: "P001",
        상품명: "상품1",
        예정수량: 100,
        피킹수량: 90,
        검사수량: 80
      },
      {
        주문번호: "ORD002",
        상품코드: "P002",
        상품명: "상품2",
        예정수량: 200,
        피킹수량: 180,
        검사수량: 170
      }
    ],
    EQ002: [
      {
        주문번호: "ORD003",
        상품코드: "P003",
        상품명: "상품3",
        예정수량: 300,
        피킹수량: 270,
        검사수량: 260
      },
      {
        주문번호: "ORD004",
        상품코드: "P004",
        상품명: "상품4",
        예정수량: 400,
        피킹수량: 370,
        검사수량: 350
      }
    ]
  };

  // 빈 그리드를 초기화 (처음부터 그리드가 보이도록 설정)
  $("#orderGrid1").dxDataGrid({
    dataSource: [],
    paging: {pageSize: 5},
    pager: {
      showPageSizeSelector: true,
      allowedPageSizes: [5, 10],
      showInfo: true
    },
    columns: [
      {dataField: "작업일자", caption: "작업일자"},
      {dataField: "작업차수", caption: "작업차수"},
      {dataField: "설비코드", caption: "설비코드"},
      {dataField: "설비명", caption: "설비명"},
      {dataField: "주문건수", caption: "주문번호"},
      {dataField: "분류건수", caption: "품목수량"}
    ],
    onRowClick: function (e) {
      const 설비코드 = e.data.설비코드;
      const detailData = details[설비코드] || [];
      $("#orderGrid2").dxDataGrid({
        dataSource: detailData,
        paging: {pageSize: 5},
        pager: {
          showPageSizeSelector: true,
          allowedPageSizes: [5, 10],
          showInfo: true
        },
        columns: [
          {dataField: "주문번호", caption: "주문번호"},
          {dataField: "상품코드", caption: "상품코드"},
          {dataField: "상품명", caption: "상품명"},
          {dataField: "예정수량", caption: "예정수량"},
          {dataField: "피킹수량", caption: "피킹수량"},
          {dataField: "검사수량", caption: "검수수량"}
        ]
      });
    }
  });

  $("#orderGrid2").dxDataGrid({
    dataSource: [],
    paging: {pageSize: 5},
    pager: {
      showPageSizeSelector: true,
      allowedPageSizes: [5, 10],
      showInfo: true
    },
    columns: [
      {dataField: "주문번호", caption: "주문번호"},
      {dataField: "상품코드", caption: "상품코드"},
      {dataField: "상품명", caption: "상품명"},
      {dataField: "예정수량", caption: "예정수량"},
      {dataField: "피킹수량", caption: "피킹수량"},
      {dataField: "검사수량", caption: "검수수량"}
    ]
  });

  // 조회 버튼 클릭 이벤트
  $("#searchBtn").click(function () {
    $("#orderGrid1").dxDataGrid({
      dataSource: orders
    });

    $("#orderGrid2").dxDataGrid({
      dataSource: []
    });
  });
});
