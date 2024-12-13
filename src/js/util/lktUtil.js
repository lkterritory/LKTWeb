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
  },
  createGridPopup(options) {
    // 기본 옵션 설정
    const defaultOptions = {
      title: "기본 팝업", // 기본 타이틀
      isModi: false, // 기본 수정 여부
      width: 768,
      height: "auto",
      formItems: [], // 기본 폼 항목
      onExecute: function () {}, // 실행 버튼 클릭 이벤트 (기본 빈 함수)
      onCancel: function () {
        $("#dynamicPopup").dxPopup("hide"); // 취소 시 팝업 닫기
      },
      onSearch: function () {}, // 조회 버튼 이벤트
      gridDataSource: [] // 초기 그리드 데이터 소스
    };

    // 사용자 정의 옵션으로 덮어쓰기
    const popupOptions = Object.assign({}, defaultOptions, options);

    let inputBoxCount;
    let maxCnt = 0;
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
          let gridInstance;

          // 상단 레이아웃 생성
          const topContainer = $("<div>")
            .css({
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px"
            })
            .appendTo(contentElement);

          // 입력란 추가 (왼쪽)
          const inputBox = $("<div>")
            .css({flex: 1, marginRight: "10px"})
            .appendTo(topContainer)
            .dxTextBox({
              placeholder: "검색어 입력",
              onValueChanged: function (e) {
                popupOptions.searchText = e.value; // 입력된 검색어 저장
              }
            });

          // 조회 버튼 추가 (오른쪽)
          $("<div>")
            .css({flexShrink: 0})
            .appendTo(topContainer)
            .dxButton({
              text: "조회",
              type: "default",
              onClick: function () {
                if (popupOptions.onSearch) {
                  popupOptions.onSearch(popupOptions.searchText, gridInstance); // 조회 이벤트 호출
                }
              }
            });

          // 그리드 컨테이너 생성 (하단)
          const gridContainer = $("<div>")
            .css({marginTop: "20px"})
            .appendTo(contentElement);

          // 그리드 추가
          gridInstance = $("<div style='width:100%;'>")
            .appendTo(gridContainer)
            .dxDataGrid({
              dataSource: popupOptions.gridDataSource, // 초기 데이터
              columns: [
                {
                  dataField: "storeCode",
                  caption: "거래처"
                },
                {
                  dataField: "labelCount",
                  caption: "라벨수량",
                  width: 100
                }
              ],
              headerFilter: {
                visible: true // 헤더 필터 드롭다운을 표시
              },
              allowColumnResizing: true, // 컬럼 사이즈 조절 여부
              showBorders: true,
              columnAutoWidth: true,
              height: 300,
              selection: {
                mode: "single"
              },
              onRowClick: function (e) {
                console.log("Row clicked:", e.data); // 클릭한 행의 데이터
                maxCnt = e.data.labelCount;
                inputBoxCount.option("value", e.data.labelCount);
              }
            })
            .dxDataGrid("instance");

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

          // 입력란 추가 ()
          inputBoxCount = $("<div>")
            .css({
              marginLeft: "auto",
              marginRight: "15px",
              "max-width": "60px"
            })
            .appendTo(buttonContainer)
            .dxTextBox({
              placeholder: "수량",
              onInput: function (e) {
                const inputElement = e.event.target;
                let valPre = inputElement.value.replace(/\D/g, "");

                if (Number(valPre) > Number(maxCnt)) {
                  valPre = maxCnt;
                }

                inputElement.value = valPre;
                console.log("입력 중 값:", inputElement.value);
              },
              onValueChanged: function (e) {
                console.log("최종 입력된 값:", e.value);
              }
              // onValueChanged: function (e) {
              //   // const value = e.value.replace(/\D/g, ""); // 숫자만 남김
              //   // //alert(value);
              //   // e.component.option("value", value); // 유효한 값만 설정
              //   popupOptions.countText = e.value; // 입력된 검색어 저장
              // }
            })
            .dxTextBox("instance");

          // 실행 버튼 추가
          $("<div>")
            .appendTo(buttonContainer)
            .dxButton({
              text: "출력",
              type: "default",
              onClick: function () {
                const formData = {searchText: popupOptions.searchText}; // 필요한 데이터를 전달
                popupOptions.onExecute(
                  gridInstance.getSelectedRowsData(),
                  Number(inputBoxCount.option("value"))
                ); // 외부에서 전달된 실행 로직 호출
              }
            });
        }
      })
      .dxPopup("show");
  }
};

export default lktUtil;
