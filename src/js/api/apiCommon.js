// api.js

const baseUrlCommon = "http://lkt0dev00.cafe24.com:4132";

// EUC 조회
function enduserComputing(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/enduser-computing?id=" + param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// EUC 실행
function enduserComputingExecute(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/enduser-computing/execute?id=" + +param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 보고서 조회
function reportViewer(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/report-viewer?id=" + +param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 보고서 실행
function reportViewerExecute(param) {
  return $.ajax({
    url: baseUrlCommon + "/cores/report-viewer/execute?id=" + +param,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 모듈을 객체처럼 내보내기
export default {
  enduserComputing,
  enduserComputingExecute,
  reportViewer,
  reportViewerExecute
};
