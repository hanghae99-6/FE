import React,{useEffect} from 'react';
import styled from "styled-components";
import {  useSelector,useDispatch} from "react-redux";
import {  ActionCreators as RoomActions} from "../redux/modules/room";
import { useLocation } from 'react-router-dom';

function DebateContents(props) {
  const location=useLocation();
  const roomId=location.pathname.split("/debate/")[1];
  const dispatch =useDispatch();
  const content =useSelector((state)=>state.room.roomdata.content)
  const speechMinute =useSelector((state)=>state.room.roomdata.speechMinute)
  const speechCnt=useSelector((state)=>state.room.roomdata.speechCnt);
  const totalHour=speechCnt*speechMinute*2;
  useEffect(()=>{
    dispatch(RoomActions.getRoomDB(roomId));
  },[]);
  
  return (
    <Wrapper>
        <Title>토론 내용</Title>
            <div>
                {/* <NotiTitle>
                    <SubText>토론시간</SubText>
                    <Text>{totalHour}분</Text>
                    <SubText>발언시간</SubText>
                    <Text>{speechMinute}분<span style={{color:"#c4c4c4", fontWeight:"400"}}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>{speechCnt}회</Text>
                </NotiTitle>  */}
                <ConText>
               {content}
                </ConText>
            </div>
    </Wrapper>
  )
}

const Wrapper=styled.div`
width:950px;
display:flex;
margin-top:50px;
`
const Title=styled.div`
min-width:150px;
font-weight:700;
font-size:16px;
box-sizing:border-box;
color:#191919;
`
const NoticeContents=styled.div`
width:811px;
background:#F5F6F8;
border-radius:16px;
box-sizing:border-box;
`
const NotiTitle=styled.div`
padding:0px 0px 0px 20px;
margin-top:-10px;
width:100%;
display:flex;
align-items:center;
`
const Text=styled.p`
font-size:16px;
color:#191919;
font-weight:bold;
margin-right:50px;
margin-top:15px;
`
const SubText=styled.div`
color:#191919;
font-size:14px;
margin-right:10px;
`

const ConText =styled.div`
color:#505050;
font-size:14px;
font-weight:400;
`


export default DebateContents