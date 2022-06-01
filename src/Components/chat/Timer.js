// import React, { useEffect, useState, useRef, useTransition } from "react";
// import styled from "styled-components";
// import Stomp from "stompjs";
// import SockJS from "sockjs-client";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import jwt_decode from "jwt-decode";
// import { IconButtons,Grid,Image } from "../../Elements";
// import { useInterval } from "../../redux/modules/useInterval";
// import { useSelector, useDispatch} from "react-redux";
// import { SettingsRemoteRounded } from "@material-ui/icons";
// import { Icon } from "@mui/material";
// import { ImGift } from "react-icons/im";

// // let stompClient;

// const Timer = (props) => {
  // const [loaded, setLoaded] = useState(false);
  // const [messages, setMessages] = useState([]);
  // const [enterMsg, setEnterMsg] = useState(null);
  // const [content, setContent] = useState("");
  // const [endtime,setEndTime] =useState(null)
  // const [isStarted,setIsStarted]=useState(false);

  // const end = new Date(endtime);
  // var NOW_DATE = new Date(); 
  // const UTC = NOW_DATE.getTime() + (NOW_DATE.getTimezoneOffset() * 60 * 1000); 
  // const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  // const init = new Date(UTC+KR_TIME_DIFF);
  // var diff = Math.abs(end.getTime() - init.getTime());
  // const [time, setTime] = useState((diff) /60); // 남은 시간
  //   useInterval(() => setTime((end - init) / 1000), time);
  // const minutes = Math.floor(time / 60); // 분
  // const seconds = Math.floor(time % 60); // 초
  // const roomData=useSelector((state)=>state?.room?.roomdata?state.room.roomdata:null)
  // const roomId=location.pathname.split("/debate/")[1];
  // const cookies = new Cookies(); 
  // const token = cookies.get("token");
  // const userInfo= jwt_decode(document.cookie);
  // const nickname = userInfo.NICK_NAME;
  // const userId = nickname;
  // const latestChatWrapRef = useRef();
  //   const devTarget = "https://api.wepeech.com:8443/wss-stomp";
  //   let sock = new SockJS(devTarget);
  //   let ws = Stomp.over(sock);
  //   ws.debug= true;

//   let reconnect = 0;

//   const connect = (roomId) => {
//     ws.connect({ "Authorization": token },
//     (frame) => {ws.subscribe("/sub/chat/room/" + roomId,
//     (message) => {
//           const res = JSON.parse(message.body);
//           console.log(res);
//           if(res.type!="START"){
//             getDebateInfo(roomId);
//           }else{
//             setEndTime(res.debateEndTime)
//             setIsStarted(true);
//           }
//             console.log(endtime,"endtime")
     
         
//           },
//         { "Authorization": token }
//       );
//       ws.send("/pub/timer",
//         { "Authorization": token },
//         JSON.stringify({ type: "ENTER", roomId: roomId, sender: userId, message: "구독!", createdAt: "" })
//       );
//     },
//       (error) => {
//         if (reconnect++ < 5) {
//           setTimeout(function () {
//             console.log("connection reconnect");
//             sock = new SockJS(devTarget);
//             ws = Stomp.over(sock);
//             connect();
//           }, 10 * 1000);
//         }
//       }
//     );
//   };
  
  
//   const startDebate = () => {
//     console.log("토론 시작")
//     ws.send("/pub/timer",{ "Authorization": token }, JSON.stringify({ type: "TIMER", roomId: roomId, sender: userId, message: content, createdAt: "" }));
//     setContent("");
//   };
//   // 메세지 받기
//   const resMessage = (message) => {
//     setMessages([...messages, message]);
//   };

