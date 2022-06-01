import Cookies from "universal-cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import jwt_decode from "jwt-decode";


const GET_DETAIL = "GET_DETAIL"; 

const getDetail= createAction(GET_DETAIL,(detail)=>({detail}));

const initialState = {
    detailInfo:[],
    };

      const GetDetailDB = (debateId) => {
        return function (dispatch, getState, { history }) {
          const state = getState();
            axios
            .get(`https://api.wepeech.com:8443/main/detail/${debateId}`)
            .then(
              (res) =>{
                  const debateInfo=res.data;
                  dispatch(getDetail(debateInfo));
              }
            )
            .catch((error) => {
                console.log(error);
            });
        };
      };

    export default handleActions(
        {
        [GET_DETAIL]: (state, action) =>
            produce(state, (draft) => {
            draft.detailInfo=action.payload.detail
            }),        
        },
        initialState
      );
      const ActionCreators = {
        GetDetailDB,
      };
    
      export { ActionCreators };
