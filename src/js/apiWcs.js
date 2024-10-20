// api.js

const baseUrlWcs = "http://lkt0dev00.cafe24.com:2014";

// 작업지시
function operation(param) {
  return $.ajax({
    url:
      baseUrlWcs +
      "/outbounds/wcs/operation?id=" +
      "ew0KICAibGt0SGVhZGVyIjogew0KICAgICJ0eXBlIjogIlJFUVVFU1QiLA0KICAgICJjYWxsIjogIlBBR0UuT1VUQk9VTkRTLldDUy5PUkRFUlMiLA0KICAgICJzdGF0dXMiOiAwLA0KICAgICJtZXNzYWdlIjogIiIsDQogICAgImF1dGhlbnRpY2F0aW9uIjogImV5SmpaVzUwWlhKRGIyUmxJam9pVEV0VUlpd2lZMnhwWlc1MFEyOWtaU0k2SWt4TFZDSXNJbmRoY21Wb2IzVnpaVU52WkdVaU9pSk1TMVFpTENKa1lYUmhZbUZ6WlNJNmV5SnpaWEoyWlhJaU9pSXlNVEV1TVRFd0xqSXlPUzR5TXpraUxDSndiM0owSWpvaU16TXdOaUlzSW1SaGRHRmlZWE5sSWpvaVRFdFVJaXdpZFhObGNtNWhiV1VpT2lKemNHTWlMQ0p3WVhOemQyOXlaQ0k2SWpFd01UQnhjSEZ3SVROTklpd2dJbUYwZEhKcFluVjBaVEF4SWpvaVRWbFRVVXdpZlN3aWQyRnpJanA3SW5ObGNuWmxjaUk2SWpJeE1TNHhNVEF1TWpJNUxqSXpPU0lzSW5CdmNuUWlPaUl4TkRNekluMHNJbTF4ZEhRaU9uc2ljMlZ5ZG1WeUlqb2lNakV4TGpFeE1DNHlNamt1TWpNNUlpd2ljRzl5ZENJNklqRTBNek1pTENKMWMyVnlibUZ0WlNJNklteHJkREJrWW1Fd01GOXNhM1F3TUNJc0luQmhjM04zYjNKa0lqb2laR3hrYm1SNVpDRXpUU0o5ZlE9PSIsDQogICAgInVzZXJOYW1lIjogIkxLVCIsDQogICAgImNlbnRlckNvZGUiOiAiTEtUIiwNCiAgICAiY2xpZW50Q29kZSI6ICJMS1QiLA0KICAgICJ3YXJlaG91c2VDb2RlIjogIkxLVCINCiAgfSwNCiAgImxrdEJvZHkiOiBbDQogICAgew0KICAgICAgIndvcmtEYXRlIjogIjIwMjQtMDItMTciDQogICAgfQ0KICBdDQp9", // 실제 API URL로 변경 필요
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    data: {}
  });
}

// 모듈을 객체처럼 내보내기
export default {
  operation
};
