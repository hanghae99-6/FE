import Cookies from "universal-cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../Shared/api";
import axios from 'axios';



const setCookie = (name, value, exp = 3) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()} ;path=/`;
};


const CHANGE_NICKNAME = "CHANGE_NICKNAME";
const DELETE_POSTLIST = "DELETE_POSTLIST";

const changeNickname = createAction(CHANGE_NICKNAME, (changedNickname) => ({ changedNickname }));
const deletePostList = createAction(DELETE_POSTLIST, (deletePostList) =>({ deletePostList }));

const initialState = {
  nickname:"",
  delDebateId:""
  };

  const changeNicknameDB = (nickName) => {
    const cookies = new Cookies(); 
    const token = cookies.get("token");
    return function (dispatch, getState, { history }) {
      const state = getState();
        axios
        .put("https://api.wepeech.com:8443/user/profile/nick-name",{
            "nickName":nickName,
          },{headers: { "Authorization": token },})
        .then(
          (res) =>{
          setCookie("token", res.headers.authorization);
         window.location.reload();
          }
        )
        .catch((error) => {
            console.log(error);
        });
    };
  };

  const deleteList = (debateId) => {
    const cookies = new Cookies(); 
    const token = cookies.get("token");
    return function (dispatch, getState, { history }) {
      api.delete(`/user/profile/mydebate/${debateId}`,{headers: { "Authorization": token }})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        // window.alert("mainInfo 가져오기 실패.");
      })
  }
};
 


 
  
  export default handleActions(
    {
      [CHANGE_NICKNAME]: (state, action) =>
        produce(state, (draft) => {
          draft.nickname=action.payload.changedNickname;
        }),
      [DELETE_POSTLIST]: (state, action) =>
        produce(state, (draft) => {
          window.alert("삭제 되었습니다.")
        }),
    },
    initialState
  );
  const ActionCreators = {
    changeNicknameDB,
    deleteList
  };

  export { ActionCreators };