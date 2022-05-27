import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../Shared/api";

const SET_MAININFO = "SET_MAININFO";
const GET_CATNAME = "GET_CATNAME";
const GET_ONECLICKINFO ="GET_ONECLICKINFO";
const PUT_ONECLICKINFO = "PUT_ONECLICKINFO";

const setMainInfo = createAction(SET_MAININFO, (mainInfo) => ({ mainInfo }));
const getCatName = createAction(GET_CATNAME, (catName) => ({ catName }));
const getOneClickInfo = createAction(GET_ONECLICKINFO, (oneClickInfo) => ({ oneClickInfo }));
const putOneClickInfo = createAction(PUT_ONECLICKINFO, (putClickInfo) => ({ putClickInfo }));

const initialState = {
  MainInfo: [],
  NewCatName: [],
  OneClickInfo: [],
  PutClickInfo: [],
};

const getMainInfoDB = () => {
    return function (dispatch, getState, { history }) {
      api.get('/main/')
      .then((res) => {
        const MainInfo = res.data;
        dispatch(setMainInfo(MainInfo));
      })
      .catch((err) => {
        // window.alert("mainInfo 가져오기 실패.");
      })
  }
};

const getOneClick = () => {
  return function (dispatch, getState, { history }) {
    api.get('/main/one-click')
    .then((res)=> {
      const OneClickInfo = res.data;
      dispatch(getOneClickInfo(OneClickInfo));
    })
    .catch((err) => {
      // console.log("getOneClick err", err);
    })
  }
};

const putOneClick = (id,side) => {
  return function (dispatch, getState, { history }) {
    api.put('/main/one-click',{oneClickId: id, side: side})
    .then((res)=> {
      const PutClickInfo = res.data;
      dispatch(putOneClickInfo(PutClickInfo));
    })
    .catch((err) => {
      // window.alert("putclickget실패")
    })
  }
};

const changeCatName = (catName) => {
  return function (dispatch, getState, { history }) {
    api.get(`/main/category/${catName}`)
    .then((res) => {
      const hotpeechList=res.data;
      dispatch(setMainInfo(hotpeechList));
    })
    .catch((err) => {
      // window.alert("newcatname 가져오기 실패.");
    })
}
};

export default handleActions(
  {
    [SET_MAININFO]: (state, action) =>
      produce(state, (draft) => {
        draft.MainInfo= action.payload.mainInfo;
      }),
    [GET_CATNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.NewCatName= action.payload.catName;
    }),
    [GET_ONECLICKINFO]: (state, action) =>
      produce(state, (draft) => {
      draft.OneClickInfo= action.payload.oneClickInfo;
    }),
    [PUT_ONECLICKINFO]: (state, action) =>
      produce(state, (draft) => {
      draft.OneClickInfo= action.payload.putClickInfo;
    }),
  },
  initialState
);

const actionCreators = {
  getMainInfoDB,
  changeCatName,
  getOneClick,
  putOneClick,
};


export { actionCreators };