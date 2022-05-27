import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../Shared/api";

const SET_NAVERINFO = "SET_NAVERINFO";
const SET_DEBATEINFO = "SET_DEBATEINFO";
const SET_CHEILINFO = "SET_CHEILINFO";

const setNaverInfo = createAction(SET_NAVERINFO, (naverInfo) => ({ naverInfo }));
const setDebateInfo = createAction(SET_DEBATEINFO, (debateInfo) => ({ debateInfo }));
const setCheilInfo = createAction(SET_CHEILINFO, (cheilInfo) => ({ cheilInfo }));


const initialState = {
  NaverInfo:{},
  DebateInfo: {},
  CheilInfo:{},
  };


const getNaverDB = () => {
    return function (dispatch, getState, { history }) {
      api.get('/main/crawling/naverNews')
      .then((res) => {
        const NaverInfo=res.data.crawling;
        dispatch(setNaverInfo(NaverInfo));
      })
      .catch((err) => {
        console.log(err.response);
      })
    }
  };
  const getDebateDB = () => {
    return function (dispatch, getState, { history }) {
      api.get('/main/crawling/debateColumn')
      .then((res) => {
        const DebateInfo = res.data.crawling;
        dispatch(setDebateInfo(DebateInfo));
      })
      .catch((err) => {
        console.log(err.response);
      })
    }
  };
  const getCheilDB = () => {
    return function (dispatch, getState, { history }) {
      api.get('/main/crawling/cheilMagazine')
      .then((res) => {
        const CheilInfo = res.data.crawling;
        dispatch(setCheilInfo(CheilInfo));
      })
      .catch((err) => {
        console.log(err.response);
      })
  }
};


export default handleActions(
  {
    [SET_NAVERINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.NaverInfo =action.payload.naverInfo;
      }),
    [SET_DEBATEINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.DebateInfo= action.payload.debateInfo;
      }),
    [SET_CHEILINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.CheilInfo= action.payload.cheilInfo;
      }),
  },
  initialState
);

const ActionCreators = {
  getNaverDB,
  getDebateDB,
  getCheilDB,
};



export { ActionCreators };