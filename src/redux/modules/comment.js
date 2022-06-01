import Cookies from "universal-cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { RiCoinsLine } from "react-icons/ri";
import { api } from "../../Shared/api";

const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENT = "GET_COMMENT"; 
const GET_MYCOMMENT ="GET_MYCOMMENT";
const POST_LIKEHATE = "POST_LIKEHATE";
const DELETE_COMMENT = "DELETE_COMMENT";
const FIX_COMMENT = "FIX_COMMENT";

const addComment = createAction(ADD_COMMENT,(reply)=>({reply}));
const getComment = createAction(GET_COMMENT,(replylist)=>({replylist}));
const getMyComment =createAction(GET_MYCOMMENT,(replyCnt)=>({replyCnt}));
const postLikeHate = createAction(POST_LIKEHATE,(likehates)=> ({ likehates }));
const delComment = createAction(DELETE_COMMENT,(deletecomment)=> ({ deletecomment }));
const fixComment = createAction(FIX_COMMENT,(fixcomment)=> ({ fixcomment }));


const initialState = {
  myReplyCnt:"",
  commentList:[],
  Likehates : {},
  deletecomment: {},
};

    const addCommentDB = (debateId,reply,prosCons) => {
      const cookies = new Cookies(); 
      const token = cookies.get("token")?cookies.get("token"):null;
        return function (dispatch, getState, { history }) {
          if(token===null){
            window.alert("로그인이 필요한 서비스입니다");
            history.replace("/login");
            return;
          }
          const state = getState();
            axios
            .post(`https://api.wepeech.com:8443/main/${debateId}/reply`,{
                "reply":reply,
                "side":prosCons,
              },{headers: { "Authorization": token },})
            .then(
              (res) =>{
              const CommentList=res.data;
              dispatch(getComment(CommentList));
              }
            )
            .catch((error) => {
                console.log(error);
            });
        };
      };

      const getCommentDB = (debateId) => {
        const cookies = new Cookies();
        const token = cookies.get("token");
        return function (dispatch, getState, { history }) {
          const state = getState();
            axios
            .get(`https://api.wepeech.com:8443/main/${debateId}/reply`, {headers: { "Authorization": token }})
            .then(
              (res) =>{
                    const commentList=res.data;
                    dispatch(getComment(commentList));
              })
            .catch((error) => {
                console.log(error);
            });}
      }; 
      
      const getMyCommentDB = () => {
        const cookies = new Cookies(); 
        const token = cookies.get("token");
        return function (dispatch, getState, { history }) {
          const state = getState();
            axios
            .get(`https://api.wepeech.com:8443/user/profile/myreply`,{headers: { "Authorization": token }})
            .then(
              (res) =>{
                const myReplyCnt=res.data.length;
                dispatch(getMyComment(myReplyCnt));
              }
            )
            .catch((error) => {
                console.log(error);
            });
        };
      };  

      const fixComments = (newComment,id,prosOrCons) => {
        const cookies = new Cookies(); 
        const token = cookies.get("token");
        return function (dispatch, getState, { history }) {
          const state = getState();
            axios
            .put(`https://api.wepeech.com:8443/main/reply/${id}`,{reply:newComment,side:prosOrCons},{headers: { "Authorization": token }})
            .then(
              (res) =>{
                const fixedComment = res.data;
                console.log("aaaaaaaaaaaaaa",fixedComment);
                dispatch(fixComment(fixedComment));
              }
            )
            .catch((error) => {
                console.log(error);
            });
        };
      };

      const deleteComment = (replyId) => {
        const cookies = new Cookies(); 
        const token = cookies.get("token");
        return function (dispatch, getState, { history }) {
          const state = getState();
            axios
            .delete(`https://api.wepeech.com:8443/main/reply/${replyId}`,{headers: { "Authorization": token }})
            .then(
              (res) =>{
                const deletedList = res.data;
                dispatch(delComment(deletedList))

                window.alert("삭제 되었습니다");
                  // console.log(res);
              }
            )
            .catch((error) => {
                console.log(error);
            });
        };
      };
      
      const postLikeHates = (id,status) => {
        return function (dispatch, getState, { history }) {
          const state = getState();
          axios
          .post(`https://api.wepeech.com:8443/main/reply/likes`,{replyId:id,status:status})
            .then((res) =>{
              const commentList=res.data;
              dispatch(getComment(commentList));
          })
            .catch((err) => {
              console.log(err);
          });
        };
      };



    export default handleActions(
        {
            [ADD_COMMENT]: (state, action) =>
            produce(state, (draft) => {
            draft.commentList= action.payload.reply
            }),
            [GET_COMMENT]: (state, action) =>
            produce(state, (draft) => {
            draft.commentList= action.payload.replylist;
            }),
            [GET_MYCOMMENT]: (state, action) =>
            produce(state, (draft) => {
            draft.myReplyCnt=action.payload.replyCnt;
            }),
            [POST_LIKEHATE]: (state, action) =>
            produce(state, (draft) => {
             const commentList= action.payload.likehates;
             draft.commentList=commentList;
            }), 
            [FIX_COMMENT]: (state, action) =>
            produce(state, (draft) => {
              draft.commentList= action.payload.fixcomment;
            }),
            [DELETE_COMMENT]: (state, action) =>
            produce(state, (draft) => {
            draft.commentList= action.payload.deletecomment;
            }), 
        },
        initialState
      );
      const ActionCreators = {
        addCommentDB,
        getCommentDB, 
        getMyCommentDB,
        postLikeHates,
        deleteComment,
        fixComments,
      };
    
      export { ActionCreators };