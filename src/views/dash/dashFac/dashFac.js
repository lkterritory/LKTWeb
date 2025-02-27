let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;

const idPrefix = "#dash-dashFac-dashFac ";

let data = [];

let listEquipmentCode = [
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

let eqpCodeSel = ""; /// 선택된 설비

let intervalList = null;

let dailyData;
let weeklyData;


window.onClickFac = function () {
  showPopup();
};

function onCreate() {
  initView();
  fetchDailyChartData();
  fetchWeeklyChartData();

 $(idPrefix + '#todayChart').dxChart({
  dataSource : dailyData, 
  series: {
    argumentField: 'hourCode',
    valueField: 'processQuantity',
    type: 'bar',
    color: '#0098FF',
    name: 'Qty', 
  },
  title: '당일 시간당 작업량',
  legend: {
    visible: true,   // 범례 보이기
    horizontalAlignment: 'left', 
    font: {
      size: 14,
      color: '#333' 
    }
  }
});
$(idPrefix + '#weekChart').dxChart({
  dataSource : weeklyData,
  series: {
    argumentField: 'dayofweekName',
    valueField: 'processQuantity',
    type: 'bar',
    color: '#0098FF',
    name: 'Qty', 
  },
  title: '주 당 작업량',
  legend: {
    visible: true,   // 범례 보이기
    horizontalAlignment: 'left', 
    font: {
      size: 14,
      color: '#333' 
    }
  }
});


  eqpCodeSel = localStorage.getItem("eqpCodeSel");

  if (!eqpCodeSel) {
    eqpCodeSel = "";
  }

  if (eqpCodeSel == "") {
    showPopup();
  }

  $(".title-fac").text(eqpCodeSel);

  searchList();
  setTimeout(() => {
    searchList();
  }, 1000);

  intervalList = setInterval(() => {
    searchList();
  }, 10000); // 10초에 한번
}

function initView() {
  $(".sumbox-con-1-fac").text(getFormattedDate());

  //$(".sumbox-con-2-fac").text(getFormattedDate());
  $(".sumbox-con-3-fac").text("0/hr");
  $("#sumbox-con-3-fac-1").text("0/hr");


}

function createRect(width, height, fill) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

  rect.setAttribute("x", 0);
  rect.setAttribute("y", 0);
  rect.setAttribute("width", width);
  rect.setAttribute("height", height);
  rect.setAttribute("fill", fill);

  return rect;
}

function createText(x, y, fontSize, textAnchor, content) {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("fill", "#000");
  text.setAttribute("text-anchor", textAnchor);
  text.setAttribute("font-size", fontSize);

  text.textContent = content;

  return text;
}

function onActive() {}

