// api.js

const baseUrlWcs = "http://lkt0dev00.cafe24.com:2014";

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
function wcsOperation(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/operation?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

function wcsOperationPlan(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/operation/plan",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

function wcsOperationStart(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/operation/start",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}

function wcsOperationStart(param) {
  return $.ajax({
    url: baseUrlWcs + "/outbounds/wcs/operation/start",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: param
  });
}
// 작업지시 end

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

// 모듈을 객체처럼 내보내기
export default {
  workbatch,
  wcsOperation,
  statusOrders,
  statusOrderDetail,
  statusSkus,
  statusSkusDetail,
  statusEquipment,
  statusEquipmentDetail
};
