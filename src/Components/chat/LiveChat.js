import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import Cookies from "universal-cookie";

// let stompClient;

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
    const devTarget = "https://api.wepeech.com:8443/wss-stomp";
    let sock = new SockJS(devTarget);
    let ws = Stomp.over(sock);
    ws.debug= true;

  let reconnect = 0;

  // 소켓 연결
  // 
  const connect = (roomId) => {
    ws.connect({ "Authorization": token },
    (frame) => {ws.subscribe("/sub/chat/room/" + roomId,
    (message) => {
          const res = JSON.parse(message.body);
          const roomId = res.roomId;
          const nickName = res.nickName;
          //채팅 내역 불러오기
          getMessageList(roomId);
          if (res.type === "ENTER") {
            setLoaded(true);
            setEnterMsg(res);
          } else if (res.type === "TALK"){
            // 소켓 연결 후 받은 채팅 출력
            resMessage(res);
          }
            console.log("소켓연결 성공");
          },
        { "Authorization": token }
      );
      ws.send("/pub/chat/message",
        { "Authorization": token },
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
    ws.send("/pub/chat/message",{ "Authorization": token }, JSON.stringify({ type: "TALK", roomId: roomId, sender: userId, message: content, createdAt: "" }));
    setContent("");
  };

  // 메세지 받기
  const resMessage = (message) => {
    setMessages([...messages, message]);
  };

  // 저장된 메시지 출력
  const getMessageList = (roomId) => {
    axios
      .get(`https://api.wepeech.com:8443/chat/message/${roomId}`,
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
    connect();
    return () => {
      ws.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    connect(roomId);
    return () => {};
  }, [roomId]);

  useEffect(() => {
    console.log(enterMsg?.message || "");
  }, [enterMsg]);

//   마지막 채팅 block end 로 계속 보냄. message 올 때 마다
  useEffect(() => {
    if (messages.length > 0){
      // latestChatWrapRef.current.
      latestChatWrapRef.current.scrollIntoView({ block: "end" });
    } 
    console.log("메세지임", messages)
  }, [messages]);

  const sender="jjj123"
//   if (!userId) return <>로그인이 필요합니다.</>;

return (
    <ChatDisplay>
      <ChatHeader>
        <ChatText>관전 중</ChatText>
        <UserTotal>32명</UserTotal>
      </ChatHeader>
      <ChatContents>
        {messages.map((item, index) => {
          return (
            <ChatWrap key={index} ref={index === messages.length - 1 ? latestChatWrapRef : null} align={item.sender === userId ? "flex-end" : "flex-start"} >
                <ChatUser>{item.sender}</ChatUser>
              <MsgWrap bg={item.sender === userId ? "yellow" : "white"}>
                <ChatMsg >{item.message}</ChatMsg>
              </MsgWrap>
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
  min-width: 382px;
  width: 15%;
  height: 800px;
  margin: 300px auto 0;
  /* background-color:lightblue; */
  border: 1px solid lightgrey;
  border-radius: 30px;
`;
const ChatHeader = styled.div`
  width: 100%;
  height: 60px;
  line-height:50px;
  padding: 8px;
  border-bottom: 1px solid lightgrey;
  /* background-color:red; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
const ChatText = styled.p`
  height: 30px;
  display: block;
  font-size: 20px;
  font-weight: 700;
  margin-right: 10px;
`;
const UserTotal = styled.p`
  height: 30px;
  display: block;
  font-size: 15px;
  font-weight: 500;
  margin-right: 10px;
`

const ChatContents = styled.div`
  width: 100%;
  height: 100%;
  font-size: 15px;
  overflow: auto;
  padding: 20px 5px;
  background-color:green;
`;
const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
  margin: 10px 0;
  padding: 0 10px;
`;
const ChatUser = styled.div`
  font-size: 15px;
  font-weight: 700;
`;
const MsgWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${(props) => props.bg};
  align-items: ${(props) => props.align};
  border: 1px solid lightgrey;
  width: max-content;
  max-width:80%;
  text-align: center;
  border-radius: 5px;
`
const ChatMsg = styled.div`
  width: 100%;
  color: black;
  text-align: center;
  box-sizing:border-box;
  margin: 5px 20px 5px 0;
`;
const ChatInputMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top:10px;
  width: 100%;
  height: 80px;
  background-color: white;
  border-top: 1px solid lightgrey;
  border-radius: 0 0 28px 28px;
`;
const ChatInput = styled.input`
  width: 80%;
  padding: 5px 0 5px 10px;
  outline: none;
  background-color: transparent;
  border: 0;
  margin: 0;
`;
const ChatBtn = styled.button`
  /* padding: ; */
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: 15%;
  height: 60%;
  font-weight: 700;
  background-color:#FFA180;
  /* outline: 1px solid black; */
  border-radius: 15px;
  margin: 0 8px 0 0;
  :hover{
    background-color:#FF5912;
  }
`;

export default ChatingPage;
