// api.js

const baseUrlWcs = "http://lkt0dev00.cafe24.com:2014";
// const baseUrlWcs = "http://10.150.26.150:2014";

$.ajaxSetup({
  beforeSend: function (jqXHR, settings) {
    $("#networkPopup")
      .dxPopup({
        title: "로딩중...",
        visible: true,
        width: 300,
        height: 100,
        contentTemplate: function (contentElement) {
          const formInstance = $("<div>")
            .appendTo(contentElement)
            .dxForm({
              formData: {},
              items: []
            })
            .dxForm("instance");
        }
      })
      .dxPopup("show");

    // 임시 강제닫기
    setTimeout(function () {
      $("#networkPopup").dxPopup("hide");
    }, 1);
  },
  complete: function (jqXHR, textStatus) {
    $("#networkPopup").dxPopup("hide");
  }
});

// 작업차수
function workbatch(param) {
  return $.ajax({
    url: baseUrlWcs + "/pub001/workbatch?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 작업지시 start
// 작업조회
function wcsOperation(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/operation?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 작업계획
function wcsOperationPlan(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/operation/plan",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

// 작업시작
function wcsOperationStart(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/operation/start",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

// 차수완료
function wcsOperationcCompleted(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/operation/completed",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

// 전체완료
function wcsOperationcClosing(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/operation/closing",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

// 작업취소
function wcsOperationcCancel(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/operation/cancel",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
// 작업지시 end

// 검수 start
function wcsInspectionsList(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/inspections?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

function wcsInspectionsConfirm(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/inspections",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

function wcswcsInspectionsCompletion(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/inspections/completion",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
// 검수 end

// 중분류 start
function wcsMiddleCategories(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/middle-categories?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
// 중분류 end

// 주문별작업현황
function statusOrders(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/status/orders?id=" + +param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 주문별작업현황(상세)
function statusOrderDetail(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/status/orders/detail?id=" + +param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 상품별작업현황
function statusSkus(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/status/skus?id=" + +param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 상품별작업현황(상세)
function statusSkusDetail(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/status/skus/detail?id=" + +param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 설비별작업현황
function statusEquipment(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/status/equipment?id=" + +param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 설비별작업현황(상세)
function statusEquipmentDetail(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/status/equipment/detail?id=" + +param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 상황판
function dashboardsOverallStatus(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/dashboards/overall-status?id=" + +param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 표시기 전체 상황판
function dashboardspPickToLightStatus(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/dashboards/pick-to-light-status?id=" + +param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 표시기 호기별 상황판
function dashboardsPickToLightInstances(param) {
  return $.ajax({
    url:
      baseUrlWcs + "/outbounds/dashboards/pick-to-light-instances?id=" + +param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

export default {
  workbatch,

  wcsOperation,
  wcsOperationPlan,
  wcsOperationStart,
  wcsOperationcCompleted,
  wcsOperationcClosing,
  wcsOperationcCancel,

  statusOrders,
  statusOrderDetail,
  statusSkus,
  statusSkusDetail,
  statusEquipment,
  statusEquipmentDetail,

  wcsMiddleCategories,

  wcsInspectionsList,
  wcsInspectionsConfirm,
  wcswcsInspectionsCompletion,

  dashboardsOverallStatus,
  dashboardspPickToLightStatus,
  dashboardsPickToLightInstances
};
