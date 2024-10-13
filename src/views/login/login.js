$(document).ready(function () {
  // Dark theme 여부 설정 (기본 설정)
  const darkTheme = true;

  // 유저명 입력 필드
  $("#usernameField").dxTextBox({
    placeholder: "Username",
    showClearButton: true,
    valueChangeEvent: "keyup",
    onValueChanged: function (e) {
      const value = e.value;
      console.log("Username: " + value);
    }
  });

  // 비밀번호 입력 필드
  $("#passwordField").dxTextBox({
    placeholder: "Password",
    mode: "password",
    showClearButton: true,
    onValueChanged: function (e) {
      const value = e.value;
      console.log("Password: " + value);
    }
  });

  // 로그인 버튼
  $("#loginButton").dxButton({
    text: "Sign In",
    type: "success",
    width: "100%",
    onClick: function () {
      const username = $("#usernameField")
        .dxTextBox("instance")
        .option("value");
      const password = $("#passwordField")
        .dxTextBox("instance")
        .option("value");

      // 로그인 로직 (여기에 AJAX 요청을 추가할 수 있음)
      if (username && password) {
        console.log("Logging in with Username:", username);
        console.log("Logging in with Password:", password);
        // 로그인 API 호출 부분
        $.ajax({
          url: "/api/login",
          method: "POST",
          data: {
            username: username,
            password: password
          },
          success: function (response) {
            alert("Login successful");
            // 로그인 성공 시 처리 로직 추가
          },
          error: function () {
            alert("Login failed");
          }
        });
      } else {
        alert("Please enter both username and password");
      }
    }
  });
});
