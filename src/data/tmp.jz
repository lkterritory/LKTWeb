/////////////////////////
// web에서  spc mqtt받는 구조 - 기존에는 lktBody[0].objectValue 값으로만 구분한다.
if (lktBody[0].objectValue.trim() == "") {
  self.selectList();
} else {
  self.barcodeInput();
}
/////////////////////////

/////////////////////////
// mqtt 받는값
if (this.barcode.toUpperCase() == "REMAIN") {
  this.openKioskPopNowork = true;
  this.barcode = "";
  return;
}

if (this.barcode.toUpperCase() == "INSPECTION") {
  this.openKioskPopChecker = true;
  this.barcode = "";
  return;
}

if (this.barcode.toUpperCase() == "REMAIN") {
  this.openKioskPopNowork = true;
  this.barcode = "";
  return;
}

if (this.barcode.toUpperCase() == "INSPECTION") {
  this.openKioskPopChecker = true;
  this.barcode = "";
  return;
}
//
/////////////////////////

/////////////////////////
// scan으로 "LOCATION" 받았을때 mqtt pub 하는값
let reqPayload = {
  lktHeader: {
    type: "REQUEST",
    call: "OUTBOUND.PICKTOLIGHT.INITALIZATION",
    resultCode: 0,
    resultMessage: "",
    authentication: this.userInfo.authentication,
    userName: this.userInfo.userName,
    centerCode: this.userInfo.centerCode,
    clientCode: this.userInfo.clientCode,
    warehouseCode: this.userInfo.warehouseCode
  },
  lktBody: [
    {
      storageTemperatureCode: this.temperInfo.value,
      equipmentCode: this.hogiInfo.value,
      equipmentLine: this.hogiInfo.value,
      equipmentZone: this.hogiInfo.value
    }
  ]
};
/////////////////////////

/////////////////////////
// scan으로 "INIT" 받았을때 mqtt pub 하는값
let reqPayload = {
  lktHeader: {
    type: "REQUEST",
    call: "CORE.PICKTOLIGHT.LOCATION",
    resultCode: 0,
    resultMessage: "",
    authentication: this.userInfo.authentication,
    userName: this.userInfo.userName,
    centerCode: this.userInfo.centerCode,
    clientCode: this.userInfo.clientCode,
    warehouseCode: this.userInfo.warehouseCode
  },
  lktBody: [
    {
      storageTemperatureCode: this.temperInfo.value,
      equipmentCode: this.hogiInfo.value,
      equipmentLine: this.hogiInfo.value,
      equipmentZone: this.hogiInfo.value
    }
  ]
};
/////////////////////////

/////////////////////////
// 바코드 스캔 시 받았을때 mqtt pub 하는값
let reqPayload = {
  lktHeader: {
    type: "REQUEST",
    call:
      this.temperInfo.value == "FZ"
        ? "OUTBOUND.OJBECT.SCAN.PUT"
        : "OUTBOUND.OJBECT.SCAN02.PUT",
    resultCode: 0,
    resultMessage: "",
    authentication: this.userInfo.authentication,
    userName: this.userInfo.userName,
    centerCode: this.userInfo.centerCode,
    clientCode: this.userInfo.clientCode,
    warehouseCode: this.userInfo.warehouseCode
  },
  lktBody: [
    {
      storageTemperatureCode: this.temperInfo.value,
      equipmentCode: this.hogiInfo.value,
      equipmentLine: this.hogiInfo.value,
      equipmentZone: this.hogiInfo.value,
      skuCode: this.barcode
    }
  ]
};
/////////////////////////

/////////////////////////
/// 작업중단 버튼 클릭시 mqtt pub 하는값
let reqPayload = {
  lktHeader: {
    type: "REQUEST",
    call: "OUTBOUND.ORDER.CANCEL.PUT",
    resultCode: 0,
    resultMessage: "",
    authentication: this.userInfo.authentication,
    userName: this.userInfo.userName,
    centerCode: this.userInfo.centerCode,
    clientCode: this.userInfo.clientCode,
    warehouseCode: this.userInfo.warehouseCode
  },
  lktBody: [
    {
      storageTemperatureCode: temperInfo.value,
      equipmentCode: hogiInfo.value,
      equipmentLine: hogiInfo.value,
      equipmentZone: hogiInfo.value,
      skuCode: row.skuCode
    }
  ]
};
/////////////////////////
