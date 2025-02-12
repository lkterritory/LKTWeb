(function ($) {
  // 팝업 컴포넌트 정의
  $.fn.commonPopup = function (options) {
    const defaultOptions = {
      title: "팝업 제목",
      content: "팝업 내용",
      width: 500,
      height: 300,
      onClose: null,
      onConfirm: null
    };

    const settings = $.extend({}, defaultOptions, options);

    // 팝업 초기화
    this.dxPopup({
      title: settings.title,
      contentTemplate: function (contentElement) {
        contentElement.append(`<div>${settings.content}</div>`);
      },
      width: settings.width,
      height: settings.height,
      showCloseButton: true,
      onHidden: function () {
        if (typeof settings.onClose === "function") {
          settings.onClose();
        }
      },
      toolbarItems: [
        {
          toolbar: "bottom",
          location: "after",
          widget: "dxButton",
          options: {
            text: "확인",
            onClick: function () {
              if (typeof settings.onConfirm === "function") {
                settings.onConfirm();
              }
              $("#commonPopup").dxPopup("hide");
            }
          }
        },
        {
          toolbar: "bottom",
          location: "after",
          widget: "dxButton",
          options: {
            text: "취소",
            onClick: function () {
              $("#commonPopup").dxPopup("hide");
            }
          }
        }
      ]
    });

    // 팝업 보이기
    this.dxPopup("show");

    return this;
  };
})(jQuery);
