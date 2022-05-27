import React,{useEffect,setState } from 'react';
import { useTimer } from 'react-timer-hook';
import styled from "styled-components";

function MyTimer({ expiryTimestamp,is_started}) {
  const {
    seconds,
    minutes,
    hours,
    start,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called'), autoStart:false });

  useEffect(()=>{

  },[]);

  useEffect(()=>{
    if(is_started==true){
      start();
    };
  });

  return (
    <TimerWrapper>
      <TimerBox>
          <span>{minutes}:{seconds}</span>
      </TimerBox>
    </TimerWrapper>
  );
}

export default function App(props) {
  const is_started=props.started;
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} is_started={is_started}/>
    </div>
  );
}

const StartBtn=styled.div`
width:150px;
height:40px;
background:lightgrey;
border-radius:30px;
padding:10px 0px;
box-sizing:border-box;
text-align:center;
font-size:16px;
line-height:16px;
cursor:pointer;
`
const TimerWrapper=styled.div`
width:850px;
// background:yellow;
display:flex;
justify-content:space-between;
align-items:center;
`
const TimerBox =styled.div`
text-align:center;
width:100px;
height:30px;
background:#F5F6F8;
font-size:16px;
border-radius:5px;
`