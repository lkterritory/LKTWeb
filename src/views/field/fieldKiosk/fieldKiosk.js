let apiWcs;
let apiCommon;
let lktUtil;

let lktMqtt;

let intervalList = null;
let intervalPrintMq = null;

import zebra from "../../../scripts/utils/printer/zebra/index.js?a=1";

// import zebra from "../../../src /utils/printer/zebra";

if (
  !window.apiWcsModule ||
  !window.apiCommonModule ||
  !window.lktUtilModule ||
  !window.lktMqttModule
) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.apiCommonModule = import(
    `../../../js/api/apiCommon.js?t=${Date.now()}`
  );
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
  window.lktMqttModule = import(`../../../js/util/lktMqtt.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
apiCommon = (await window.apiCommonModule).default;
lktUtil = (await window.lktUtilModule).default;
lktMqtt = (await window.lktMqttModule).default;

let dvList = [];

const idPrefix = "#field-fieldKiosk-fieldKiosk ";

let txtBoxSearch;
let workOrderGrid;

let resEquipmentCode;

let eqpCodeSel = ""; /// 선택된 설비
// mqtt_topic_sub: "lktomli/DAS-1", // 구독
//   mqtt_topic_pub: "lktomli", // 발행

window.onClickKioskPrint = function () {
  zebra.setup();

  $(".printstate").css({
    color: "red", // 텍스트 색상
    fontWeight: "bold" // 텍스트 굵게
  });
};

function onCreate() {
  zebra.setup();

  //eqpCodeSel = "DAS-01";

  if (true) {
    // if (isPrintFind()) {
    // 프린트 api 호출 후 프린트
    // let zplData =
    //   "^XA\n" +
    //   "^SEE:UHANGUL.DAT^FS\n" +
    //   "^CW1,E:KFONT3.FNT^CI26^FS\n\n" +
    //   "^CI28\n\n" +
    //   "" +
    //   "^PW900\n" +
    //   "^LH40,40\n" +
    //   "^FWB\n\n" +
    //   "" +
    //   "^FO0,0^GB720,1100,4^FS\n\n" +
    //   "" +
    //   "^FO70,0^GB0,200,3^FS\n" +
    //   "^FO70,800^GB0,300,3^FS\n" +
    //   "^FO140,0^GB0,1100,3^FS\n" +
    //   "^FO228,0^GB0,800,3^FS\n" +
    //   "^FO316,0^GB0,800,3^FS\n" +
    //   "^FO404,0^GB0,800,3^FS\n" +
    //   "^FO492,0^GB0,800,3^FS\n" +
    //   "^FO140,400^GB440,0,3^FS\n" +
    //   "^FO580,0^GB0,1100,3^FS\n\n" +
    //   "" +
    //   "^FO0,200^GB140,0,3^FS\n" +
    //   "^FO0,800^GB720,0,3^FS\n\n" +
    //   "" +
    //   "^FT50,175^A1,30,30^FD박스 " +
    //   "^FS\n" +
    //   "^FT120,140^A1,30,30^FD" +
    //   "^FS\n" +
    //   //"^FT85,740^A1,40,35^FD" +
    //   "^FO40,0^A1,65,65^FB970,1,0,C^FD" +
    //   "^FS\n" +
    //   "^FT199,790^A1,40,40^FD" +
    //   "^FS\n" +
    //   "^FT289,790^A1,40,40^FD" +
    //   "^FS\n" +
    //   "^FT379,790^A1,40,40^FD" +
    //   "^FS\n" +
    //   "^FT469,790^A1,40,40^FD" +
    //   "^FS\n" +
    //   "^FT559,790^A1,40,40^FD" +
    //   "^FS\n" +
    //   //---- h
    //   "^FT199,390^A1,40,40^FD" +
    //   "^FS\n" +
    //   "^FT289,390^A1,40,40^FD" +
    //   "^FS\n" +
    //   "^FT379,390^A1,40,40^FD" +
    //   "^FS\n" +
    //   "^FT469,390^A1,40,40^FD" +
    //   "^FS\n" +
    //   "^FT559,390^A1,40,40^FD" +
    //   "^FS\n" +
    //   "^FT710,80^A1,30,30^FD" +
    //   "^FS\n\n" +
    //   "" +
    //   "^FO301,805^A1,55,55^FB800,1,0,R^FD" +
    //   "^FS\n" +
    //   "^FO351,805^A1,55,55^FB800,1,0,R^FD" +
    //   "^FS\n" +
    //   "^FO401,805^A1,55,55^FB800,1,0,R^FD" +
    //   "^FS\n\n" +
    //   "" +
    //   "^FT50,1040^A1,30,30^FD" +
    //   "^FS\n" +
    //   "^FT120,1085^A1,50,50^FD" +
    //   "^FS\n" +
    //   "^FT130,1085^A1,25,25^FD" +
    //   "^FS\n\n" +
    //   "" +
    //   "^FT670,1060^A1,65,65^FD" +
    //   "도크:" +
    //   "^FS\n\n" +
    //   "" +
    //   "^FT680,750^BY3\n" +
    //   "^BC,90,Y,N,N^FD" +
    //   "^FS\n\n" +
    //   "" +
    //   "^XZ";
    // zebra.writeToSelectedPrinter("192.168.26.73", zplData);
  }

  eqpCodeSel = localStorage.getItem("eqpCodeSel");

  if (!eqpCodeSel) {
    eqpCodeSel = "";
  } else {
    // mq연결
    lktMqtt.mqtt_topic_pub = "lktomni";
    lktMqtt.mqtt_topic_sub = "lktomni/" + eqpCodeSel;
    lktMqtt.fncStartMqtt(onMessage);
  }

  $(".title span").text(eqpCodeSel);

  // 버튼 이벤트 처리
  $(idPrefix + "#btnSetting").dxButton({
    stylingMode: "contained",
    type: "default",
    onClick: function (e) {
      // showPopup(false, null);
      searchConditionsCode();
    },
    width: "100px"
  });

  txtBoxSearch = $(idPrefix + "#txtBoxBarcode")
    .dxTextBox({
      placeholder: "바코드",
      value: "",
      width: "200px",
      onValueChanged: function (e) {
        //console.log("입력된 값:", e.value);
      },
      onEnterKey: function (e) {
        if (e.event.key === "Enter") {
          //alert(e.component.option("value"));

          // let testzpl =
          //   "^XA^CI28 ^LL1219  ^CFA,05^FO20,92^GFA,442,442,17,4J038O01F8,C00E0FE00E003C007FE,C00E0C700E003C00F0F,C00E1C300F003C01C038,C00E18300F007C038018,C00E1C300F007C03801C,C00E0C600F806C03J06707C0C0633E,C00E0EE00D80CC07J07F1FF0C063FF8,C00E07800D80CC07J0783878C063C1C,IFE07800CC0CC07J0703018C06380C,IFE1F830CC18C0603FC70701CC06380C,C00E38C30CE19C0703FC60600CC063806,C00E30E30C618C07001C60600CC063006,C00E70730C631C07I0C60600CC063006,C00E603F0C730C03001C60600CC063006,C00E601E0C361C03801C60600CC063806,C00E700E0C360C01803C60701CC06380C,C00E381E0C3E1C01C07C603838E0E3C1C,C00E3C7F0C1E1C00FDEC603CF073E3E3C,C00E0FF38C1C1C003FCC600FE07F637F,K038P0FK03801C031C,gO03,::::^FS ^CFP,16^FO253,98^FDH&M Shipping Label Generator 24.18.0.4^FS ^FO20,118^GB770,2,2^FS ^CFP,16^FO82,119^FDFrom:^FS ^CFP,16^FO82,137^FDWMS452KR ^FS ^CFP,16^FO504,125^FDDate:^FS ^CF0,20^FO560,125^FD2024-10-14^FS ^CFP,16^FO504,176^FDRoute:^FS ^CF0,32^FO504,223^FDKRTESTLSP^FS ^CFQ,16^FO 82,240^FDTo:^FS ^LRY^FO504,250^GB168,45,45^FS^CF0,48^FO507,254^FH^FDKR0001^FS^LRN ^CFR,24^FO82,264^FH^FDH_26M^FS ^CFR,24^FO82,294^FH^FD14_2C Myungdong Gil_2C Jung_2Dgu^FS ^CFR,24^FO82,371^FH^FDKR_2D04536 Seoul^FS ^FO722,342^GB70,70,2^FS^CF0,70^FO738,352^FH^FDA^FS ^FO20,418^GB770,2,2^FS ^FO20,498^GB770,2,2^FS ^FO100,581^BY4,3,190^BCN,,N,N,Y,D^FD00173129850785191098^FS ^CFP,16^FO35,500^FDContent:^FS ^CF0,28 ^FO35,522^GB 20, 20, 2 ^FS^FO59,520^FD^FDLADIESWEAR^FS ^FO 35, 553 ^GB 20, 20, 2 ^FS^FO59,551^FH^FD^FDMENSWEAR^FS ^FO270,522^GB 20, 20, 2 ^FS^FO294,520^FD^FH^FDBABY_2FCHILDREN^FS ^FO270,553^GB 20, 20, 2 ^FS^FO294,551^FD^FDDIVIDED^FS ^FO 620, 522 ^GB 20, 20, 2 ^FS^FO644,520^FH^FD^FDCOSMETICS^FS ^FO 620, 553 ^GB 20, 20, 2 ^FS^FO644,551^FH^FD^FH^FDH_26M HOME^FS ^FO20,577^GB770,2,2^FS ^CF0,23^FO30,774^FD(00)173129850785191098^FS ^CF0,38^FO725,762^FD1098^FS ^XZ";

          // //"^XA^CI28  ^CFA,05^FO20,2^GFA,442,442,17,4J038O01F8,C00E0FE00E003C007FE,C00E0C700E003C00F0F,C00E1C300F003C01C038,C00E18300F007C038018,C00E1C300F007C03801C,C00E0C600F806C03J06707C0C0633E,C00E0EE00D80CC07J07F1FF0C063FF8,C00E07800D80CC07J0783878C063C1C,IFE07800CC0CC07J0703018C06380C,IFE1F830CC18C0603FC70701CC06380C,C00E38C30CE19C0703FC60600CC063806,C00E30E30C618C07001C60600CC063006,C00E70730C631C07I0C60600CC063006,C00E603F0C730C03001C60600CC063006,C00E601E0C361C03801C60600CC063806,C00E700E0C360C01803C60701CC06380C,C00E381E0C3E1C01C07C603838E0E3C1C,C00E3C7F0C1E1C00FDEC603CF073E3E3C,C00E0FF38C1C1C003FCC600FE07F637F,K038P0FK03801C031C,gO03,::::^FS ^CFP,16^FO253,98^FDH&M Shipping Label Generator 24.18.0.4^FS ^FO20,118^GB770,2,2^FS ^CFP,16^FO82,119^FDFrom:^FS ^CFP,16^FO82,137^FDWMS452KR ^FS ^CFP,16^FO504,125^FDDate:^FS ^CF0,20^FO560,125^FD2024-10-14^FS ^CFP,16^FO504,176^FDRoute:^FS ^CF0,32^FO504,223^FDKRTESTLSP^FS ^CFQ,16^FO 82,240^FDTo:^FS ^LRY^FO504,250^GB168,45,45^FS^CF0,48^FO507,254^FH^FDKR0001^FS^LRN ^CFR,24^FO82,264^FH^FDH_26M^FS ^CFR,24^FO82,294^FH^FD14_2C Myungdong Gil_2C Jung_2Dgu^FS ^CFR,24^FO82,371^FH^FDKR_2D04536 Seoul^FS ^FO722,342^GB70,70,2^FS^CF0,70^FO738,352^FH^FDA^FS ^FO20,418^GB770,2,2^FS ^FO20,498^GB770,2,2^FS ^FO100,581^BY4,3,190^BCN,,N,N,Y,D^FD00173129850785191098^FS ^CFP,16^FO35,500^FDContent:^FS ^CF0,28 ^FO35,522^GB 20, 20, 2 ^FS^FO59,520^FD^FDLADIESWEAR^FS ^FO 35, 553 ^GB 20, 20, 2 ^FS^FO59,551^FH^FD^FDMENSWEAR^FS ^FO270,522^GB 20, 20, 2 ^FS^FO294,520^FD^FH^FDBABY_2FCHILDREN^FS ^FO270,553^GB 20, 20, 2 ^FS^FO294,551^FD^FDDIVIDED^FS ^FO 620, 522 ^GB 20, 20, 2 ^FS^FO644,520^FH^FD^FDCOSMETICS^FS ^FO 620, 553 ^GB 20, 20, 2 ^FS^FO644,551^FH^FD^FH^FDH_26M HOME^FS ^FO20,577^GB770,2,2^FS ^CF0,23^FO30,774^FD(00)173129850785191098^FS ^CF0,38^FO725,762^FD1098^FS ^XZ";

          // let valTmp = e.component.option("value");
          // if (valTmp == "testprint") {
          //   console.log("testprint: " + testzpl);
          //   zebra.writeToSelectedPrinter("192.168.26.73", testzpl);
          //   return;
          // }

          setTimeout(() => {
            searchList();
            searchList2();
          }, 200);

          let reqPayload = {
            lktHeader: lktUtil.getLktHeader(
              "OUTBOUND.EQUIPMENT.PICKTOLIGHT.INPUT"
            ),
            lktBody: [
              {
                storageTemperatureCode: "",
                equipmentCode: eqpCodeSel,
                equipmentLine: eqpCodeSel,
                equipmentZone: eqpCodeSel,
                inputValue: e.component.option("value")
              }
            ]
          };

          lktMqtt.fncMqttDoSend(JSON.stringify(reqPayload));

          $(idPrefix + "#txtBoxBarcode input").select();
        }
      }
    })
    .dxTextBox("instance");

  // Progress Bar 설정
  $(idPrefix + "#progressBar").dxProgressBar({
    value: 0,
    min: 0,
    max: 100,
    showStatus: true,
    statusFormat: function (value) {
      return `${value * 100}%`;
    },
    onContentReady: function (e) {
      const $element = e.element.find(".dx-progressbar-status");
      $element.css({
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -60%)",
        color: "#ffffff", // 텍스트 색상
        fontSize: "20px"
        // fontWeight: "bold"
      });
    }
  });

  let headerCss = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center"
    // "background-color": "red"
  };

  let headerCssGray = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center",
    "background-color": "gray"
  };

  // DevExtreme DataGrid 설정
  workOrderGrid = $(idPrefix + "#workOrderGrid")
    .dxDataGrid({
      // 임시 테스트
      dataSource: [
        // {
        //   lktSequnce: 1,
        //   skuCode: "1242835001240008",
        //   skuName: "women skirt",
        //   skuBarcode: "0212713015164008",
        //   objectCount: 2,
        //   planQty: 15,
        //   pickQty: 0,
        //   remainingQty: 15,
        //   statusCode: "04",
        //   statusName: "완ㅇ료",
        //   planDtm: null,
        //   pickDtm: null,
        //   lktTaskColor: "G"
        // },
        // {
        //   lktSequnce: 1,
        //   skuCode: "1242835001240008",
        //   skuName: "women skirt",
        //   skuBarcode: "0212713015164008",
        //   objectCount: 2,
        //   planQty: 15,
        //   pickQty: 0,
        //   remainingQty: 15,
        //   statusCode: "04",
        //   statusName: "완ㅇ료",
        //   planDtm: null,
        //   pickDtm: null,
        //   lktTaskColor: "Y"
        // },
        // {
        //   lktSequnce: 1,
        //   skuCode: "1242835001240008",
        //   skuName: "women skirt",
        //   skuBarcode: "0212713015164008",
        //   objectCount: 2,
        //   planQty: 15,
        //   pickQty: 0,
        //   remainingQty: 15,
        //   statusCode: "04",
        //   statusName: "완ㅇ료",
        //   planDtm: null,
        //   pickDtm: null,
        //   lktTaskColor: "R"
        // },
        // {
        //   lktSequnce: 1,
        //   skuCode: "1242835001240008",
        //   skuName: "women skirt",
        //   skuBarcode: "0212713015164008",
        //   objectCount: 2,
        //   planQty: 15,
        //   pickQty: 0,
        //   remainingQty: 15,
        //   statusCode: "04",
        //   statusName: "완ㅇ료",
        //   planDtm: null,
        //   pickDtm: null,
        //   lktTaskColor: "W"
        // },
        // {
        //   lktSequnce: 1,
        //   skuCode: "1242835001240008",
        //   skuName: "women skirt",
        //   skuBarcode: "0212713015164008",
        //   objectCount: 2,
        //   planQty: 15,
        //   pickQty: 0,
        //   remainingQty: 15,
        //   statusCode: "04",
        //   statusName: "완료",
        //   planDtm: null,
        //   pickDtm: null,
        //   lktTaskColor: "W"
        // }
      ],
      columns: [
        {
          dataField: "lktSequnce",
          caption: "순서",
          width: 70,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("순서"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "skuCode",
          caption: "상품코드",
          width: 200,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상품코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "skuName",
          caption: "상품명",
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상품명"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "skuBarcode",
          caption: "바코드",
          width: 200,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("바코드"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "objectCount",
          caption: "주문수",
          width: 80,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("주문수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "planQty",
          caption: "예상수",
          width: 80,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("예상수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "pickQty",
          caption: "확정수",
          width: 80,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("확정수"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "remainingQty",
          caption: "미처리",
          width: 80,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("미처리"); // 헤더 가운데 정렬
          }
        },
        {
          dataField: "statusName",
          caption: "상태",
          width: 100,
          headerCellTemplate: function (headerCell) {
            headerCell.css(headerCss).text("상태"); // 헤더 가운데 정렬
            //headerCell.css(headerCss)
          }
        },
        {
          caption: "취소",
          width: 100,
          cellTemplate: function (cellElement, cellInfo) {
            // 버튼 추가
            $("<div>")
              .appendTo(cellElement)
              .dxButton({
                text: "중지",
                onClick: function () {
                  // 버튼 클릭 이벤트

                  //alert(JSON.stringify(cellInfo.data));

                  // console.log("Clicked row ID:", cellInfo.data.id);
                  // alert("Button clicked for row: " + cellInfo.data.name);

                  showStopPopup(null, cellInfo.data);
                }
              });

            cellElement.css({
              display: "flex",
              // alignItems: "center",
              height: "35px"
            });
          }
        }
      ],

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
      onRowPrepared: function (info) {
        if (info.rowType === "data") {
          if (info.data.lktTaskColor == "G") {
            $(info.rowElement).css("background-color", "#00FF00");
          } else if (info.data.lktTaskColor == "Y") {
            $(info.rowElement).css("background-color", "yellow");
          } else if (info.data.lktTaskColor == "R") {
            $(info.rowElement).css("background-color", "#FF0000CC");
          } else if (info.data.lktTaskColor == "B") {
            $(info.rowElement).css("background-color", "#0000FF88");
          }
          // else if (info.data.lktTaskColor == "W") {
          //   $(info.rowElement).css("background-color", "green"); // 녹색
          // }

          // 조건에 따라 배경색 변경
          if (info.data.statusName.includes("완료")) {
            // 완료는 무조건 변경
            $(info.rowElement).css("background-color", "gray"); // 녹색
          }

          // else if (info.data.statusName === "진행중") {
          //   $(info.rowElement).css("background-color", "#fff3cd"); // 노란색
          // } else {
          //   $(info.rowElement).css("background-color", "#f8d7da"); // 빨간색
          // }
        }
      }
    })
    .dxDataGrid("instance");

  // 테스트 test
  // workOrderGrid.option("dataSource", [
  //   {
  //     lktSequnce: 1,
  //     skuCode: "1242835001240008",
  //     skuName: "women skirt",
  //     skuBarcode: "0212713015164008",
  //     objectCount: 2,
  //     planQty: 15,
  //     pickQty: 0,
  //     remainingQty: 15,
  //     statusCode: "04",
  //     statusName: "완료",
  //     planDtm: null,
  //     pickDtm: null
  //   }
  // ]);

  // setTimeout(() => {
  //   workOrderGrid.refresh();
  //   workOrderGrid.repaint();
  // }, 500);

  searchList();
  searchList2();

  if (eqpCodeSel == "") searchConditionsCode("EQUIPMENT_TYPE");
  else {
    // searchList();
    // searchList2();
  }

  intervalList = setInterval(() => {
    searchList();
    searchList2();
  }, 5000); // 5초에 한번

  intervalPrintMq = setInterval(() => {
    dvList = zebra.getDeviceList();
    console.log("printList:" + dvList);

    if (dvList.length > 0)
      $(".printstate").css({
        color: "green", // 텍스트 색상
        fontWeight: "bold" // 텍스트 굵게
      });
    else
      $(".printstate").css({
        color: "red", // 텍스트 색상
        fontWeight: "bold" // 텍스트 굵게
      });

    lktMqtt.fncStartMqtt(onMessage);
    selectPrint();
  }, 5000); // 5초에 한번
}

function selectPrint() {
  // if (isPrintFind()) {

  if (dvList.length <= 0) return;

  if (true) {
    var obj = {
      lktHeader: lktUtil.getLktHeader("PAGE.outbound.WCS.MIDDLE.CATEGORIES"),
      lktBody: [
        {
          equipmentCode: eqpCodeSel
        }
      ]
    };
    var encoded = btoa(JSON.stringify(obj));

    apiWcs
      .equipmentLabel(encoded)
      .done(function (response) {
        try {
          if (response.lktBody.length > 0) {
            let resBody = response.lktBody[0];

            // 라벨 출력시작
            console.log("labelIp:" + resBody.labelIp);
            console.log("write:" + resBody.labelZpl);
            zebra.writeToSelectedPrinter(resBody.labelIp, resBody.labelZpl);
            // 라벨 출력완료

            // 출력완료후 후처리

            //return; //  출력패치 임시정지
            var obj = {
              lktHeader: lktUtil.getLktHeader(
                "PAGE.outbound.WCS.MIDDLE.CATEGORIES"
              ),
              lktBody: [
                {
                  labelNumber: resBody.labelNumber
                }
              ]
            };

            apiWcs
              .equipmentLabelPatch(JSON.stringify(obj))
              .done(function (response) {
                try {
                } catch (ex) {}
              })

              .fail(function () {});
          }
        } catch (ex) {}
      })

      .fail(function () {});

    // 프린트 api 호출 후 프린트
    //
    //zebra.writeToSelectedPrinter("usb", zplData);
  }
}

function onActive() {}

function initView() {
  // 주문 값 설정
  document.querySelector(".summary-item:nth-child(1) .current").textContent =
    "";
  document.querySelector(".summary-item:nth-child(1) .total").textContent = "";

  // 품목 값 설정
  document.querySelector(".summary-item:nth-child(2) .current").textContent =
    "";
  document.querySelector(".summary-item:nth-child(2) .total").textContent = "";

  // PCS 값 설정
  document.querySelector(".summary-item:nth-child(3) .current").textContent =
    "";
  document.querySelector(".summary-item:nth-child(3) .total").textContent = "";

  // // tmp
  // let resBodyTmp = {
  //   clientCode: "HMOMNI",
  //   warehouseCode: "HMOMNI",
  //   processObjectCount: 10,
  //   totalObjectCount: 20,
  //   processSkuCount: 30,
  //   totalSkuCount: 40,
  //   processQuantity: 40,
  //   totalQuantity: 60
  // };

  // document // 주문 값 설정
  //   .querySelector(".summary-item:nth-child(1) .current").textContent =
  //   resBodyTmp.processObjectCount; // 현재값
  // document.querySelector(".summary-item:nth-child(1) .total").textContent =
  //   resBodyTmp.totalObjectCount; // 총합값

  // // 품목 값 설정
  // document.querySelector(".summary-item:nth-child(2) .current").textContent =
  //   resBodyTmp.processSkuCount; // 현재값
  // document.querySelector(".summary-item:nth-child(2) .total").textContent =
  //   resBodyTmp.totalSkuCount; // 총합값

  // // PCS 값 설정
  // document.querySelector(".summary-item:nth-child(3) .current").textContent =
  //   resBodyTmp.processQuantity; // 현재값
  // document.querySelector(".summary-item:nth-child(3) .total").textContent =
  //   resBodyTmp.totalQuantity; // 총합값

  // $(idPrefix + "#progressBar").dxProgressBar({
  //   value: resBodyTmp.processSkuCount,
  //   min: 0,
  //   max: resBodyTmp.totalSkuCount,
  //   showStatus: true,
  //   statusFormat: function (value) {
  //     //return `${(value * 100).toFixed(0)}%`;
  //     return `${Math.floor(value * 100, 0)}%`;
  //   },
  //   onContentReady: function (e) {
  //     const $element = e.element.find(".dx-progressbar-status");
  //     $element.css({
  //       position: "absolute",
  //       left: "50%",
  //       top: "50%",
  //       transform: "translate(-50%, -60%)",
  //       color: "#ffffff", // 텍스트 색상
  //       fontSize: "20px"
  //       // fontWeight: "bold"
  //     });
  //   }
  // });
}

function searchList() {
  //  initView();
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.outbound.WCS.MIDDLE.CATEGORIES"),
    lktBody: [
      {
        equipmentCode: eqpCodeSel
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .equipmentPicktolightStatus(encoded)
    .done(function (response) {
      try {
        initView();

        let resBody = response.lktBody[0];
        //let resBodyTmp = {}; //Object.assign(resBody);

        // resBodyTmp.

        let resBodyTmp = {
          clientCode: "HMOMNI",
          warehouseCode: "HMOMNI",
          processObjectCount: resBody.processObjectCount,
          totalObjectCount: resBody.totalObjectCount,
          processSkuCount: resBody.processSkuCount,
          totalSkuCount: resBody.totalSkuCount,
          processQuantity: resBody.processQuantity,
          totalQuantity: resBody.totalQuantity
        };

        // 임시변경 반대로ㅓ

        resBody.processObjectCount = resBodyTmp.totalObjectCount;
        resBody.totalObjectCount = resBodyTmp.processObjectCount;
        resBody.processSkuCount = resBodyTmp.totalSkuCount;
        resBody.totalSkuCount = resBodyTmp.processSkuCount;
        resBody.processQuantity = resBodyTmp.totalQuantity;
        resBody.totalQuantity = resBodyTmp.processQuantity;

        //resBodyTmp =

        document // 주문 값 설정
          .querySelector(".summary-item:nth-child(1) .current").textContent =
          resBody.processObjectCount; // 현재값
        document.querySelector(
          ".summary-item:nth-child(1) .total"
        ).textContent = resBody.totalObjectCount; // 총합값

        // 품목 값 설정
        document.querySelector(
          ".summary-item:nth-child(2) .current"
        ).textContent = resBody.processSkuCount; // 현재값
        document.querySelector(
          ".summary-item:nth-child(2) .total"
        ).textContent = resBody.totalSkuCount; // 총합값

        // PCS 값 설정
        document.querySelector(
          ".summary-item:nth-child(3) .current"
        ).textContent = resBody.processQuantity; // 현재값
        document.querySelector(
          ".summary-item:nth-child(3) .total"
        ).textContent = resBody.totalQuantity; // 총합값

        $(idPrefix + "#progressBar").dxProgressBar({
          value: resBody.processSkuCount,
          min: 0,
          max: resBody.totalSkuCount,
          showStatus: true,
          statusFormat: function (value) {
            //return `${(value * 100).toFixed(0)}%`;
            return `${Math.floor(value * 100, 0)}%`;
          },
          onContentReady: function (e) {
            const $element = e.element.find(".dx-progressbar-status");
            $element.css({
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -60%)",
              color: "#ffffff", // 텍스트 색상
              fontSize: "20px"
              // fontWeight: "bold"
            });
          }
        });
      } catch (ex) {}
    })

    .fail(function () {});
}

function searchList2() {
  //테스트
  // return;

  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.outbound.WCS.MIDDLE.CATEGORIES"),
    lktBody: [
      {
        equipmentCode: eqpCodeSel
      }
    ]
  };
  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .equipmentPicktolightInput(encoded)
    .done(function (response) {
      try {
        // 테스트
        // response.lktBody = [
        //   {
        //     lktSequnce: 1,
        //     skuCode: "1242835001240008",
        //     skuName: "women skirt",
        //     skuBarcode: "0212713015164008",
        //     objectCount: 2,
        //     planQty: 15,
        //     pickQty: 0,
        //     remainingQty: 15,
        //     statusCode: "04",
        //     statusName: "완ㅇ료",
        //     planDtm: null,
        //     pickDtm: null,
        //     lktTaskColor: "G"
        //   },
        //   {
        //     lktSequnce: 1,
        //     skuCode: "1242835001240008",
        //     skuName: "women skirt",
        //     skuBarcode: "0212713015164008",
        //     objectCount: 2,
        //     planQty: 15,
        //     pickQty: 0,
        //     remainingQty: 15,
        //     statusCode: "04",
        //     statusName: "완ㅇ료",
        //     planDtm: null,
        //     pickDtm: null,
        //     lktTaskColor: "Y"
        //   },
        //   {
        //     lktSequnce: 1,
        //     skuCode: "1242835001240008",
        //     skuName: "women skirt",
        //     skuBarcode: "0212713015164008",
        //     objectCount: 2,
        //     planQty: 15,
        //     pickQty: 0,
        //     remainingQty: 15,
        //     statusCode: "04",
        //     statusName: "완ㅇ료",
        //     planDtm: null,
        //     pickDtm: null,
        //     lktTaskColor: "R"
        //   },
        //   {
        //     lktSequnce: 1,
        //     skuCode: "1242835001240008",
        //     skuName: "women skirt",
        //     skuBarcode: "0212713015164008",
        //     objectCount: 2,
        //     planQty: 15,
        //     pickQty: 0,
        //     remainingQty: 15,
        //     statusCode: "04",
        //     statusName: "완ㅇ료",
        //     planDtm: null,
        //     pickDtm: null,
        //     lktTaskColor: "B"
        //   },
        //   {
        //     lktSequnce: 1,
        //     skuCode: "1242835001240008",
        //     skuName: "women skirt",
        //     skuBarcode: "0212713015164008",
        //     objectCount: 2,
        //     planQty: 15,
        //     pickQty: 0,
        //     remainingQty: 15,
        //     statusCode: "04",
        //     statusName: "완료",
        //     planDtm: null,
        //     pickDtm: null,
        //     lktTaskColor: "W"
        //   }
        // ];

        workOrderGrid.option("dataSource", []);
        workOrderGrid.option("dataSource", response.lktBody);
      } catch (ex) {}
    })

    .fail(function () {});
}

// EQUIPMENT_TYPE, STORAGE_TEMPERATURE, USE_STATE_CODE
function searchConditionsCode(aMasterCode) {
  // var obj = {
  //   lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
  //   lktBody: [{masterCode: aMasterCode}]
  // };
  // var encoded = btoa(JSON.stringify(obj));
  // apiCommon
  //   .code(encoded)
  //   .done(function (response) {})
  //   .fail(function () {
  //     alert("error");
  //   });

  let bodyTmp = [
    {equipmentCode: "DAS-01"},
    {equipmentCode: "DAS-02"},
    {equipmentCode: "DAS-03"},
    {equipmentCode: "DAS-04"},
    {equipmentCode: "DAS-05"},
    {equipmentCode: "DAS-06"},
    {equipmentCode: "DAS-07"},
    {equipmentCode: "DAS-08"},
    {equipmentCode: "DAS-09"},
    {equipmentCode: "DAS-10"}
  ];

  // 임시 호기정보 설비정보
  resEquipmentCode = bodyTmp;
  showPopup(false, null);
  // end 임시 호기정보 설비정보

  // var obj = {
  //   lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
  //   lktBody: [{}]
  // };

  // var encoded = btoa(JSON.stringify(obj));

  // apiWcs
  //   .dashboardsOverallStatus(encoded)
  //   .done(function (response) {
  //     try {
  //       resEquipmentCode = response.lktBody;

  //       showPopup(false, null);
  //     } catch (ex) {}
  //   })
  //   .fail(function () {
  //     // 에러 발생 시 처리
  //     //errorPopup.removeClass("hidden");
  //   });
}

function showPopup(isModi, row) {
  let itemsTmp = [];
  for (let i = 0; i < resEquipmentCode.length; i++) {
    itemsTmp.push({
      id: resEquipmentCode[i].equipmentCode,
      name: resEquipmentCode[i].equipmentCode
    });
  }

  let formItems = [
    {
      dataField: "equipmentCode",
      label: {text: "설비"},
      editorType: "dxSelectBox",
      editorOptions: {
        items: itemsTmp,
        displayExpr: "name",
        valueExpr: "id",
        value: eqpCodeSel ? eqpCodeSel : "",
        placeholder: "선택하세요",
        onValueChanged: function (e) {
          //alert(e.value);
          console.log("선택된 값:", e.value); // 선택된 id 값
        }
      }
    }
  ];

  // 팝업 호출
  lktUtil.createDynamicPopup({
    title: "설비선택",
    isModi: false, // 수정 여부
    formItems: formItems, // 폼 구성
    onExecute: function (formData) {
      eqpCodeSel = formData.equipmentCode;

      if (eqpCodeSel == "") return;

      // mq연결
      lktMqtt.mqtt_topic_pub = "lktomni";
      lktMqtt.mqtt_topic_sub = "lktomni/" + eqpCodeSel;
      lktMqtt.fncStartMqtt(onMessage);

      localStorage.setItem("eqpCodeSel", eqpCodeSel);

      $(".title span").text(eqpCodeSel);
      searchList();
      searchList2();
      $("#dynamicPopup").dxPopup("hide");
    },
    onCancel: function () {
      // 취소 버튼 클릭 이벤트 처리
      $("#dynamicPopup").dxPopup("hide");
    }
  });
}

function showStopPopup(isModi, data) {
  let formItems = [];

  // 팝업 호출
  lktUtil.createDynamicPopup({
    title: "작업을 중지합니다.",
    isModi: isModi, // 수정 여부
    formItems: formItems, // 폼 구성
    onExecute: function (formData) {
      let reqPayload = {
        lktHeader: lktUtil.getLktHeader(
          //"OUTBOUND.EQUIPMENT.PICKTOLIGHT.INPUT"
          "PATCH.OUTBOUND.EQUIPMENT.PICKTOLIGHT.INPUT.CANCEL"
        ),
        lktBody: [
          {
            // storageTemperatureCode: "",
            // equipmentCode: eqpCodeSel,
            // equipmentLine: eqpCodeSel,
            // equipmentZone: eqpCodeSel,
            // inputValue: e.component.option("value")

            equipmentCode: eqpCodeSel,
            lktSequnce: data.lktSequnce,
            skuCode: data.skuCode,
            sscc: data.sscc ? data.sscc : ""
          }
        ]
      };

      lktMqtt.fncMqttDoSend(JSON.stringify(reqPayload));

      setTimeout(() => {
        searchList2();
      }, 500);

      $("#dynamicPopup").dxPopup("hide");
    },
    onCancel: function () {
      // 취소 버튼 클릭 이벤트 처리
      $("#dynamicPopup").dxPopup("hide");
    }
  });
}

////////////////////////////////////////////////////////////////////////////////
// mqtt test stuff

// // MQTT client
// var mqttClient = null;

// //MQTT info
// // 각자 상황에 맞는 host, port, topic 을 사용합니다.
// var mqtt_host = "127.0.0.1";
// var mqtt_port = "1883";
// var mqtt_clientId = "clientID-" + parseInt(Math.random() * 100); // 랜덤 클라이언트 ID
// var mqtt_topic = "testTopic";

// // MQTT 클라이언트 연결
// function fncStartMqtt() {
//   mqttClient = new Paho.MQTT.Client(
//     mqtt_host,
//     Number(mqtt_port),
//     mqtt_clientId
//   );

//   mqttClient.onConnectionLost = onConnectionLost;
//   mqttClient.onMessageArrived = onMessageArrived;

//   mqttClient.connect({
//     onSuccess: onConnect,
//     onFailure: onFailure
//   });
// }

// // 연결 성공 시 실행되는 function
// function onConnect() {
//   console.log("connet : onConnect..");

//   mqttClient.subscribe(mqtt_topic);
// }

// // 연결 실패 시 실행되는 function
// function onFailure() {
//   console.log("connet : onFailure..");
// }

// function onConnectionLost(responseObject) {
//   if (responseObject.errorCode !== 0) {
//     console.log("onConnectionLost : " + responseObject.errorMessage);

//     // 연결 재시도
//     fncConnMqtt();
//   }
// }

// // 메시지 받는 부분
// function onMessageArrived(message) {
//   console.log("onMessageArrived : " + message.payloadString);

//   // mqtt 받은 메시지
//   // 받은 메시지를 각 화면에서 사용하려면 각 화면에서 아래 function 선언하여 사용
//   fncMqttAction(message.payloadString);
// }

// // 메시지 보내기
// // 각 화면에서 메시지를 보내려면 각 화면에서 아래 function 선언하여 사용
// function fncMqttDoSend(sendMsg) {
//   console.log("mqtt send:" + sendMsg);
//   mqttClient.send(mqtt_topic, sendMsg);
// }

// mqtt test end
////////////////////////////////////////////////////////////////////////////////

function onMessage(message) {
  try {
    console.log("recv mqtt:" + message.payloadString);
  } catch (ex) {
    console.log("pares error");
  }

  searchList();
  searchList2();
}

function onDestroy() {
  // alert("dest");

  if (intervalList) {
    clearInterval(intervalList);
    intervalList = null;
  }

  if (intervalPrintMq) {
    clearInterval(intervalPrintMq);
    intervalPrintMq = null;
  }
}

export default {
  onCreate,
  onActive,
  onDestroy
};