function searchList() {
  if (eqpCodeSel == "" || eqpCodeSel == null) {
    return;
  }

  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [{equipmentCode: eqpCodeSel}]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .dashboardsPickToLightInstances(encoded)
    .done(function (response) {
      initView();

      try {
        // response.lktBody = [
        //   {
        //     centerCode: "HMOMNI",
        //     clientCode: "HMOMNI",
        //     warehouseCode: "HMOMNI",
        //     totalStoreCount: 999, //PO
        //     processStoreCount: 888,
        //     totalSerialShippingContainerCodeCount: 999, //SSCC
        //     processSerialShippingContainerCodeCount: 888,
        //     // totalSkuCount: 999,
        //     // processSkuCount: 888,
        //     totalQuantity: 999, // Qty
        //     processQuantity: 888
        //   }        
        // ]
        loadBar(response.lktBody);
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리
    });

  fetchDailyChartData();
  fetchWeeklyChartData();
}

// 상황판 시간별 차트
function fetchDailyChartData() {

  // dailyData =  [
  //   { "hourCode": 1,"processQuantity": 10},
  //   { "hourCode": 2,"processQuantity": 20},
  //   { "hourCode": 3,"processQuantity": 30},
  //   { "hourCode": 4,"processQuantity": 40},
  //   { "hourCode": 5,"processQuantity": 50},
  //   { "hourCode": 6,"processQuantity": 60},
  //   { "hourCode": 7,"processQuantity": 70},
  //   { "hourCode": 8,"processQuantity": 80},
  //   { "hourCode": 9,"processQuantity": 90},
  //   { "hourCode": 10,"processQuantity": 100},
  //   { "hourCode": 11,"processQuantity": 110},
  //   { "hourCode": 12,"processQuantity": 120},
  //   { "hourCode": 13,"processQuantity": 130},
  //   { "hourCode": 14,"processQuantity": 140},
  //   { "hourCode": 15,"processQuantity": 130},
  //   { "hourCode": 16,"processQuantity": 120},
  //   { "hourCode": 17,"processQuantity": 110},
  //   { "hourCode": 18,"processQuantity": 100},
  //   { "hourCode": 19,"processQuantity": 90},
  //   { "hourCode": 20,"processQuantity": 60},
  //   { "hourCode": 21,"processQuantity": 30},
  //   { "hourCode": 22,"processQuantity": 20},
  //   { "hourCode": 23,"processQuantity": 20},
  //   { "hourCode": 24,"processQuantity": 10},
    
  // ]
   var obj = {
    lktHeader: lktUtil.getLktHeader("GET.OUTBOUND.DASHBOARD.PICKTOLIGHT.DAILY.PRODUCTIVITY"),
    lktBody: [{equipmentCode: eqpCodeSel}]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .dashboardsPickToLightDaily(encoded)
    .done(function (response) {
       try {
        dailyData = response.lktBody;
        //console.log(dailyData)
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

// 상황판 주간 차트
function fetchWeeklyChartData() {

  // weeklyData =  [
  //   {
  //     "dayofweekCode": 0,
  //     "dayofweekName": "일",
  //     "dayofweekDate": "2025-02-22",
  //     "processQuantity": 10
  //   },
  //   {
  //     "dayofweekCode": 0,
  //     "dayofweekName": "월",
  //     "dayofweekDate": "2025-02-23",
  //     "processQuantity": 20
  //   },
  //   {
  //     "dayofweekCode": 0,
  //     "dayofweekName": "화",
  //     "dayofweekDate": "2025-02-24",
  //     "processQuantity": 30
  //   },
  //   {
  //     "dayofweekCode": 0,
  //     "dayofweekName": "수",
  //     "dayofweekDate": "2025-02-25",
  //     "processQuantity": 40
  //   },
  //   {
  //     "dayofweekCode": 0,
  //     "dayofweekName": "목",
  //     "dayofweekDate": "2025-02-26",
  //     "processQuantity": 50
  //   },
  //   {
  //     "dayofweekCode": 0,
  //     "dayofweekName": "금",
  //     "dayofweekDate": "2025-02-27",
  //     "processQuantity": 60
  //   },
  //   {
  //     "dayofweekCode": 0,
  //     "dayofweekName": "토",
  //     "dayofweekDate": "2025-02-28",
  //     "processQuantity": 70
  //   }
  // ]

  var obj = {
    lktHeader: lktUtil.getLktHeader("GET.OUTBOUND.DASHBOARD.PICKTOLIGHT.WEEKLY.PRODUCTIVITY"),
    lktBody: [{equipmentCode: eqpCodeSel}]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .dashboardsPickToLightWeekly(encoded)
    .done(function (response) {
      try {
        weeklyData = response.lktBody;
        //console.log(weeklyData)
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

function getFormattedDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function calculateProgress(processed, total) {
  return total ? Math.round((processed / total) * 100) : 0;
}

function loadBar(data) {

  let item = data[0];

  item.progressStore = calculateProgress(item.processStoreCount, item.totalStoreCount);
  item.progressSSCC = calculateProgress(item.processSerialShippingContainerCodeCount, item.totalSerialShippingContainerCodeCount);
  item.progressSku = calculateProgress(item.processSkuCount, item.totalSkuCount);
  item.progressQty = calculateProgress(item.processQuantity, item.totalQuantity);

  let totalSSCC = item.totalSerialShippingContainerCodeCount;
  let processSSCC = item.processSerialShippingContainerCodeCount;
  let progressSSCC = totalSSCC ? Math.round((processSSCC / totalSSCC) * 100) : 0;
  
  for (let i = 1; i < 4; i++) {
    $(idPrefix + "#progressBar_" + i).dxProgressBar({
      value:
        i == 1
          ? item.processStoreCount
          : i == 2
          ? item.processSerialShippingContainerCodeCount
          : item.processQuantity, // 현재 값
      min: 0, // 최소값
      max:
        i == 1
          ? item.totalStoreCount
          : i == 2
          ? item.totalSerialShippingContainerCodeCount
          : item.totalQuantity, // 현재 값
      showStatus: false, // 기본 텍스트 표시 끄기
      animation: {
        // 애니메이션 설정
        enabled: false // 애니메이션 비활성화
      },
      onValueChanged: function (e) {
        //onContentReady: function (e) {

        setTimeout(() => {
          updateProgressBarText(e);
        }, 200);

        //return;
      },
      onContentReady: function (e) {
        updateProgressBarText(e);
      }
    });
  }

  //ctn 기준 진행률
  $(idPrefix + '#gauge').dxCircularGauge({
    scale :{
      startValue: 0,
      endValue: totalSSCC,
      tick: {
        visible: false // 눈금 표시 안함
      },
      label: {
        visible: false // 눈금 라벨 표시 안함
      }
    },
    width:"100%",
    title: {
      text: "Ctn 기준 진행률",
      font: {
        size: 28,
      },
    },
    rangeContainer: {
      width: 30, 
      backgroundColor: "#e0e0e0", 
      ranges: [
        { 
          startValue: totalSSCC - processSSCC,
          endValue: totalSSCC,
          color: "#0098FF"
        }  // 반시계방향으로 채우기 (100에서 0까지)
      ]
    },
    geometry: {
      startAngle: 90, // 시작 각도
      endAngle: -270 
    },
    value: progressSSCC ,
    centerTemplate : (gauge, container) => {
      const rect = createRect(50, 0 , "transparent");
      const text = createText(10, 200, 40, "start", gauge.value()+ "%");

      container.appendChild(rect);
      container.appendChild(text);
    }
    
  });
  
}

function updateProgressBarText(e) {
  const $element = $(e.element);

  // 프로그레스 바의 실제 최신 값과 max를 가져온다.
  const currentValue = e.value; // 현재 값
  const maxValue = e.component.option("max"); // 최대 값

  let $currentText = $element.find(".progress-current-text");
  if ($currentText.length) {
    $currentText.text(currentValue);
  } else {
    $("<div>")
      .text(currentValue)
      .addClass("progress-current-text")
      .css({
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: "20px"
      })
      .appendTo(e.element);
  }

  let $maxText = $element.find(".progress-max-text");
  if ($maxText.length) {
    $maxText.text(maxValue);
  } else {
    $("<div>")
      .text(maxValue)
      .addClass("progress-max-text")
      .css({
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#000000",
        fontWeight: "bold",
        fontSize: "20px"
      })
      .appendTo(e.element);
  }
}

function showPopup() {
  let itemsTmp = [];
  for (let i = 0; i < listEquipmentCode.length; i++) {
    itemsTmp.push({
      id: listEquipmentCode[i].equipmentCode,
      name: listEquipmentCode[i].equipmentCode
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

      localStorage.setItem("eqpCodeSel", eqpCodeSel);

      searchList();
      $(".title-fac").text(eqpCodeSel);

      $("#dynamicPopup").dxPopup("hide");
    },
    onCancel: function () {
      // 취소 버튼 클릭 이벤트 처리
      $("#dynamicPopup").dxPopup("hide");
    }
  });
}

function onDestroy() {
  if (intervalList) {
    clearInterval(intervalList);
    intervalList = null;
  }
}

export default {
  onCreate,
  onActive,
  onDestroy
};
