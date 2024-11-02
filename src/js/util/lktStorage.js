let lkt_serverInfo = null;
let lkt_loginInfo = null;

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

export default lktStorate;
