import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../Shared/api";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";


const POST_PROSCONS = "POST_PROSCONS";
const GET_PROSCONS = "GET_PROSCONS";

const setProsCons = createAction(POST_PROSCONS, (totalProsCons) => ({ totalProsCons }));
const getProsCons = createAction(GET_PROSCONS, (totalProsCons) => ({ totalProsCons }));

const initialState = {
  TotalProsCons: [],
};

const postProsCons = (id,side) => {
    return function (dispatch, getState, { history }) {
      api.post('/main/debate/vote',{debateId : id, side: side })
      .then((res) => {
        const prosConsInfo=res.data.side.typeNum;
            dispatch(setProsCons(prosConsInfo))
        // window.alert("소중한 한표 감사합니다.")
      })
      .catch((err) => {
        console.log(err.response);
      })
  }
};

const getProsConsDB = (debateId) => {
  const cookies = new Cookies(); 
  // const token = cookies.get("token");
  // const userInfo= jwt_decode(document.cookie)?jwt_decode(document.cookie):null; 
  return function (dispatch, getState, { history }) {
    const state = getState();
      axios
      .get(`https://api.wepeech.com:8443/main/detail/${debateId}`)
      .then(
        (res) =>{
            const prosConsInfo=res.data.side.typeNum;
            dispatch(getProsCons(prosConsInfo))
        }
      )
      .catch((error) => {
          console.log(error);
      });
  };
};

export default handleActions(
  {
    [POST_PROSCONS]: (state, action) =>
      produce(state, (draft) => {
        draft.TotalProsCons= action.payload.totalProsCons;
      }),
    [GET_PROSCONS]: (state, action) =>
      produce(state, (draft) => {
        draft.TotalProsCons= action.payload.totalProsCons;
      }),
    [GET_PROSCONS]: (state, action) =>
      produce(state, (draft) => {
        draft.TotalProsCons= action.payload.totalProsCons;
      }),
  },
  initialState
);

const ActionCreators = {
  postProsCons,
  getProsConsDB
};


export { ActionCreators };