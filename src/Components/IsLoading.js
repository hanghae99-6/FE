import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { useDispatch,useSelector } from 'react-redux';
import { ActionCreators as RoomActions} from "../redux/modules/room";

const EnterRoom=(props)=> {
    const dispatch=useDispatch();
    const is_room=useSelector((state)=>state.room.is_room);

    const location=useLocation();
    const roomId=location.pathname.split("/debate/")[1];
    const [username,setUsername]=useState("");
    const EnterRoom =()=>{
        dispatch(RoomActions.enterRoomDB(roomId,username))
    }
    if(document.cookie){
    const userInfo= jwt_decode(document.cookie);
    const userEmail = userInfo.EMAIL;
    }

  return (
    <>
        <ModalBg/>
        <Wrapper>
        <TitleText>닉네임을 입력해주세요(로그인 연결시킬예정)</TitleText>
        <input value={userEmail}/>
            <FullInput onChange={(e) => {setUsername(e.target.value)}} ></FullInput>
        <TitleText>방번호를 입력해주세요</TitleText>
        <input value={roomId}/>
        <div>스피너 혹은 디자인된 이미지가 들어갈 예정입니다</div>
        <CreateRoomBtn onClick={EnterRoom}>입장하기</CreateRoomBtn>
        </Wrapper>
        
    </>
  )
}



const ModalBg=styled.div`
width:100%;
height:100%;
background:rgba(0,0,0,0.6);
position:fixed;
z-index:13;
display:flex;
flex-direction:colunm;
justify-content:center;
align-items:center;
`
const Wrapper=styled.div`
width:400px;
height:400px;
background:white;
z-index:15;
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
border-radius:30px;
padding:20px;
box-sizing:border-box;
`
const FullInput=styled.input`
width:100%;
padding:10px;
background: #ECECEC;
border:none;
border-radius:10px;
box-sizing:border-box;
`
const TitleText=styled.p`
font-size:14px;
font-weight:600;
color: grey;
margin:0;
padding:0;
margin:5px 0px;
cursor:pointer;
`

const CreateRoomBtn=styled.div`
width:150px;
padding:10px;
background:lightgrey;
border-radius:10px;
text-align:center;
cursor:pointer;
&:hover {
    background:black;
    color: white;
}
`

export default EnterRoom;