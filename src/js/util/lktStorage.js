let lkt_serverInfo = null;
let lkt_loginInfo = null;

const lktStorage = {
  // server: {
  //   publicAddress: "192.168.10.3",
  //   internalAddress: "192.168.10.3",
  //   connectionType: "TEST"
  // },

  // loginInfo: {
  //   username: "LKT",
  //   password: "QUJDREU=",
  //   connectionType: "TEST",
  //   serverGroup: "SPC#GFC"
  // },

  // setServerInfo(param) {
  //   // 테스트 접속정보
  //   // param.authentication =
  //   //   "ewogICJsa3RIZWFkZXIiOiB7CiAgICAidHlwZSI6ICJsaWNlbnNlIiwKICAgICJjYWxsIjogIkxLVC5MSUNFTlNFIiwKICAgICJzdGF0dXNDb2RlIjogIjAxIiwKICAgICJtZXNzYWdlIjogIiIsCiAgICAiYXV0aGVudGljYXRpb24iOiAiIiwKICAgICJjZW50ZXJDb2RlIjogIkhNT01OSSIsCiAgICAiY2xpZW50Q29kZSI6ICJITU9NTkkiLAogICAgIndhcmVob3VzZUNvZGUiOiAiSE1PTU5JIgogIH0sCiAgImxrdEJvZHkiOiBbCiAgICB7CiAgICAgICJkY2QiOiB7CiAgICAgICAgImhvc3QiOiAiMjExLjExMC4yMjkuMjM5IiwKICAgICAgICAidHlwZSI6ICJNWVNRTCIsCiAgICAgICAgInBvcnQiOiAiMzMwNiIsCiAgICAgICAgInVzZXJuYW1lIjogInNwYyIsCiAgICAgICAgInBhc3N3b3JkIjogIjEwMTBxcHFwITNNIiwKICAgICAgICAiZGF0YWJhc2UiOiAiTEtUIgogICAgICB9LAogICAgICAiaGNkIjogewogICAgICAgICJob3N0IjogIjEyNy4wLjAuMSIKICAgICAgfSwKICAgICAgIm1jZCI6IHsKICAgICAgICAiaG9zdCI6ICIxMjcuMC4wLjEiLAogICAgICAgICJwb3J0IjogIjE4ODMiLAogICAgICAgICJ1c2VybmFtZSI6ICJtYWVyc2siLAogICAgICAgICJwYXNzd29yZCI6ICJtYWVyc2sxMjMjQCEiLAogICAgICAgICJ0b3BpYyI6ICJtYWVyc2siCiAgICAgIH0KICAgIH0KICBdCn0=";

  //   localStorage.setItem("serverInfo", JSON.stringify(param));
  //   lkt_serverInfo = param;
  // },
  // getServerInfo() {
  //   if (lkt_serverInfo != null) return lkt_serverInfo;
  //   return JSON.parse(localStorage.getItem("serverInfo"));
  // },

  setServerInfo(param) {
    localStorage.setItem("serverInfo", JSON.stringify(param));
    lkt_serverInfo = param;
  },
  getServerInfo() {
    if (lkt_serverInfo != null) return lkt_serverInfo;
    return JSON.parse(localStorage.getItem("serverInfo"));
  },

  setLoginInfo(param) {
    localStorage.setItem("loginInfo", JSON.stringify(param));
    lkt_loginInfo = param;
  },
  getLoginInfo() {
    if (lkt_loginInfo != null) return lkt_loginInfo;
    return JSON.parse(localStorage.getItem("loginInfo"));
  }
};

export default lktStorage;
