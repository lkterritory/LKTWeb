let apiCommon;
let lktUtil;

if (!window.apiCommonModule || !window.lktUtilModule) {
  window.apiCommonModule = import(`../../js/api/apiCommon.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../js/util/lktUtil.js?t=${Date.now()}`);
}

function onCreate() {
  const data = [
    {title: "냉동 1블럭", progress: 91, sku: 184, pcs: 2218},
    {title: "냉동 2블럭", progress: 91, sku: 177, pcs: 1948},
    {title: "냉동 3블럭", progress: 92, sku: 184, pcs: 2600},
    {title: "냉동 4블럭", progress: 89, sku: 168, pcs: 1993},
    {title: "냉동 5블럭", progress: 92, sku: 173, pcs: 1925},
    {title: "냉동 6블럭", progress: 85, sku: 179, pcs: 2046},
    {title: "냉동 7블럭", progress: 87, sku: 181, pcs: 2206},
    {title: "냉동 8블럭", progress: 81, sku: 166, pcs: 2035},
    {title: "냉동 9블럭", progress: 76, sku: 149, pcs: 1697}
  ];

  data.forEach((item, index) => {
    const card = $(`
        <div class="dashboard-card">
        <span>${item.title}</span>
          <div class="card-content">
            <div class="card-stats">
              <div class="stat-row">
                <span class="stat-label">지점</span>
                <span class="stat-value">3</span>
                <span class="stat-max">48</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">SKU</span>
                <span class="stat-value">${item.sku}</span>
                <span class="stat-max">201</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">PCS</span>
                <span class="stat-value">${item.pcs}</span>
                <span class="stat-max">2,567</span>
              </div>
            </div>
            <div id="gaugeContainer${index}" class="gauge-container"></div>
          </div>
        </div>
      `);

    $("#dashboard").append(card);

    $(".gauge-container").dxCircularGauge({
      value: 91,
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
        size: 15
      },
      geometry: {
        startAngle: 0,
        endAngle: 360
      },
      centerTemplate: (gauge, container) => {
        // 루트 요소에 텍스트 추가
        const rect = createRect(50, 0, "transparent");
        const text = createText(10, 200, 12, "start", gauge.value());
        // alert(text);
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
