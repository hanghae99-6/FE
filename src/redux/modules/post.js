import Cookies from "universal-cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import jwt_decode from "jwt-decode";

// const SAVE_POST = "SAVE_POST";
const ADD_EVIDENCE = "ADD_EVIDENCE"; // 단일 근거 저장(Redux Only)
const GET_EVIDENCE ="GET_EVIDENCE";// 근거들 목록 불러옴
const DELETE_EVIDENCE="DELETE_EVIDENCE";
const SAVE_POST="SAVE_POST";
const LOAD_POST="LOAD_POST";
// const createPost = createAction(CREATE_POST, (postdata) => ({postdata}));
const addEvidence= createAction(ADD_EVIDENCE,(evidence)=>({evidence}));
const getEvidence= createAction(GET_EVIDENCE,()=>({}));
const deleteEvidence=createAction(DELETE_EVIDENCE,(evidenceIndex)=>({evidenceIndex}));
const savePost=createAction(SAVE_POST,(post)=>({post}));
const loadPost=createAction(LOAD_POST,(postlist)=>({postlist}));

const roomApi = axios.create({
  // baseURL:"https://spring-prc.site:443",
  baseURL: "https://api.wepeech.com:8443/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

const initialState = {
    post:[],
    evidence:[],
    DebateCnt:"",
    };

    const savePostDB = (opinion,evidences,roomId) => {
        const cookies = new Cookies(); 
        const token = cookies.get("token");
        const userInfo= jwt_decode(document.cookie)?jwt_decode(document.cookie):null; 
        const userEmail = userInfo.EMAIL;
        // console.log(userInfo);
        // console.log(opinion,evidences,roomId)
        return function (dispatch, getState, { history }) {
          const state = getState();
            roomApi
            .post(`/debate/${roomId}`,{
                "opinion":opinion,
                "evidences":evidences,
              },{headers: { "Authorization": token },})
            .then(
              (res) =>{
                console.log(res);
                if(res.data.status==true){
                    history.replace(`/userprofile/${userEmail}`)
                    dispatch(getEvidence(evidence))
                }else if(res.data.msg=="unMatch"){
                    window.alert("찬/반을 잘못 선택하셨습니다!")
                }else{
                    window.alert("토론 내용 저장에 실패했습니다");
                    history.replace("/")
                }

              }
            )
            .catch((error) => {
                console.log(error);
            });
        };
      };

      const loadPostDB = () => {
        const cookies = new Cookies(); 
        const token = cookies.get("token");
        const userInfo= jwt_decode(document.cookie)?jwt_decode(document.cookie):null; 
        const userEmail = userInfo.EMAIL;
        // console.log(userInfo);
        return function (dispatch, getState, { history }) {
          const state = getState();
            axios
            .get(`https://api.wepeech.com:8443/user/profile/mydebate`,{headers: { "Authorization": token },})
            .then(
              (res) =>{
                  const postData=res.data;
                  dispatch(loadPost(postData));              
              }
            )
            .catch((error) => {
                console.log(error);
            });
        };
      };

      const loadReplyDB = () => {
        const cookies = new Cookies(); 
        const token = cookies.get("token");
        const userInfo= jwt_decode(document.cookie)?jwt_decode(document.cookie):null; 
        const userEmail = userInfo.EMAIL;
        // console.log(userInfo);
        return function (dispatch, getState, { history }) {
          const state = getState();
            axios
            .get(`https://api.wepeech.com:8443/user/profile/myreply`,{headers: { "Authorization": token },})
            .then(
              (res) =>{
                  console.log(res);
                  return;
                if(res.data==true){
                    history.replace(`/userprofile/${userEmail}`)
                }else{
                    window.alert("토론 내용 저장에 실패했습니다");
                    history.replace("/")
                }

              }
            )
            .catch((error) => {
                console.log(error);
            });
        };
      };

      

    




    export default handleActions(
        {
        [ADD_EVIDENCE]: (state, action) =>
            produce(state, (draft) => {
            const evidence=action.payload.evidence;
            draft.evidence.push(evidence);
            }),
        [GET_EVIDENCE]: (state, action) =>
            produce(state, (draft) => {
            draft.evidence=action.payload.evidence;
            }),
        [DELETE_EVIDENCE]:(state, action)=>
            produce(state, (draft) => {
            const deleteIndex=action.payload.evidenceIndex;
            // console.log(deleteIndex);
            draft.evidence.splice(deleteIndex,1);
            // console.log(draft.evidence);
            }),
        [LOAD_POST]: (state, action) =>
            produce(state, (draft) => {
            draft.DebateCnt=action.payload.postlist.length;
            }),
            
        },
        initialState
      );
      const ActionCreators = {
          addEvidence,
          getEvidence,
          deleteEvidence,
          savePostDB,
          loadPostDB,
          loadReplyDB,
      };
    
      export { ActionCreators };