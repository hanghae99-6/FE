import React, { useEffect, useState, useRef, useTransition } from "react";
import styled from "styled-components";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { IconButtons,Grid,Image } from "../../Elements";
import { useInterval } from "../../redux/modules/useInterval";
import { useSelector, useDispatch} from "react-redux";
import { SettingsRemoteRounded } from "@material-ui/icons";
import { Icon } from "@mui/material";

// let stompClient;

const ChatingPage = (props) => {
  const [endtime,setEndTime] =useState(0)
  const end = new Date(endtime);
  const [isStarted,setIsStarted]=useState(false);
  var NOW_DATE = new Date(); 
  const UTC = NOW_DATE.getTime() + (NOW_DATE.getTimezoneOffset() * 60 * 1000); 
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const init = new Date(UTC+KR_TIME_DIFF);
  var diff = Math.abs(end.getTime() - init.getTime());
  const [time, setTime] = useState((diff) /60>=0?(diff)/60:0); // 남은 시간
    // useInterval(() => setTime((end - init) / 1000), time);
  const minutes = Math.floor(time / 60); // 분
  const seconds = Math.floor(time % 60); // 초
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [enterMsg, setEnterMsg] = useState(null);
  const [content, setContent] = useState("");
  const roomData=useSelector((state)=>state?.room?.roomdata?state.room.roomdata:null)
  const roomId=location.pathname.split("/debate/")[1];
  const cookies = new Cookies(); 
  const token = cookies.get("token");
  const userInfo= jwt_decode(document.cookie);
  const nickname = userInfo.NICK_NAME;
  const userId = nickname;
  const latestChatWrapRef = useRef();
    const devTarget = "https://api.wepeech.com:8443/wss-stomp";
    let sock = new SockJS(devTarget);
    let ws = Stomp.over(sock);
    ws.debug= true;

  let reconnect = 0;

  const connect = (roomId) => {
    ws.connect({ "Authorization": token },
    (frame) => {ws.subscribe("/sub/chat/room/" + roomId,
    (message) => {
          const res = JSON.parse(message.body);
        // if(res.type=="START"){
        //   console.log(res)
        //   getDebateInfo(roomId);
        // }else{
        //   const roomId =res.roomId;
          // getDebateInfo(roomId);
          getMessageList(roomId);
          setLoaded(true);
          setEnterMsg(res);
          resMessage(res);
        // }
           
          
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
  

  const sendMessage = () => {
    ws.send("/pub/chat/message",{ "Authorization": token }, JSON.stringify({ type: "TALK", roomId: roomId, sender: userId, message: content, createdAt: "" }));
    setContent("");
  };

  // 메세지 받기
  const resMessage = (message) => {
    setMessages([...messages, message]);
  };

  // const startDebate = () => {
  //   console.log("토론 시작")
  //   ws.send("/pub/timer",{ "Authorization": token }, JSON.stringify({ type: "TIMER", roomId: roomId, sender: userId, message: content, createdAt: "" }));
  //   setContent("");
  // };

  // 저장된 메시지 출력
  const getMessageList = (roomId) => {
    axios
      .get(`https://api.wepeech.com:8443/chat/message/${roomId}`,
      {headers: { "Authorization": token }})
      .then((res) => {
        setMessages(res.data);
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

 
  useEffect(() => {
    if (messages.length > 0) latestChatWrapRef.current.scrollIntoView({ block: "end" });
  }, [messages]);


  useEffect(() => {
    if (messages.length > 0){
      // latestChatWrapRef.current.
      latestChatWrapRef.current.scrollIntoView({ block: "end" });
    } 
    console.log("메세지임", messages)
  }, [messages]);


  if (!userId) return <>로그인이 필요합니다.</>;

return (
  <>  
  <ChatDisplay>
      <ChatHeader>
        <ChatText>실시간채팅</ChatText>
        {/* <UserTotal>32명</UserTotal> */}
      </ChatHeader>
      <ChatContents>
        {messages.map((item, index) => {
          return (
            <ChatWrap key={index} ref={index === messages.length - 1 ? latestChatWrapRef : null} align={item?.sender === userId ? "flex-end" : "flex-start"} >
                <ChatInfo direction={item?.sender===userId?"row":"row-reverse"}>
                  <ChatUser>{item?.sender?item.sender:null}</ChatUser>
                  <ImageBox src={item?.userImage?item.userImage:null} display={item?.sender=="\uD83D\uDC51 PEECH KING \uD83D\uDC51"? "none":"block"}/>
                </ChatInfo>
              <MsgWrap bg={item?.sender === userId ? "#E5E8EF" : "white"} radius={item?.sender === userId ? "16px 0px 16px 16px" : "0px 16px 16px 16px"}>
                <ChatMsg >{item?.message?item.message:null}</ChatMsg>
              </MsgWrap>
              <CreaatedAtText>{item?.createdAt?.split(" ")[1]?item?.createdAt?.split(" ")[1]:null}</CreaatedAtText>
            </ChatWrap>
          );
        })}
       
      </ChatContents>
      <ChatInputMenu>
        <ChatInput type="text" placeholder="채팅을 입력해주세요" value={content} onChange={handleChange} onKeyUp={handleKeyUp} />
        <SendBtn onClick={sendMessage}>
          <Grid margin="-3px 3px 3px 5px">
           <IconButtons Airplane size="16"/>
          </Grid>
        </SendBtn>
      </ChatInputMenu>
    </ChatDisplay>
  
  </>
    
  );
};


const ImageBox=styled.img`
width:20px;
height:20px;
border-radius:50%;
display:${(props) => props.display};
`

const Timer =styled.div`
width: 87px;
height: 30px;
background: #F5F6F8;
border-radius: 6px;
display:flex;
align-items:center;
padding:5px 10px;
box-sizing:border-box;
`
const Minutes = styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
letter-spacing: -0.03em;
color: #191919;
width: 40px;
display: flex;
justify-content: flex-end;
`

const Seconds = styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
letter-spacing: -0.03em;
color: #191919;
width: 40px;
display: flex; 
justify-content: flex-start;
`
const ChatInfo=styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction: ${(props) => props.direction};
margin-bottom:5px;
`
const ChatDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 318px;
  width: 15%;
  height: 624px;
  background:#F5F6F8;
  border-radius: 16px;
  margin-top:40px;
  overflow:scroll;


`;
const ChatHeader = styled.div`
  width:100%;
  height: 50px;
  line-height:50px;
  padding: 13px 24px 0px 24px;
  box-sizing:border-box;
  border-bottom: 1px solid lightgrey;
  display:flex;
  align-items:center;
  justify-content: space-between;
`;
const ChatText = styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
letter-spacing: -0.03em;
color: #191919;
`;
const UserTotal = styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 22px;
letter-spacing: -0.03em;
color: #505050;
`
const CreaatedAtText=styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
letter-spacing: -0.03em;
color: #767676;
`
const ChatContents = styled.div`
  width: 100%;
  height: 100%;
  font-size: 15px;
  overflow-y: scroll;
  padding: 20px 5px;
`;
const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
  margin: 10px 0;
  padding: 0 10px;
`;
const ChatUser = styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
letter-spacing: -0.03em;
color: #191919;
margin:0px 5px;
`;
const MsgWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${(props) => props.bg};
  align-items: ${(props) => props.align};
  padding:8px 10px;
  box-sizing:border-box;
  width: max-content;
  max-width:80%;
  text-align: center;
  border-radius:${(props) => props.radius};
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
  position:relative;
  // background-color: white;
  // border-top: 1px solid lightgrey;
  // border-radius: 0 0 28px 28px;
`;
const ChatInput = styled.input`
  margin:0 auto;
  margin-bottom:16px;
  width: 90%;
  height: 48px;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.01);
  border-radius: 24px;
  padding:20px 50px 20px 20px;
  border:none;
  outline: none;
`;

const SendBtn =styled.div`
  width: 28px;  
  height: 28px;
  background: #FF5912;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  transform:rotate(45deg);
  position:absolute;
  right:30px;
  bottom:25px;

`
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