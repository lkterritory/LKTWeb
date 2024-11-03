let apiCommon;
let lktUtil;

if (!window.apiCommonModule || !window.lktUtilModule) {
  window.apiCommonModule = import(`../../js/api/apiCommon.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../js/util/lktUtil.js?t=${Date.now()}`);
}

function onCreate() {
  // Progress Bar 설정

  let data = [
    // {title: "냉동 1블럭", progress: 91, sku: 184, pcs: 2218},
    // {title: "냉동 2블럭", progress: 91, sku: 177, pcs: 1948},
    // {title: "냉동 3블럭", progress: 92, sku: 184, pcs: 2600},
    // {title: "냉동 4블럭", progress: 89, sku: 168, pcs: 1993},
    // {title: "냉동 5블럭", progress: 92, sku: 173, pcs: 1925},
    // {title: "냉동 6블럭", progress: 85, sku: 179, pcs: 2046},
    // {title: "냉동 7블럭", progress: 87, sku: 181, pcs: 2206},
    // {title: "냉동 8블럭", progress: 81, sku: 166, pcs: 2035},
    // {title: "냉동 9블럭", progress: 76, sku: 149, pcs: 1697}
    // {
    //   facilitiesCode: "냉동 1블럭",
    //   totalOrderCount: 90,
    //   workOrderCount: 9,
    //   totalSkuCount: 80,
    //   workSkuCount: 30,
    //   totalPcs: 200,
    //   workPcs: 150,
    //   progress: 91
    // }
  ];

  for (let i = 0; i < 9; i++) {
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

  alert(JSON.stringify(data));
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

    $("#dashboard").append(card);

    for (let i = 1; i < 4; i++) {
      //alert("pidx:" + i);
      $("#progressBar" + index + "_" + i).dxProgressBar({
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

    $("#gaugeContainer" + index).dxCircularGauge({
      value: item.progress,
      rangeContainer: {
        backgroundColor: "none",
        ranges: []
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
      valueIndicator: {
        type: "rangeBar",
        color: "#3a80f6",
        offset: 5,
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

function searchList() {}

export default {
  onCreate,
  onActive
};
