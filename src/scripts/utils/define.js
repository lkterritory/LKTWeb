// 개발 환경 인터페이스 설정
// JAVA Boot버전 대응하는 백엔드 인터페이스 주소
// JAVA Cloud대응하는 게이트웨이 주소
const APIURl =
  process.env.NODE_ENV === "development"
    ? "http://lkt0dev00.cafe24.com:1981"
    : // ? "http://lkt0maersk.cafe24.com:1981"
      "";

const APIDUALURl =
  process.env.NODE_ENV === "development"
    ? "http://lkt0dev00.cafe24.com:2007"
    : // ? "http://lkt0maersk.cafe24.com:2007"
      "";

module.exports = {
  APIURl: APIURl,
  DUAL_APIURl: APIDUALURl,
  timeout: process.env.NODE_ENV === "development" ? 1000000 : 1000000,
  // 20230110 조형근
  // 웹소켓으로 메시지 처리 예정 없어서 주석처리함
  // WebSocketUrl:
  //   process.env.NODE_ENV === "development"
  //     ? APIURl.replace("http", "ws") + "/api/message/websocket"
  //     : process.env.VUE_APP_BASE_WSS,
  reportLicense:
    "lkt0dev00.cafe24.com,E646151136621497#B1HdwBFawklNRxkVhFkb7gUUVRlSRNUb5UXMwgHaaJjRTRGWxlkQMllQM9GRxQENXdVSxdHUiJ6S6Q7NrAXUDx6dzEDWmJUYoRDNkhXWYdHZ9l5ZupmMI9GN5JFM5ZHNThTMKl6brU7LvVXcz36TCxkMGdzK6siZNpHVHpVbzQUYRV6bvkXRtZHNZ3WSi3EazBVRsxWbIlGcYVVUHl7YSR5aV9EcrMGMaFEc0dUQxA5Zq5WTuNFM846aUpVdrUUN6UVekx4TQBVWmVncV3iYSZlTJFjRFtkZFdGNlFVM5dWTohjdBRTRRZXVOR6Qj5WRuVnWopkMzQ4cykWNZF5NrYTdEp5M75kI0IyUiwiIGF4NDVjQzEjI0ICSiwyMwIzN8QjN4QTM0IicfJye35XX3JCVGZVWiojIDJCLiQjVgMlS4J7bwVmUlZXa4NWQiojIOJyebpjIkJHUiwiIzETNwkDMgMjM5AzMyAjMiojI4J7QiwiIxIDOwMjMwIjI0ICc8VkIsISbvNmL4ITZmF6YuADM6VGZwQ7asJiOiMXbEJCLiwqprDqhtzqprzYhtTbnsDIvsj9lsLiOiEmTDJCLlVnc4pjIsZXRiwiI7kDNxIjN6MTMxUTM6QjNiojIklkIs4XXbpjInxmZiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34TQrgVM7YGd7EXYIJ4Kzw4N6tkQ9EkevYXbkBle44UYvZzcrMEd4lTSvRneHZTZ7IEe7pUV4pFM8ZUd8ZzLKdmUCZjMwp7YXV7TvYXcn9fRwd"
};
