import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
// import


const api = axios.create({
  baseURL: "https://api.wepeech.com:8443",
  // baseURL: "http://localhost:3000/",

  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

// 리프레시 토큰 관련 부분입니다
  const setCookie = (name, value, exp = 3) => {
    let date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()} ;path=/`;
  };

const KAKAO_LOGIN = "KAKAO_LOGIN";
const kakaologin = createAction(KAKAO_LOGIN, (data) => ({data}));


const initialState = {
    KakaoLogin : [],
  };


 const KakaoLogin = (code) => {
        return function (dispatch, getState, { history }) {
      api.get(`/user/kakao/callback?code=${code}`)
        .then((res) => {
          const KakaoLogin=res.headers.authorization;
          setCookie("token", res.headers.authorization);
          dispatch(kakaologin(KakaoLogin));
          })
        .catch((err) => {
          console.log("소셜로그인 에러", err);
          // window.alert("로그인에 실패하였습니다.");
          })
        history.push("/");
      }
  };

// export const NaverLogin = (code) => {
//         return function (dispatch, getState, { history }) {
//       console.log("네이버 코드다",code);
//       api.get(`/api/user/naver/callback?code=${code}`)
//         .then((res) => {
//           setCookie("token", res.headers.authorization);
//           console.log(res.headers.authorization);
//           console.log("헤더",res.headers.authorization);
//           console.log("토큰임",res);
//           window.alert("환상의 네이버로 오쎄요~");
//           })
//         .catch((err) => {
//           console.log("소셜로그인 에러", err);
//           console.log(err.response);
//           window.alert("로그인에 실패하였습니다.");
//           })
//         history.replace("/")
//       }
//   };

// export const GoogleLogin = (code,state) => {
//   console.log("구글 리덕스")
      //   return function (dispatch, getState, { history }) {
      // console.log("네이버 코드다",code);
      // api.get(`/user/kakao/callback?code=${code}&state=${state}`)
      //   .then((res) => {
      //     setCookie("token", res.headers.authorization);
      //     console.log(res.headers.authorization);
      //     console.log("헤더",res.headers.authorization);
      //     console.log("토큰임",res);
      //     window.alert("환상의 나라로 오쎄요~");
      //     })
      //   .catch((err) => {
      //     console.log("소셜로그인 에러", err);
      //     console.log(err.response);
      //     window.alert("로그인에 실패하였습니다.");
      //     })
      //   history.replace("/")
      // }
  // };

  export default handleActions(
    {
      [KAKAO_LOGIN]: (state, action) =>
        produce(state, (draft) => {
          draft.login=action.payload.likehates;
        window.location.reload();
        }),
    },
    initialState
  );


const ActionCreators = {
  KakaoLogin,
  // NaverLogin,
  // GoogleLogin
}

export { ActionCreators };