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

  data = [];

  for (let i = 0; i < 1; i++) {
    let dataTmp = {
      facilitiesCode: "냉동 " + (i + 1) + "블럭",
      totalOrderCount: 100,
      workOrderCount: Math.floor(Math.random() * 100),
      totalSkuCount: 100,
      workSkuCount: Math.floor(Math.random() * 100),
      totalPcs: 100,
      workPcs: Math.floor(Math.random() * 100)
    };
    dataTmp.progress = (dataTmp.workOrderCount / dataTmp.totalOrderCount) * 100;
    dataTmp.progress = Math.round(dataTmp.progress);

    data.push(dataTmp);
  }

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
    lktBody: [{}]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .dashboardsPickToLightInstances(encoded)
    .done(function (response) {})
    .fail(function () {
      // 에러 발생 시 처리
      alert("error");
      errorPopup.removeClass("hidden");
    });
}

//$(window).on("resize", resizeGauge);

export default {
  onCreate,
  onActive
};
