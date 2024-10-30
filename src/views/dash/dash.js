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
            <div class="card-title">${item.title}</div>
            <div id="gaugeContainer${index}" class="gauge-container"></div>
            <div class="card-stats">
              <p>SKU: ${item.sku}</p>
              <p>PCS: ${item.pcs}</p>
            </div>
          </div>
        `);
    $("#dashboard").append(card);

    $(`#gaugeContainer${index}`).dxCircularGauge({
      scale: {
        startValue: 0,
        endValue: 100,
        tickInterval: 20,
        label: {
          customizeText(arg) {
            return `${arg.valueText}`;
          }
        }
      },
      rangeContainer: {
        ranges: [
          {startValue: 0, endValue: 60, color: "#e0e0e0"},
          {startValue: 60, endValue: 80, color: "#ffb400"},
          {startValue: 80, endValue: 100, color: "#3ba4dc"}
        ]
      },
      value: item.progress,
      valueIndicator: {
        type: "rectangleNeedle",
        color: "#3ba4dc"
      }
    });
  });
}

function onActive() {}

export default {
  onCreate,
  onActive
};
