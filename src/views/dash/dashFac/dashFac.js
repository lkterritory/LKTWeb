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

function onCreate() {
  searchList();
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
  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [{equipmentCode: "DAS-01"}]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .dashboardsPickToLightInstances(encoded)
    .done(function (response) {
      $(".sumbox-con-1-fac").text(getFormattedDate());

      //$(".sumbox-con-2-fac").text(getFormattedDate());
      $(".sumbox-con-3-fac").text("0/hr");
      $("#sumbox-con-3-fac-1").text("0/hr");
      try {
        loadBar(response.lktBody);
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

function loadBar(data) {
  //   {
  //     "centerCode": "LKT",
  //     "clientCode": "LKT",
  //     "warehouseCode": "LKT",
  //     "totalSkuCount": 20,
  //     "processSkuCount": 0,
  //     "totalQuantity": 102,
  //     "processQuantity": 0
  // }

  //for (let i = 0; i < 1; i++) {

  data[0] = {
    facilitiesCode: "DAS-01",
    totalOrderCount: data[0].totalSkuCount,
    workOrderCount: data[0].processSkuCount,
    totalSkuCount: data[0].totalSkuCount,
    workSkuCount: data[0].processSkuCount,
    totalPcs: data[0].totalQuantity,
    workPcs: data[0].processQuantity
  };
  data[0].progress = (data[0].workOrderCount / data[0].totalOrderCount) * 100;
  data[0].progress = Math.round(data[0].progress);

  //data.push(dataTmp);
  //}

  let item = data[0];

  for (let i = 1; i < 4; i++) {
    $(idPrefix + "#progressBar_" + i).dxProgressBar({
      value:
        i == 1
          ? item.workOrderCount
          : i == 2
          ? item.workSkuCount
          : item.workPcs, // 현재 값
      min: 0, // 최소값
      max:
        i == 1
          ? item.totalOrderCount
          : i == 2
          ? item.totalSkuCount
          : item.totalPcs, // 현재 값, // 최대값
      showStatus: false, // 기본 텍스트 표시 끄기
      onContentReady: function (e) {
        // 프로그레스바에 텍스트 추가
        const current =
          i == 1
            ? item.workOrderCount
            : i == 2
            ? item.workSkuCount
            : item.workPcs;
        const max =
          i == 1
            ? item.totalOrderCount
            : i == 2
            ? item.totalSkuCount
            : item.totalPcs;

        // 현재 값 왼쪽에 표시
        $("<div>")
          .text(current)
          .addClass("progress-current-text")
          .css({
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#ffffff", // 원하는 색상으로 변경
            fontWeight: "bold"
          })
          .appendTo(e.element);

        // 최대 값 오른쪽에 표시
        $("<div>")
          .text(max)
          .addClass("progress-max-text")
          .css({
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#000000", // 원하는 색상으로 변경
            fontWeight: "bold"
          })
          .appendTo(e.element);
      }
    });
  }

  let per = Math.round((item.workOrderCount / item.totalOrderCount) * 100, 0);
  let perRest = 100 - per;
  $(idPrefix + "#gaugeContainer").dxCircularGauge({
    value: item.progress,

    rangeContainer: {
      backgroundColor: "#e0e0e0", // 채워지지 않은 부분의 색상
      width: 20, // rangeContainer의 두께 설정
      ranges: [
        {startValue: 0, endValue: per, color: "#3a80f6"}, // 채워진 부분의 색상
        {startValue: 56, endValue: perRest, color: "#e0e0e0"} // 비워진 부분의 색상
      ]
    },

    scale: {
      startValue: 0,
      endValue: 100,
      tick: {
        visible: false
      },
      label: {
        visible: false
      }
    },

    //valueIndicator: "none",
    valueIndicator: {
      type: "none",
      color: "#3a80f6",
      offset: 10000,
      size: 20
    },

    geometry: {
      startAngle: 0,
      endAngle: 360
    },
    centerTemplate: (gauge, container) => {
      // 루트 요소에 텍스트 추가
      const rect = createRect(50, 0, "transparent");
      // alert(gauge.value);
      const text = createText(10, 200, 40, "start", gauge.value() + "%");

      container.appendChild(rect);
      container.appendChild(text);
    }
  });
}

export default {
  onCreate,
  onActive
};
