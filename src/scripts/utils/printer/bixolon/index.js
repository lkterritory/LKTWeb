import bxlcommon from "@/utils/printer/bixolon/bxlcommon";
import bxllabel from "@/utils/printer/bixolon/bxllabel";

let p_name = "Printer1";
let inch = 2; // 2,3,4
let issueID = 1;

function viewResult(result) {
  console.log("result :", result);
}

function setCharacterset() {
  bxllabel.setCharacterset(13, 0); // 한국어
}

function PrintLabel(data) {
  bxllabel.setLabelId(issueID);
  bxllabel.clearBuffer();

  if (inch == 2) {
    // 2inch sample
    bxllabel.setWidth(380);
    bxllabel.drawDeviceFont(data.ordNo, 10, 15, "0", 2, 2, 0, 0, 0, 0);

    // 한글 사용 시 fontType 참조
    bxllabel.drawDeviceFont("논산 센터", 10, 40, "b", 3, 3, 0, 0, 1, 0);

    bxllabel.draw1DBarcode(data.itemNo, 10, 180, 1, 3, 2, 96, 0, 3);
    bxllabel.drawBlock(10, 60, 350, 160, "B", 5);

    // 한글 사용시 벡터 폰트 + K
    bxllabel.drawVectorFont(
      "논산 센터",
      10,
      350,
      "K",
      40,
      40,
      0,
      0,
      1,
      0,
      0,
      0,
      false
    );
  } else if (inch == 3) {
    // 3inch sample
    bxllabel.setWidth(576);
    bxllabel.drawDeviceFont(data.ordNo, 10, 15, "0", 2, 2, 0, 0, 0, 0);

    bxllabel.drawDeviceFont(data.itemNo, 10, 40, "2", 4, 4, 0, 0, 1, 0);
    bxllabel.draw1DBarcode(data.itemNo, 10, 180, 1, 3, 2, 96, 0, 3);
    bxllabel.drawBlock(10, 60, 556, 170, "B", 5);
    bxllabel.drawVectorFont(
      "test",
      10,
      350,
      "U",
      40,
      40,
      0,
      0,
      1,
      0,
      0,
      0,
      false
    );
  } else if (inch == 4) {
    // 4inch sample
    bxllabel.setWidth(832);
    bxllabel.drawDeviceFont(data.ordNo, 10, 15, "0", 2, 2, 0, 0, 0, 0);

    bxllabel.drawDeviceFont(data.itemNo, 10, 40, "2", 4, 4, 0, 0, 1, 0);
    bxllabel.draw1DBarcode(data.itemNo, 10, 180, 1, 3, 2, 96, 0, 3);
    bxllabel.drawBlock(10, 60, 800, 170, "B", 5);
    bxllabel.drawVectorFont(
      "test",
      10,
      350,
      "U",
      40,
      40,
      0,
      0,
      1,
      0,
      0,
      0,
      false
    );
  } else {
    // error
    return;
  }

  bxllabel.printBuffer();

  var strSubmit = bxllabel.getLabelData();

  console.log(strSubmit);

  issueID++;
  bxlcommon.requestPrint(p_name, strSubmit, viewResult);
}

const bixolon = {
  setCharacterset,
  PrintLabel
};

export default bixolon;
