let serverInfo = null;
let loginInfo = null;

const lktStorate = {
  // server: {
  //   publicAddress: "192.168.10.3",
  //   internalAddress: "192.168.10.3",
  //   connectionType: "TEST"
  // },

  // loginInfo: {
  //   userName: "LKT",
  //   password: "QUJDREU=",
  //   connectionType: "TEST",
  //   serverGroup: "SPC#GFC"
  // },

  setServerInfo(param) {
    localStorage.setItem("serverInfo", JSON.stringify(param));
    serverInfo = param;
  },
  getServerInfo() {
    if (serverInfo != null) return serverInfo;
    return JSON.parse(localStorage.getItem("serverInfo"));
  },

  setLoginInfo(param) {
    localStorage.setItem("loginInfo", JSON.stringify(param));
    loginInfo = param;
  },
  getLoginInfo() {
    if (loginInfo != null) return loginInfo;
    return JSON.parse(localStorage.getItem("loginInfo"));
  }
};

export default lktStorate;
