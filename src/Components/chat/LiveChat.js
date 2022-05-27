// import React, { useRef } from 'react'
// import { useSelector, useDispatch} from "react-redux";
// import styled from "styled-components";
// import SockJsClient from 'react-stomp';
// import Cookies from "universal-cookie";
// import jwt_decode from "jwt-decode";


// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs';


// // styled-components, import, export, retrun은 생략
// // 채팅 방 컴포넌트
// const LiveChat = (props) => {
//     // 소켓 통신 객체
//     const sock = new SockJS('https://api.wepeech.com:8443/ws-stomp');
//     const ws = Stomp.over(sock);
   
//     // 방 제목 가져오기
//     // const { roomName, category } = useSelector((state) => state.chat.currentChat);
//     // const roomId = useSelector((state) => state.chat.currentChat.roomId);
   
//     // 토큰
//     const dispatch = useDispatch();
    
//     const cookies = new Cookies(); 
//     const token = cookies.get("token");
   
//     // 보낼 메시지 텍스트
//     // const messageText = useSelector((state) => state.chat.messageText);
//     // sender 정보 가져오기
//     // let sender = useSelector((state) => state.user.userInfo?.username);
//     // if (!sender) {
//     //   sender = getCookie('username');
//     // }
   
//     // 렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
//     React.useEffect(() => {
//       wsConnectSubscribe();
//       return () => {
//         wsDisConnectUnsubscribe();
//       };
//     }, []);
   
//     // 웹소켓 연결, 구독
//     function wsConnectSubscribe() {
//       try {ws.connect({headers: { "Authorization": token }}, () =>{
//             ws.subscribe(`https://api.wepeech.com:8443/sub/chat/room/`,
//               (data) =>
//                 // const newMessage = JSON.parse(data.body);
//                 // dispatch(chatActions.getMessages(newMessage));},
//                 { token: token });
//           });
//       } catch (error) {
//         console.log(error);
//       }
//     };
   
//     // // 연결해제, 구독해제
//     function wsDisConnectUnsubscribe() {
//       try {ws.disconnect(() => {
//             ws.unsubscribe('https://api.wepeech.com:8443/sub');
//           }, { token: token });
//       } catch (error) {
//         console.log(error);
//       }
//     }
   
//     // 웹소켓이 연결될 때 까지 실행하는 함수
//     function waitForConnection(ws, callback) {
//       setTimeout(
//         function () {
//           // 연결되었을 때 콜백함수 실행
//           // 0 -> 커넥팅(소켓 생성, 연결은 안됨)
//           // 1 -> 오픈(열려있고 통신 준비됨)
//           if (ws.ws.readyState === 1) {
//             callback();
//             // 연결이 안 되었으면 재호출
//           } else {
//             waitForConnection(ws, callback);
//           }
//         },
//         1 // 밀리초 간격으로 실행
//       );
//     }
   
//     // // 메시지 보내기
//     // function sendMessage() {
//     //   try {
//     //     // token이 없으면 로그인 페이지로 이동
//     //     if (!token) {
//     //       alert('로그인이 필요합니다.');
//     //       history.replace('/login');
//     //     }
//     //     // send할 데이터
//     //     const data = {
//     //       type: 'TALK',
//     //       roomId: roomId,
//     //       sender: sender,
//     //       message: messageText,
//     //     };
//     //     // 빈문자열이면 리턴
//     //     if (messageText === '') {
//     //       return;
//     //     }
//     //     // 로딩 중
//     //     dispatch(chatActions.isLoading());
//     //     waitForConnection(ws, function () {
//     //       ws.send('/pub/api/chat/message',
//     //         { token: token },
//     //         JSON.stringify(data)
//     //       );
//     //       dispatch(chatActions.writeMessage(''));
//     //     });
//     //   } catch (error) {
//     //     console.log(error);

//     //   }
//     // }




// // const liveChat = () => {
// //     // let socketJs = new SockJS("https://api.wepeech.com:8443");
// //     // let stompcli = Stomp.over(socketJs);

