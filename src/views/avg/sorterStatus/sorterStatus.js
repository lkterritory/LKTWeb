let apiWcs;
let lktUtil;

if (!window.apiWcsModule || !window.lktUtilModule) {
  window.apiWcsModule = import(`../../../js/api/apiWcs.js?t=${Date.now()}`);
  window.lktUtilModule = import(`../../../js/util/lktUtil.js?t=${Date.now()}`);
}

apiWcs = (await window.apiWcsModule).default;
lktUtil = (await window.lktUtilModule).default;



let data = [];



let apiData = [];
let selectedValue = "";
let isFirstLoad = true; // 첫 로드 여부 확인

function onCreate() {
  $("#networkPopup").remove();

  searchList(true);

  $("#selectLocationBtn").dxButton({
    text: "로케이션 선택",
    stylingMode: "contained",
    type: "default",
    width: 150,
    onClick: function () {
      showPrefixPopup(extractLocationPrefixes(apiData));
    }
  });

  setInterval(() => searchList(false), 3000);
}


function searchList(isFirst) {
  var obj = {
    lktHeader: lktUtil.getLktHeader("GET.OUTBOUND.EQUIPMENT.AUTOMATIC.GUIDED.VEHICLE.LOCATIONS.TASKS.STATUS"),
    lktBody: [{ 
      equipmentCode: "3D-Sorter",
      equipmentLine: "SS001",
      equipmentZone: "",
      storageTemperatureCode: ""
    }]
  };

  var encoded = btoa(JSON.stringify(obj));

  apiWcs.dashboardsPdaLocation(encoded)
    .done(function (response) {
      try {
       
        apiData = response.lktBody;
        //console.log(apiData)
        let prefixes = extractLocationPrefixes(apiData);

        // 페이지 최초 로드 시 팝업을 띄운다 (isFirst = true)
        if (isFirst && !selectedValue) {
          showPrefixPopup(prefixes);
        }
       
        // 선택된 값이 있을 경우 데이터 업데이트
        if (selectedValue) {
          updateBoxes(apiData, selectedValue);
        } else {
          $("#workOrderGrid").empty(); // 선택하지 않은 경우 화면을 초기화
        }

      } catch (ex) {
        console.error(ex);
      }
    })
    .fail(function () {
      console.error("API 호출 실패");
    });
}

// Prefix 목록 추출
function extractLocationPrefixes(data) {
 
  let prefixes = new Set();
  data.forEach(item => {
    if (item.locationCode) {
      let prefix = item.locationCode.substring(0, 3);
      if (prefix >= '101' && prefix <= '116') {
        prefixes.add(prefix);
      }
    }
  });
  return Array.from(prefixes);
}

// "로케이션 선택" 버튼 클릭 시 팝업 띄우기
function showPrefixPopup(prefixes) {
  let message = prefixes.length > 0 ? "" : "로케이션 데이터가 없습니다.";

  $("#prefixPopup").dxPopup({
    title: "로케이션 선택",
    shading: true,
    hideOnOutsideClick: true,
    contentTemplate: function(contentElement) {
      contentElement.append("<p>" + message + "</p>");

      if (prefixes.length > 0) {
        $("<div>").attr("id", "prefixSelectBox").appendTo(contentElement);

        $("#prefixSelectBox").dxSelectBox({
          dataSource: prefixes,
          placeholder: "선택하세요",
          width: "100%",
          onValueChanged: function(e) {
            if (e.value) {
              selectedValue = e.value;
              updateBoxes(apiData, selectedValue);

              let popupInstance = $("#prefixPopup").dxPopup("instance");
              popupInstance.hide();
            }
          }
        });
      }
    },
    width: 400,
    height: "auto",
    showCloseButton: true,
    dragEnabled: true,
    visible: true
  }).dxPopup("instance").show();
}

// 선택된 Prefix로 locationCode 목록을 화면에 출력하는 함수
function updateBoxes(data, selectedValue) {
  let container = $("#workOrderGrid");
  container.empty();
  let html = '';
  
  let filteredCodes = data.filter(item => item.locationCode.startsWith(selectedValue));

    html += `<div class="location-number"> 로케이션 : ${selectedValue}</div>`;
  
    filteredCodes.forEach((item, index) => {
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

    if ((index + 1) % 4 === 0 || index === filteredCodes.length - 1) {
      html += `</div>`;
    }
  });

  container.append(html);
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
