function onCreate() {
  const dynamicSection = document.getElementById("dynamicSection");

  // 예제 항목 데이터
  const items = [
    {name: "3D-SORTER - 1호기", units: ["Box", "PCS"]},
    {name: "3D-SORTER - 2호기", units: ["Box", "PCS"]},
    {name: "3D-SORTER - 3호기", units: ["Box", "PCS"]},
    {name: "DAS", units: ["Box", "PCS"]},
    {name: "합계", units: ["Box", "PCS"]}
  ];

  // 동적으로 항목을 추가하는 함수
  items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("dynamic-item");

    const itemTitle = document.createElement("h4");
    itemTitle.textContent = item.name;
    itemDiv.appendChild(itemTitle);

    item.units.forEach((unit) => {
      const unitDiv = document.createElement("div");
      unitDiv.textContent = unit;
      itemDiv.appendChild(unitDiv);
    });

    dynamicSection.appendChild(itemDiv);
  });
}

function onActive() {}

export default {
  onCreate,
  onActive
};