// //     // stompcli.send(`/pub/chat/chatting`, {}, JSON.stringify(msg))
// //     // stompcli.connect({},() => {
// //     //     stompcli.subscribe(`/sub/chatting/room/"roomid"`), (data) => {

// //     //     }
// //     // })
// //     // -------------------------------ver 1.

// //     // const $websocket = useRef(null); 
// //     // let topics = ['/topic/'+userId];
// //     // -------------------------------ver 2.

// //     // const $websocket = useRef (null);

// //     const handleMsg = msg => {
// //         console.log (msg);
// //     };

// //     // const handleClickSendTo = () => {
// //     //     $websocket.current.sendMessage ('/sendTo');
// //     // };

// //     // const handleClickSendTemplate = () => {
// //     //     $websocket.current.sendMessage ('/Template');
// //     // };
// //     // -------------------------------------------------ver3.


//     return(

//         // <ChatWrap>
//         //     <SockJsClient
//         //       url= 'https://api.wepeech.com:8443/ws'
//         //       topics={topics}
//         //       onMessage={msg => console.log(msg)}
//         //       ref={$websocket}
//         //     />
//         //     <ChatBoard></ChatBoard>
//         //     <SendWrap>
//         //         <ChatInput placeholder="메세지를 입력해주세요"></ChatInput>
//         //         <ChatBtn>전송</ChatBtn>
//         //     </SendWrap>
//         // </ChatWrap>
//         // ------------------------------------------------------------------ver2
//         <ChatWrap>

//         {/* <SockJsClient
//         url= 'https://api.wepeech.com:8443/ws'
//           topics={['/topics/sendTo', '/topics/template', '/topics/api']}
//           onMessage={msg => {
//             console.log (msg);
//           }}
//           ref={$websocket}
//         /> */}
//         {/* <button onClick={handleClickSendTo}>SendTo</button>
//         <button onClick={handleClickSendTemplate}>SendTemplate</button> */}
//         <button >SendTo</button>
//         <button >SendTemplate</button>
  
//       </ChatWrap>
//         // -------------------------------------------------------------------ver3
//     )
//     }


// export default LiveChat;


// const ChatWrap = styled.div`
//     width:300px;
//     margin: 300px auto 0;
// `

// const SendWrap = styled.div`
//     width: 300px;
//     display: flex;
//     flex-direction: row;
//     margin: 0 auto;

// `
// const ChatBoard = styled.div`
//     width: 300px;
//     height: 500px;
//     border: 1px solid black;
// `
// const ChatInput = styled.input`
//     width: 200px;
//     height: 40px;
// `
// const ChatBtn = styled.button`
//     width: 70px;
//     margin-left: 10px;
//     height: 40px;
// `

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
// 소켓 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";

import axios from "axios";
import SelectInput from "@mui/material/Select/SelectInput";

import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

    

//현재 백엔드분들이 만드신 서버내의 roomId 주소
let stompClient;

