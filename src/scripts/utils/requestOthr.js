import axios from "axios";
//임시 import {message} from "@/utils/message";
import store from "@/store";
import {getToken} from "@/utils/auth";
import define from "@/utils/define";
import context from "@/main";
const i18n = require("@/lang").default;

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API + ":" + process.env.VUE_APP_OTHR_PORT, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: define.timeout // request timeout
});

function setMessage(e) {
  const message = {
    type: "error",
    title: i18n.global.t("common.error"),
    message: e || i18n.global.t("common.searchFailedDetail")
  };
  return message;
}

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (config.url.indexOf("http") > -1) config.baseURL = "";
    // 부분 인터페이스 timeout 시간 별도 처리
    // if (
    //   config.url.indexOf("SynThirdInfo") > -1 ||
    //   config.url.indexOf("extend/Email/Receive") > -1 ||
    //   config.url.indexOf("Permission/Authority/Data") > -1 ||
    //   config.url.indexOf("DataSync/Actions/Execute") > -1
    // ) {
    //   config.timeout = 100000;
    // }
    // do something before request is sent
    config.headers["common-origin"] = "pc";
    if (store.getters.token) {
      config.headers["Authorization"] = getToken();
    }

    if (store.getters.language) {
      config.headers["language-code"] = store.getters.language;
    } else {
      config.headers["language-code"] = "kor";
    }

    if (config.method == "get") {
      config.params = config.data;
    }
    let timestamp = Date.parse(new Date()) / 1000;
    if (config.url.indexOf("?") > -1) {
      config.url += `&n=${timestamp}`;
    } else {
      config.url += `?n=${timestamp}`;
    }
    return config;
  },
  (error) => {
    // do something with request error
    if (process.env.NODE_ENV === "development") {
      console.log(error); // for debug
    }
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    try {
      const res = response.data;
      let config = response.config;
      let url = config.url;

      // 특수 인터페이스 처리
      // if (
      //   url.indexOf("/Base/DataSource/Actions/Test") > -1 ||
      //   (url.indexOf("Model") > -1 && url.indexOf("Config") > -1) ||
      //   url.indexOf("downloadExcel") > -1
      // )
      //   return response;

      if (response.status !== 200) {
        // console.log({
        //   message: res.lktHeader.message || "request 에러가 발생했습니다. 다시 시도하십시오.", // i18n.t("validate.requestErrorTryOne"),
        //   type: "error",
        //   duration: 1500,
        //   onClose: () => {
        //     if (
        //       url.indexOf("/api/oauth/Login") < 0 &&
        //       url.indexOf("/api/oauth/LockScreen") < 0 &&
        //       (res.lktHeader.status === 600 || res.lktHeader.status === 601 || res.lktHeader.status === 602)
        //     ) {
        //       // 600：로그인이 만료되었습니다. 601: 다른 곳에서 로그인했습니다. 강제로 로그아웃되었습니다. 602: Token 인증에 실패했습니다.
        //       store.dispatch("user/resetToken").then(() => {
        //         if (window.location.pathname.indexOf("login") > -1) return;
        //         // setTimeout(() => { location.reload() }, 100);
        //         context.$router.push(`/login`);
        //       });
        //     }
        //   }
        // });

        const message = setMessage(
          res.lktHeader && res.lktHeader.message
            ? res.lktHeader.message
            : i18n.global.t("common.searchFailedDetail")
        );

        // if (url.indexOf("/api/oauth/Login") > -1) return Promise.reject(response);
        return Promise.reject({message: message});
      } else {
        if (!Object.keys(res).length) {
          // 리턴 데이터 빈 Object 객체 여부 확인 후 리턴결과 반영
          return Promise.reject({message: setMessage()});
        } else if (res.lktHeader.status !== "01") {
          const message = setMessage(res.lktHeader.message);
          return Promise.reject({message: message});
        } else {
          // 정상 처리
          return res;
        }
      }
    } catch (e) {
      return Promise.reject({message: setMessage(e)});
    }
  },
  (error) => {
    if (process.env.NODE_ENV === "development") {
      console.log(error); // for debug
    }

    let getMessage = "";
    try {
      getMessage = error.response.data.lktHeader.message;
    } catch (e) {}

    const message = setMessage(getMessage);

    return Promise.reject({...error, ...{message: message}});
  }
);

export default service;
