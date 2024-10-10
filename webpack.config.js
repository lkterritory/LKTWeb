const path = require("path");

module.exports = {
  entry: "./src/app.js", // 진입점 파일
  output: {
    filename: "bundle.js", // 번들된 파일 이름
    path: path.resolve(__dirname, "dist"), // 출력 디렉터리
    publicPath: "/" // 개발 서버에서 사용할 경로
  },
  module: {
    rules: [
      {
        test: /\.css$/, // CSS 파일 처리
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public") // 정적 파일 제공 경로 (ex: index.html)
    },
    compress: true, // gzip 압축 사용
    port: 9000, // 개발 서버의 포트 번호
    hot: true, // 핫 모듈 리플레이스먼트 활성화
    open: true // 서버 실행 후 브라우저 자동 열기
  }
};