const ChatingPage = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [enterMsg, setEnterMsg] = useState(null);
  const [content, setContent] = useState("");
  const [roomId, setRoomId] = useState("faaa902e-f2d4-4221-a0ca-e413025f8834");

  const userId = "jjj123";
  const cookies = new Cookies(); 
  const token = cookies.get("token");

  const latestChatWrapRef = useRef();
    // https://api.wepeech.com:8443/sub/chat/room/
  // 소켓 연결에 필요한 변수
  // console.log(userId); const devTarget = "http://localhost:8080/ws-stomp";
    const devTarget = "https://api.wepeech.com:8443/wss-stomp";
    let sock = new SockJS(devTarget);
    let ws = Stomp.over(sock);


  let reconnect = 0;

  // 소켓 연결
  // 
  const connect = (roomId) => {
    ws.connect(
      {headers: { "Authorization": token }},
      (frame) => {
        ws.subscribe("/sub/chat/room/" + roomId, (message) => {
            console.log(message,"sdafasdfasdfasdf");
            const recv = JSON.parse(message.body);
            //채팅 내역 불러오기
            getMessageList(recv);
            if (recv.type === "ENTER") {
            setLoaded(true);
            setEnterMsg(recv);
            } else if (recv.type === "TALK") {
            // 소켓 연결 후 받은 채팅 출력
            recvMessage(recv);
            }
            console.log("소켓연결 성공");
          }
        );
    ws.send(
        "/pub/chat/message",
        {headers: { "Authorization": token }},
        JSON.stringify({ type: "ENTER", roomId: roomId, sender: userId, message: "구독!", createdAt: "" })
    );
      },
      (error) => {
        //   에러시 재연결 5초
        if (reconnect++ < 5) {
          setTimeout(function () {
            console.log("connection reconnect");
            sock = new SockJS(devTarget);
            ws = Stomp.over(sock);
            connect();
          }, 10 * 1000);
        }
      }
    );
  };
  // 채팅방 입장시 사용하는 코드들

  // 메세지 보내기(stringfy해서 보낸 후 쓴 메세지 초기화)
  const sendMessage = () => {
    ws.send("/pub/chat/message", {headers: { "Authorization": token }}, JSON.stringify({ type: "TALK", roomId: roomId, sender: userId, message: content, createdAt: "" }));
    setContent("");
  };

  // 메세지 받기
  const recvMessage = (message) => {
    setMessages([...messages, message]);
  };

  // 저장된 메시지 출력
  const getMessageList = () => {
    axios
      .get(`/chat/message/${roomId}`,
      {headers: { "Authorization": token }})
      .then((res) => {
        setMessages(res.data);
        // dispatch(__loadTeamList(res.data));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleKeyUp = (e) => {
    // 엔터 키코드 13
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  useEffect(() => {
    connect(roomId);
    return () => {};
  }, [roomId]);

  useEffect(() => {
    console.log(enterMsg?.message || "");
  }, [enterMsg]);

//   마지막 채팅 block end 로 계속 보냄. message 올 때 마다
  useEffect(() => {
    if (messages.length > 0) latestChatWrapRef.current.scrollIntoView({ block: "end" });
    console.log("메세지임", messages)
  }, [messages]);

  const sender="jjj123"
//   if (!userId) return <>로그인이 필요합니다.</>;

return (
    <ChatDisplay>
      <ChatRoom>
        <ChatRoomId>채팅방 이름</ChatRoomId>
      </ChatRoom>
      <ChatContents>
        {/* {loaded ? ( */}
        {messages.map((item, index) => {
          return (
            <ChatWrap key={index} ref={index === messages.length - 1 ? latestChatWrapRef : null} align={item.sender === userId ? "end" : "start"}>
              <ChatUser>{item.sender}</ChatUser>
              <ChatMsg>{item.message}</ChatMsg>
            </ChatWrap>
          );
        })}
      </ChatContents>
      <ChatInputMenu>
        <ChatInput type="text" placeholder="채팅을 입력해주세요" value={content} onChange={handleChange} onKeyUp={handleKeyUp} />
        <ChatBtn disabled={!content} onClick={sendMessage}>
          전송
        </ChatBtn>
      </ChatInputMenu>
    </ChatDisplay>
  );
};

const ChatDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 500px;
  margin: 300px auto 0;
  background-color:lightblue;
`;
const ChatRoom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
`;
const ChatRoomId = styled.div`
  margin-left: 10px;
  font-size: 25px;
  font-weight: bold;
`;

const ChatContents = styled.div`
  width: 100%;
  height: 100%;
  font-size: 15px;
  overflow: auto;
`;
const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
  margin: 1rem 0;
`;
const ChatUser = styled.div`
  margin-left: 10px;
  font-weight: 700;
`;
const ChatMsg = styled.div`
  color: black;
  margin-left: 10px;
`;
const ChatInputMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #ebe6e6;
`;
const ChatInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  background-color: transparent;
  border: 0;
`;
const ChatBtn = styled.button`
  padding: 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: max-content;
  outline: none;
`;

export default ChatingPage;