//   // 저장된 메시지 출력
//   const getDebateInfo = (roomId) => {
//     console.log(roomId);
//     axios
//       .get(`https://api.wepeech.com:8443/timer/${roomId}`,
//       {headers: { "Authorization": token }})
//       .then((res) => {
//         console.log(res);
//         setEndTime(res.debateEndTime);
//         setIsStarted(true);
//         console.log(endtime,"endtime")
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleChange = (e) => {
//     setContent(e.target.value);
//   };

//   const handleKeyUp = (e) => {
//     // 엔터 키코드 13
//     if (e.keyCode === 13) {
//       sendMessage();
//     }
//   };

//   useEffect(() => {
//     connect();
//     return () => {
//       ws.disconnect();
//     };
//   }, [roomId]);

//   useEffect(() => {
//     connect(roomId);
//     return () => {};
//   }, [roomId]);

//   useEffect(() => {
//     console.log(enterMsg?.message || "");
//   }, [enterMsg]);

 
//   useEffect(() => {
//     if (messages.length > 0) latestChatWrapRef.current.scrollIntoView({ block: "end" });
//   }, [messages]);


//   useEffect(() => {
//     if (messages.length > 0){
//       // latestChatWrapRef.current.
//       latestChatWrapRef.current.scrollIntoView({ block: "end" });
//     } 
//     console.log("메세지임", messages)
//   }, [messages]);

 

//   if (!userId) return <>로그인이 필요합니다.</>;

// return (
//   <>
//   {roomData.roomKing==true&&!isStarted&& <StartBtn onClick={startDebate}>토론방시작하기</StartBtn>}
//   {isStarted? <StartedState>토론중</StartedState>:<UnStartedState>대기중</UnStartedState>}
//   <TimerBox>
//   <IconButtons clock color="grey" size="15"/>
//   <Minutes>{Number(minutes)>=0?minutes:0}:</Minutes>
//   <Seconds>{Number(seconds)>=0?seconds:0}</Seconds>
//   </TimerBox>
//   </>
    
//   );
// };
// const StartedState=styled.div`
// text-align:center;
// width: 61px;
// height: 30px;
// background: #FF5912;
// border-radius: 6px;font-family: 'Roboto';
// font-style: normal;
// font-weight: 400;
// font-size: 12px;
// line-height: 18px;
// letter-spacing: -0.03em;
// color: #FFFFFF;
// line-height:30px;
// margin-right:10px;
// `

// const UnStartedState=styled.div`
// text-align:center;
// width: 61px;
// height: 30px;
// background: #F5F6F8;
// border-radius: 6px;font-family: 'Roboto';
// font-style: normal;
// font-weight: 400;
// font-size: 12px;
// line-height: 18px;
// letter-spacing: -0.03em;
// color: black;
// line-height:30px;
// margin-right:10px;
// `

// const StartBtn=styled.div`

// max-width:120px;
// min-width: 119px;
// height: 40px;
// background: #FF5912;
// border-radius: 24px;
// font-family: 'Roboto';
// font-style: normal;
// font-weight: 400;
// font-size: 14px;
// line-height: 24px;
// letter-spacing: -0.03em;
// color: #FFFFFF;
// border:none;
// cursor:pointer;
// margin:10px;
// line-height:40px;
// text-align:center;
// position:absolute;
// top:50px;
// right:440px;
// `
// const TimerBox =styled.div`
// width: 87px;
// height: 30px;
// background: #F5F6F8;
// border-radius: 6px;
// display:flex;
// align-items:center;
// padding:5px 10px;
// box-sizing:border-box;
// `
// const Minutes = styled.div`
// font-family: 'Roboto';
// font-style: normal;
// font-weight: 400;
// font-size: 12px;
// line-height: 18px;
// letter-spacing: -0.03em;
// color: #191919;
// width: 40px;
// display: flex;
// justify-content: flex-end;
// `;

// const Seconds = styled.div`
// font-family: 'Roboto';
// font-style: normal;
// font-weight: 400;
// font-size: 12px;
// line-height: 18px;
// letter-spacing: -0.03em;
// color: #191919;
// width: 40px;
// display: flex; 
//   justify-content: flex-start;
// `;

// export default Timer;
