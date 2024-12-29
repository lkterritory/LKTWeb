let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;

let intervalList = null;

const idPrefix = "#dash-dashDash-dashDash ";

let data = [];
let dataRes = [];

let elProgress = null;

function onCreate() {
  // Progress Bar 설정

  searchList();
  intervalList = setInterval(() => {
    searchList();
  }, 10000); // 10초에 한번
}

function loadDashboard() {
  data = [];

  for (let i = 0; i < dataRes.length; i++) {
    let dataTmp = {
      facilitiesCode: dataRes[i].equipmentCode,
      totalOrderCount: dataRes[i].totalSkuCount,
      workOrderCount: dataRes[i].processSkuCount,
      totalSkuCount: dataRes[i].totalSkuCount,
      workSkuCount: dataRes[i].processSkuCount,
      totalPcs: dataRes[i].totalQuantity,
      workPcs: dataRes[i].processQuantity
    };

    if (dataTmp.workOrderCount == 0) {
      dataTmp.progress = 0;
    } else
      dataTmp.progress =
        (dataTmp.workOrderCount / dataTmp.totalOrderCount) * 100;
    dataTmp.progress = Math.round(dataTmp.progress);

    if (dataTmp.progress == NaN) {
      // alert(progress);
      dataTmp.progress = 0;
    }
    data.push(dataTmp);
  }

  data.forEach((item, index) => {
    //alert("index" + index);
    const card = $(`
        <div class="dashboard-card">
    <span class="card-title">${item.facilitiesCode}</span>
    <div class="card-content">
      <div class="card-stats">
        <div class="stat-row">
          <span class="stat-label">지점</span>
          <div class="progress-bar-container">
            <div
              id="progressBar${index}_1"
              class="progress-bar"></div>
          </div>
        </div>
        <div class="stat-row">
          <span class="stat-label">SKU</span>
          <div class="progress-bar-container">
            <div
              id="progressBar${index}_2"
              class="progress-bar"></div>
          </div>
        </div>
        <div class="stat-row">
          <span class="stat-label">PCS</span>
          <div class="progress-bar-container">
            <div
              id="progressBar${index}_3"
              class="progress-bar"></div>
          </div>
        </div>
      </div>
            <div class="gauge-container_mask"></div>
            <div id="gaugeContainer${index}" class="gauge-container"></div>
          </div>
        </div>
      `);

    //   totalOrderCount: 90,
    //   workOrderCount: 9,
    //   totalSkuCount: 80,
    //   workSkuCount: 30,
    //   totalPcs: 200,
    //   workPcs: 150,
    //   progress: 91

    if (
      !$(idPrefix + "#dashboard")
        .html()
        .includes(item.facilitiesCode)
    )
      // 없을때만생성
      $(idPrefix + "#dashboard").append(card);

    for (let i = 1; i < 4; i++) {
      //alert("pidx:" + i);
      $(idPrefix + "#progressBar" + index + "_" + i).dxProgressBar({
        animation: {
          // 애니메이션 설정
          enabled: false // 애니메이션 비활성화
        },
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
        onValueChanged: function (e) {
          //onContentReady: function (e) {
          //alert("dd");
          updateProgressBarText(e, item, i);
          //return;
        },
        onContentReady: function (e) {
          updateProgressBarText(e, item, i);
        }
      });

      // if (
      //   !$(idPrefix + "#dashboard")
      //     .html()
      //     .includes(item.facilitiesCode)
      // ) {
    }

    let per = Math.round((item.workOrderCount / item.totalOrderCount) * 100, 0);
    let perRest = 100 - per;
    $(idPrefix + "#gaugeContainer" + index).dxCircularGauge({
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
  });
}

function updateProgressBarText(e, item, i) {
  // 프로그레스바에 텍스트 추가
  const current =
    i == 1 ? item.workOrderCount : i == 2 ? item.workSkuCount : item.workPcs;
  const max =
    i == 1 ? item.totalOrderCount : i == 2 ? item.totalSkuCount : item.totalPcs;

  // jQuery 객체로 변환
  const $element = $(e.element);

  // 현재 값 텍스트 업데이트 또는 추가
  let $currentText = $element.find(".progress-current-text");
  if ($currentText.length) {
    $currentText.text(current); // 값 업데이트
  } else {
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
      .appendTo(e.element); // 새로 추가
  }

  // 최대 값 텍스트 업데이트 또는 추가
  let $maxText = $element.find(".progress-max-text");
  if ($maxText.length) {
    $maxText.text(max); // 값 업데이트
  } else {
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
      .appendTo(e.element); // 새로 추가
  }
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

function onActive() {
  //alert("dd");
  //onCreate();
  //$(".gauge-container").dxCircularGauge("instance").render();
  //   for (let i = 0; i < data.length; i++) {
  //     $("#gaugeContainer" + i)
  //       .dxCircularGauge("instance")
  //       .render();
  //   }
}

function searchList() {
  // 테스트

  // dataRes = [];
  // for (let i = 0; i < 10; i++) {
  //   dataRes.push({
  //     equipmentCode: "DAS-" + (i + 1 >= 10 ? "" : "0") + (i + 1),
  //     totalSkuCount: 302,
  //     processSkuCount: Math.floor(Math.random() * 302) + 1,
  //     totalQuantity: 302,
  //     processQuantity: Math.floor(Math.random() * 302) + 1
  //   });
  // }

  // loadDashboard();
  // return;

  // end 테스트

  var obj = {
    lktHeader: lktUtil.getLktHeader("PAGE.OUTBOUNDS.WCS.ORDERS"),
    lktBody: [{}]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiWcs
    .dashboardsOverallStatus(encoded)
    .done(function (response) {
      try {
        dataRes = response.lktBody;
        loadDashboard();
      } catch (ex) {}
    })
    .fail(function () {
      // 에러 발생 시 처리
    });
}

//$(window).on("resize", resizeGauge);

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
