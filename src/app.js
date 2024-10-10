const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/" // 정적 파일의 경로를 설정 (기본값은 '/')
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public") // 정적 파일 제공 경로 (public 디렉토리)
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
