let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;



let data = [];



let intervalList = null;
let selectedValue = "";


function onCreate() {

  $("#networkPopup").remove(); // 팝업 끄기

  searchList();

  $("#locationSelect").on("change", function () {
    selectedValue = $(this).val();
    console.log("선택된 값:", selectedValue);
    searchList(); // 선택된 값에 따라 리스트 업데이트
  });

  // 3초마다 호출
  setInterval(searchList, 3000)

}

//데이터 호출
function searchList() {
  var obj = {
    lktHeader: lktUtil.getLktHeader("GET.OUTBOUND.EQUIPMENT.AUTOMATIC.GUIDED.VEHICLE.LOCATIONS.TASKS.STATUS"),
    lktBody: [{ "locationZone": "X01" }]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiWcs.dashboardsPdaLocation(encoded)
    .done(function (response) {
      try {
        let data = response.lktBody;
       

        // locationCode의 앞 3글자만 추출하고 중복 제거 후 배열로 반환
        let prefixes = extractLocationPrefixes(data);

        // 셀렉트박스 생성
        createSelectBox(prefixes);

        // 선택된 값이 있을 경우에만 데이터 업데이트
        if (selectedValue) {
          updateBoxes(data, selectedValue);
        } else {
          $("#workOrderGrid").empty(); // 선택되지 않은 경우 초기화
        }
      } catch (ex) {
        console.error(ex);
      }
    })
    .fail(function () {
      console.error("API 호출 실패");
    });
}

function updateBoxes(data, selectedValue) {
  let container = $("#workOrderGrid");
  container.empty();
  let html = '';

  let filteredData = data.filter(item => item.locationCode.startsWith(selectedValue));

  console.log(filteredData);

  filteredData.forEach((item, index) => {
    if (index % 20 === 0 && index !== 0) {
      html += `<div class="gap-section"></div>`;
    }
    if (index % 4 === 0) {
      html += `<div class="grid-row">`;
    }

    let bgColor = item.objectColor === "G" ? "green" :
                  item.objectColor === "W" ? "white" :
                  item.objectColor === "R" ? "red" :
                  item.objectColor === "Y" ? "yellow" :
                  item.objectColor === "B" ? "blue" : "gray";

    html += `
      <div class="grid-item" style="background-color: ${bgColor};">
        <div class="box-header">${item.locationCode}</div>
      </div>
    `;

    if ((index + 1) % 4 === 0 || index === filteredData.length - 1) {
      html += `</div>`;
    }
});

container.append(html);
}

function extractLocationPrefixes(data) {
  let prefixes = [];

  data.forEach(item => {
    let prefix = item.locationCode.substring(0, 3);
    if (prefix >= 'S01' && prefix <= 'S16' && !prefixes.includes(prefix)) {
      prefixes.push(prefix);
    }
  });
  return prefixes;
}

function createSelectBox(prefixes) {
  let selectBox = $("#locationSelect");
  selectBox.empty();
  selectBox.append('<option value="">선택하세요</option>');

  prefixes.forEach(prefix => {
    selectBox.append(`<option value="${prefix}" ${selectedValue === prefix ? 'selected' : ''}>${prefix}</option>`);

  });
}


function onActive(){}



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
