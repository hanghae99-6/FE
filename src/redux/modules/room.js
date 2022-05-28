import Cookies from "universal-cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { IoMdReturnRight } from "react-icons/io";
// import { roomApi } from "../../Shared/axios";


// import { apis } from "../../shared/api";

const roomApi = axios.create({
  // baseURL:"https://spring-prc.site:443",
  baseURL: "https://api.wepeech.com:8443/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

const CREATE_ROOM = "CREATE_ROOM";
const GET_ROOM = "GET_ROOM";
const ROOM_CHECK ="ROOM_CHECK";
const LEAVE_ROOM="LEAVE_ROOM";
const PROSUSER_CHECK="PROSUSER_CHECK";
const CONSUSER_CHECK="CONSUSER_CHECK";


const createRoom = createAction(CREATE_ROOM, (room) => ({ room }));
const getRoom = createAction(GET_ROOM, (room_data) => ({room_data}));
const roomCheck =createAction(ROOM_CHECK,(roomData)=>({roomData}));
const leaveRoom =createAction(LEAVE_ROOM,(debateData)=>({debateData}));
const prosUserCheck=createAction(PROSUSER_CHECK,(userchecked)=>({userchecked}));
const consUserCheck=createAction(CONSUSER_CHECK,(userchecked)=>({userchecked}));


const initialState = {
  roomdata:[],
  is_room:false,
  is_user:false,
  debateData:{},
  prosUserChecked:false,
  consUserChecked:false,
  };

 
  const prosUserCheckDB = (userEmail) => {
    const cookies = new Cookies(); 
    const token = cookies.get("token");
    return function (dispatch, getState, { history }) {
      const state = getState();
        roomApi
        .post(`/debate/emailCheck/pros?email=${userEmail}`,{headers: { "Authorization": token },})
        .then(
          (res) =>{
            console.log(res);
            const userChecked=res.data.status
            dispatch(prosUserCheck(userChecked))

          }
        )
        .catch((error) => {
            console.log(error);
        });
    };
  };

  const consUserCheckDB = (userEmail) => {
    const cookies = new Cookies(); 
    const token = cookies.get("token");
    return function (dispatch, getState, { history }) {
      const state = getState();
        roomApi
        .post(`/debate/emailCheck/cons?email=${userEmail}`,{headers: { "Authorization": token },})
        .then(
          (res) =>{
            console.log(res);
            const userChecked=res.data.status
            dispatch(consUserCheck(userChecked))
          }
        )
        .catch((error) => {
            console.log(error);
        });
    };
  };



  const createRoomDB = (topic,categoryName,prosName,consName,content) => {
    const cookies = new Cookies(); 
    const token = cookies.get("token");
    return function (dispatch, getState, { history }) {
      const state = getState();
        roomApi
        .post("/debate/link",{
            "topic":topic,
            "categoryName":categoryName,
            "prosName":prosName ,
            "consName":consName,
            "content":content
          },{headers: { "Authorization": token },})
        .then(
          (res) =>{
            console.log(res)
            const roomId=res.data.roomId;
            history.push(`userCheck/${roomId}`)
          }
        )
        .catch((error) => {
            console.log(error);
        });
    };
  };

  const roomCheckDB = (sessionId) => {
    const cookies = new Cookies(); 
    const token = cookies.get("token");
    return function (dispatch, getState, { history }) {
      const state = getState();
        roomApi
        .get(`/api/rooms/${sessionId}`,
          {headers: { "Authorization": token }}
        )
        .then(
          (res) =>{
          console.log(res) 
          const roomData=res.data
          const is_user=res.data.user
          dispatch(getRoom(roomData));
          if(is_user==true){
            history.replace(`/debate/${sessionId}`)
          }else{
            window.alert("이메일주소가 일치하지 않습니다")
          }
          } 
        )
        .catch((error) => {
            console.log(error);
            window.alert("유효하지 않은 입장입니다")
            history.replace("/");
        });
    };
  };

  // const getRoomDB = (roomId) => {
  //   const cookies = new Cookies(); 
  //   const token = cookies.get("token");
  //   return function (dispatch, getState, { history }) {
  //     const state = getState();
  //       roomApi
  //       .get(`/debate/${roomId}`,
  //         {headers: { "Authorization": token }}
  //       )
  //       .then(
  //         (res) =>{
  //           console.log(res);
  //          const roomData=res.data
  //          dispatch(getRoom(roomData));
  //         }
  //       )
  //       .catch((error) => {
  //           console.log(error);
  //       });
  //   };
  // };

  const leaveRoomDB = (roomId,RoomToken) =>{
    console.log(roomId,RoomToken);
    const cookies = new Cookies(); 
    const token = cookies.get("token");
    return function (dispatch, getState, { history }) {
      const state = getState();
        roomApi
        .put("/api/rooms",{
          "roomId":roomId,
          "token":RoomToken,
        },{headers: { "Authorization": token },})
        .then(
          (res) =>{
          const debateData=res.data
          dispatch(leaveRoom(debateData))
          history.replace(`/saveDebate/${roomId}`)
          } 
        )
        .catch((error) => {
            console.log(error);
        });
    };
  }
  

  export default handleActions(
    {
      [CREATE_ROOM]: (state, action) =>
        produce(state, (draft) => {
        }),
      [GET_ROOM]: (state, action) =>
        produce(state, (draft) => {
          draft.roomdata=action.payload.room_data;
        }),
      [ROOM_CHECK]: (state, action) =>
        produce(state, (draft) => {
        draft.is_room=action.payload.is_room;
        draft.is_user=action.payload.is_user;
        }),
        [LEAVE_ROOM]: (state, action) =>
        produce(state, (draft) => {
      draft.debateData=action.payload.debateData

        }),

        [PROSUSER_CHECK]: (state, action) =>
        produce(state, (draft) => {
        draft.prosUserChecked=action.payload.userchecked

        }),

        [CONSUSER_CHECK]: (state, action) =>
        produce(state, (draft) => {
          draft.consUserChecked=action.payload.userchecked

        }),
 

 
    },
    initialState
  );
  const ActionCreators = {
    createRoomDB,
    // getRoomDB,
    roomCheckDB,
    leaveRoomDB,
    prosUserCheckDB,
    consUserCheckDB,
  };

  export { ActionCreators };