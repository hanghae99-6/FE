import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useInterval } from "../redux/modules/useInterval";
import jwt_decode from "jwt-decode";
import styled from "styled-components";
import {Grid} from "../Elements/index";


// import useUpdateEffect from "../store/hooks/useUpdateEffect";

function SSE(props) {
  const isRoomKing=props.isRoomKing;
  const location=useLocation();
  const roomId=location.pathname.split("/debate/")[1];
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [isStarted,setIsStarted]=useState(null);
  const [debateEndTime,setDebateEndTime]=useState(null);
  const [meventSource, msetEventSource] = useState(undefined);
  const end = new Date(debateEndTime);
  var NOW_DATE = new Date(); 
  const UTC = NOW_DATE.getTime() + (NOW_DATE.getTimezoneOffset() * 60 * 1000); 
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const init = new Date(UTC+KR_TIME_DIFF);
  var diff = Math.abs(end.getTime() - init.getTime());
  const [time, setTime] = useState((diff) /60); // 남은 시간
    useInterval(() => setTime((end - init) / 1000), time);
  const minutes = Math.floor(time / 60)>=0?Math.floor(time/60):0// 분
  const seconds = Math.floor(time % 60)>=0?Math.floor(time%60):0; // 초

  let eventSource = undefined;

  useEffect(() => {
    if (!listening) {
      const cookies = new Cookies(); 
      const token = cookies.get("token");
      const userInfo= jwt_decode(document.cookie);
      eventSource = new EventSource(`https://api.wepeech.com:8443/subscribe/${roomId}`); //구독
      msetEventSource(eventSource);
      console.log("eventSource", eventSource);

      eventSource.onopen = event => {
          console.log("연결완료");
      };
      eventSource.onmessage = event => {
         console.log("onmessage");
        console.log(event.data);
        
        const getRealtimeData=JSON.parse(event.data);
       
          setDebateEndTime(getRealtimeData.debateEndTime);
          setIsStarted(getRealtimeData.isStarted);
      };
        eventSource.onerror = event => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("eventsource closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };
      setListening(true);
    }
    return () => {
      eventSource.close();
      console.log("eventsource closed");
    };
  }, []);
  useEffect(() => {
    console.log("data: ", data);
  }, [data]);
  const checkData = () => {
    console.log(data);
  };
  const startDebate = () => {
    const cookies = new Cookies(); 
    const token = cookies.get("token");
    axios
      .get(`https://api.wepeech.com:8443/timer/${roomId}`,
      {headers: { "Authorization": token }})
      .then((res) => {
        console.log(res);
        setDebateEndTime(res.data.debateEndTime);
        setIsStarted(res.data.isStarted)
      })
      .catch((err) => console.log(err));
  };
  return (
<>
{!isStarted&&isRoomKing&&<StartBtn onClick={startDebate}>토론 시작하기</StartBtn>}
          <Grid display="flex">
             {isStarted? <StartedState>토론중</StartedState>:<UnStartedState>대기중</UnStartedState>}
            <TimerBox>
            <Minutes>{isStarted?`${minutes}`:0}:</Minutes><Seconds>{isStarted?`${seconds}`:0}</Seconds>
              </TimerBox>
          </Grid>
</>
  );
}


const StartedState=styled.div`
text-align:center;
width: 61px;
height: 30px;
background: #FF5912;
border-radius: 6px;font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
letter-spacing: -0.03em;
color: #FFFFFF;
line-height:30px;
margin-right:10px;
`

const UnStartedState=styled.div`
text-align:center;
width: 61px;
height: 30px;
background: #F5F6F8;
border-radius: 6px;font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
letter-spacing: -0.03em;
color: black;
line-height:30px;
margin-right:10px;
`
const StartBtn=styled.button`
padding: 6px 20px;
gap: 10px;
width: 128px;
height: 37px;
border: 1px solid #C4C4C4;
border-radius: 24px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
letter-spacing: -0.03em;
color: #191919;
position:absolute;
background:white;
top:61px;
right:450px;
cursur:pointer;
&:hover{
  background:#FF5912;
  color:white;
  border:none;
}
`


const TimerBox =styled.div`
width: 87px;
height: 30px;
background: #F5F6F8;
border-radius: 6px;
display:flex;
align-items:center;
justify-content:center;
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
`;

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
`;




export default SSE;