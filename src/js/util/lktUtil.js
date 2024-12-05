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
      username: "",
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
    lktUtil.lktPayload.lktHeader.username = loginInfo.username;

    lktUtil.lktPayload.lktHeader.authentication = serverInfo.authentication;

    return lktUtil.lktPayload.lktHeader;
  },
  createDynamicPopup(options) {
    // 기본 옵션 설정
    const defaultOptions = {
      title: "기본 팝업", // 기본 타이틀
      isModi: false, // 기본 수정 여부
      width: 450,
      height: "auto",
      formItems: [], // 기본 폼 항목
      onExecute: function () {}, // 실행 버튼 클릭 이벤트 (기본 빈 함수)
      onCancel: function () {
        $("#dynamicPopup").dxPopup("hide"); // 취소 시 팝업 닫기
      }
    };

    // 사용자 정의 옵션으로 덮어쓰기
    const popupOptions = Object.assign({}, defaultOptions, options);

    // 팝업 생성
    $("#dynamicPopup")
      .dxPopup({
        title: popupOptions.title,
        visible: true,
        width: popupOptions.width,
        height: popupOptions.height,
        showCloseButton: false,
        dragEnabled: true,
        contentTemplate: function (contentElement) {
          // 동적 폼 생성
          const formInstance = $("<div>")
            .appendTo(contentElement)
            .dxForm({
              formData: {}, // 폼 데이터
              items: popupOptions.formItems // 폼 아이템 배열
            })
            .dxForm("instance");

          // 버튼 컨테이너 생성
          const buttonContainer = $("<div>")
            .css({
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px"
            })
            .appendTo(contentElement);

          // 취소 버튼 추가
          $("<div>").appendTo(buttonContainer).dxButton({
            text: "취소",
            onClick: popupOptions.onCancel
          });

          // 실행 버튼 추가
          $("<div>")
            .appendTo(buttonContainer)
            .dxButton({
              text: "실행",
              type: "default",
              onClick: function () {
                const formData = formInstance.option("formData");
                popupOptions.onExecute(formData); // 외부에서 전달된 실행 로직 호출
              }
            });
        }
      })
      .dxPopup("show");
  }
};

export default lktUtil;
