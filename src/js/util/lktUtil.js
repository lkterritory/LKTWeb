import lktStorate from "./lktStorage.js";

const lktUtil = {
  lktPayload: {
    lktHeader: {
      type: "REQUEST",
      call: "",
      status: 0,
      message: "",
      // authorization: "",
      authentication: "",
      userName: "",
      centerCode: "",
      clientCode: "",
      warehouseCode: ""
    },
    lktBody: []
  },

  // 값 반환 함수
  getLktHeader(call) {
    let loginInfo = lktStorate.getLoginInfo();
    let serverInfo = lktStorate.getServerInfo();

    lktUtil.lktPayload.lktHeader.call = call;
    lktUtil.lktPayload.lktHeader.centerCode = loginInfo.centerCode;
    lktUtil.lktPayload.lktHeader.clientCode = loginInfo.clientCode;
    lktUtil.lktPayload.lktHeader.warehouseCode = loginInfo.warehouseCode;
    lktUtil.lktPayload.lktHeader.userName = loginInfo.userName;

    lktUtil.lktPayload.lktHeader.authentication = serverInfo.authentication;

    return lktUtil.lktPayload.lktHeader;
  }
};

export default lktUtil;
