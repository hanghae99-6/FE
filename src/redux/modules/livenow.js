import Cookies from "universal-cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import room from "./room";



const roomApi = axios.create({
    // baseURL:"https://spring-prc.site:443",
    baseURL: "https://api.wepeech.com:8443",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      accept: "application/json",
    },
  });
// const SAVE_POST = "SAVE_POST";
const GET_LIVEROOM = "GET_LIVEROOM";

// const createPost = createAction(CREATE_POST, (postdata) => ({postdata}));
const getLiveRoom= createAction(GET_LIVEROOM,(liverooms)=>({liverooms}));

const initialState = {
liverooms:[]
    };

    const getLiveRoomtDB = () => {
        const cookies = new Cookies(); 
        const token = cookies.get("token");
        const userInfo= jwt_decode(document.cookie)?jwt_decode(document.cookie):null; 
        const userEmail = userInfo.EMAIL;
        return function (dispatch, getState, { history }) {
          const state = getState();
            roomApi
            .get("/live")
            .then(
              (res) =>{
                const liverooms=res.data;
                dispatch(getLiveRoom(liverooms))
              }
            )
            .catch((error) => {
                console.log(error);
            });
        };
      };

      export default handleActions(
        {
          [GET_LIVEROOM]: (state, action) =>
            produce(state, (draft) => {
                draft.liverooms.push(action.payload.liverooms)
            }),
        },
        initialState
      );
      const ActionCreators = {
        getLiveRoomtDB
      };
      export { ActionCreators };