
import React, { useState, useEffect } from "react";
import { Grid,IconButtons} from "../Elements/index";
import { useLocation,useHistory } from "react-router-dom";
import "./DebateRoom.css";
import axios from "axios";
import { useSelector, useDispatch} from "react-redux";
import { OpenVidu } from "openvidu-browser";
import styled from "styled-components";
import $ from 'jquery'; 
import { ActionCreators as RoomActions} from "../redux/modules/room"; 
import DebateNotice from "../Components/DebateNotice";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import LiveChat from "../Components/chat/LiveChat";
import { ActionCreators as roomActions } from "../redux/modules/room";
import { useInterval } from "../redux/modules/useInterval";
import Timer from "../Components/chat/Timer";
import SSE from "../Pages/SSE";


const DebateRoom = () =>{
  const userInfo= jwt_decode(document.cookie);
  const nickname = userInfo?.NICK_NAME;
  const dispatch =useDispatch();
  const history =useHistory();
  const location=useLocation();
  const [user,setUser]=useState("")
  const [pass,setPass]=useState("")
  const [NickName,setNickName]=useState("")
  const [userName,setUserName]=useState("");
  const [sessionName,setSessionName]=useState("");
  const [isSession,setIsSession]=useState(false)
  const [debateState,setDebateState] =useState(false);
  const roomData=useSelector((state)=>state?.room?.roomdata?state.room.roomdata:null)
  const isRoomKing=roomData.roomKing;
  const nickName=roomData?.nickName;
  const [start,setStart]=useState(false);
  const topic=roomData?.topic;
  const content=roomData?.content;
  const prosCons=roomData?.side?.name;
  const isUser=roomData?.user;
  const role=roomData?.role;
  const roomId=location.pathname.split("/debate/")[1];
  console.log(roomId);
  const Roomtoken=roomData?.token;
  console.log(nickName,prosCons,isUser,role,roomId,Roomtoken);
  let [mySession,setMySession]=useState("")
  let [token,setToken]=useState("")

  // window.addEventListener('beforeunload', (event) => {
  //   event.preventDefault();
  //   leaveSession();
  // });
  console.log(start);

  const _backConfirm = async () => {
    if(start){
      console.log("이거 실행")
      leaveSession();
      let event =  history.replace(`/saveDebate/${roomId}`)
      if(event){
          window.history.pushState(null, "", window.location.href);
      }
    }
   
}
const _confirm = (e) => {
    var confirmationMessage = "\o/";
    e.returnValue = confirmationMessage;
    return confirmationMessage;
}
useEffect(()=>{
  window.addEventListener("beforeunload", _confirm);
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = _backConfirm;
},[])

  const onbeforeunload = (event)=> {
  this.leaveSession();
}

  if(isUser==undefined){
    history.push(`/userCheck/${roomId}`)
  }


   function joinSession() {
      setStart(true);
      const OV = new OpenVidu();  
      const session = OV.initSession();
      setMySession(session);
      console.log("session? ", session)
      session.on('streamCreated', (event) => {
        var subscriber = session.subscribe(event.stream, 'video-container');
        subscriber.on('videoElementCreated', (event) => {
          appendUserData(event.element, subscriber.stream.connection);
        });
      });
      session.on('streamDestroyed', (event) => {
        removeUserData(event.stream.connection);
      });
      session.on('exception', (exception) => {
        console.warn(exception);
      });
      session.connect(Roomtoken, { clientData: `${nickName+`(${prosCons})`}` })
        .then(() => {
          if (role=="PUBLISHER") {
            var publisher = OV.initPublisher('video-container', {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true,     // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true,     // Whether you want to start publishing with your video enabled or not
              resolution: '447x624',  // The resolution of your video
              frameRate: 30,         // The frame rate of your video
              insertMode: 'APPEND',   // How the video is inserted in the target element 'video-container'
              mirror: false,
            });
            publisher.on('videoElementCreated', (event) => {
              var userData = {
                nickName: nickName,
                prosCons:prosCons,
              };
             
              appendUserData(event.element, userData);
              $(event.element).prop('muted', true); // Mute local video
            });  
            session.publish(publisher);
  
          } else {
            console.warn('You don\'t have permissions to publish');
          }
        })
        .catch(error => {
          console.warn('There was an error connecting to the session:', error.code, error.message);
        });
    
  
    return false;
  }
  // publisher.publishAudio(audioEnabled);
  function appendUserData(videoElement, connection) {
    var clientData;
    var serverData;
    var nodeId;
    if (connection.nickName) {
      clientData = `${connection.nickName+`(${connection.prosCons})`}`;
      nodeId = 'main-videodata';
    } else {
      clientData = JSON.parse(connection.data.split('%/%')[0]).clientData;
        serverData = JSON.parse(connection.data.split('%/%')[1]).serverData;
        nodeId = connection.connectionId;
    }
    var dataNode = document.createElement('div');
    dataNode.className = "data-node";
    dataNode.id = "data-" + nodeId;
    dataNode.innerHTML = "<p class='nickName'>" + clientData + "</p>";
    videoElement.parentNode.insertBefore(dataNode, videoElement.nextSibling);
    addClickListener(videoElement, clientData, serverData);
  }

  function removeUserData(connection) {
    var userNameRemoved = $("#data-" + connection.connectionId);
    if ($(userNameRemoved).find('p.userName').html() === $('#main-video p.userName').html()) {
      cleanMainVideo(); // The participant focused in the main video has left
    }
    $("#data-" + connection.connectionId).remove();
  }
  function addClickListener(videoElement, clientData, serverData) {
    videoElement.addEventListener('click', function () {
      var mainVideo = $('#main-video video').get(0);
      if (mainVideo.srcObject !== videoElement.srcObject) {
        $('#main-video').fadeOut("fast", () => {
          $('#main-video p.nickName').html(clientData);
          $('#main-video p.userName').html(serverData);
          mainVideo.srcObject = videoElement.srcObject;
          $('#main-video').fadeIn("fast");
        });
      }
    });
  }
  function initMainVideo(videoElement,userData) {
    $('#main-video video').get(0).srcObject = videoElement.srcObject;
    $('#main-video p.nickName').html(userData);
    // $('#main-video p.userName').html(userData.prosCons);
    $('#main-video video').prop('muted', true);
  }

  function cleanMainVideo() {
    $('#main-video video').get(0).srcObject = null;
    $('#main-video p').each(function () {
      $(this).html('');
    });
  }

  function leaveSession() {   
    if(role=='PUBLISHER'){
      dispatch(RoomActions.leaveRoomDB(roomId,Roomtoken))
      mySession.disconnect();
      mySession = null;
      cleanSessionView();
    }else{
      mySession.disconnect();
      mySession = null;
      cleanSessionView();
      window.alert("토론방을 나가셨습니다")
      history.push("/");
    }
  }


    

  function cleanMainVideo() {
    $('#main-video video').get(0).srcObject = null;
    $('#main-video p').each(function () {
      $(this).html('');
    });
  }

  function cleanSessionView() {
    removeAllUserData();
    cleanMainVideo();
    $('#main-video video').css("background", "");
  }
  
  function removeAllUserData() {
    $(".data-node").remove();
  }
  const startDebate =()=>{
    dispatch(RoomActions.starteDebateDB(roomId));
  }

  const goMain =()=>{
    history.push("/");
  }
 

  return(

    <>
    {!start&&
    <>
    <ModalBg/>
    <DetailModal>
      {nickname}님, 토론방에 입장하시겠습니까?
      <Grid position="absolute" top="18px" right="-360px">
        <IconButtons cancle size="14px" color="grey" _onClick={goMain}/>
      </Grid>
      <EnterBtn onClick={joinSession}>토론방 입장하기</EnterBtn>
    </DetailModal>
    </>
    
    }
    {start&&isUser&&
    <Wrapper>
      <div style={{position:"absolute", right:"100px", top:"62px"}}>
      <LiveChat/>
      </div>
      <Grid display="flex">
        <SSE isRoomKing={isRoomKing}/>
      </Grid>
      <Grid display="flex" alignItems="center" justifyContent="space-between" width="920px" margin="10px 0px 0px 0px">
        <TitleText>{topic}</TitleText>
        <StartBtn onClick={leaveSession}>토론방 나가기</StartBtn>
      </Grid>

     <div id="main-video" className="col-md-6">
        <video autoPlay playsInline style={{display:"none"}}>
        </video>
      </div>
  
      
 
        <GreyBox>토론자가 아직 <br/> 입장하지 않았습니다</GreyBox>
          <GreyBox2>토론자가 아직 <br/> 입장하지 않았습니다</GreyBox2>
          <div id="video-container" className="col-md-6">
          </div>
          <Grid margin="50px 0px 0px 0px">
              <DebateNotice/>
          </Grid>
          
        <DebateBottom>
            
            <SectionText>토론내용</SectionText>
            <ContentText>{content}</ContentText>
        </DebateBottom>
    </Wrapper>}
    </>
  )
}




const Wrapper=styled.div`
width:1360px;
margin:0 auto;
margin-top:100px;
position:relative;
`
const TitleText=styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 30px;
letter-spacing: -0.03em;
color: #191919;
max-width:800px;
overflow:hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2; /* 라인수 */
-webkit-box-orient: vertical;
word-wrap:break-word; 
line-height: 1.2em;
height: 3.0em;
`
const ContentText=styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
letter-spacing: -0.03em;
color: #505050;
width:770px;
margin-top:20px;
`

const StartBtn=styled.button`
max-width:120px;
min-width: 119px;
border-radius: 24px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
letter-spacing: -0.03em;
color: #191919;
cursor:pointer;
margin:10px;
width: 119px;
height: 36px;
border: 1px solid #C4C4C4;
border-radius: 24px;
background:white;
position:absolute;
top:30px;
right:440px;
z-index:1;
&:hover{
  background:#FF5912;
  color:white;
  border:none;
}
`

const EnterBtn=styled.button`
max-width:120px;
min-width: 119px;
height: 40px;
background: #FF5912;
border-radius: 24px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
letter-spacing: -0.03em;
color: #FFFFFF;
border:none;
cursor:pointer;
margin:10px;
`
const VideoSection=styled.div`
width:900px;
// text-align:center;
// display:flex;
// align-items:center;
// justify-content:space-between;
`
const SectionText=styled.div`
width:150px;
font-weight:700;
font-size:16px;
padding:10px 70px 10px 0px;
box-sizing:border-box;
color:#191919;
margin-top:10px;
`
const ModalBg=styled.div`
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.6);
  position:fixed;
  z-index:100;
  top:0;
  left:0;
`
const DetailModal = styled.div`
  width: 400px;
  padding:50px 50px;
  box-sizing:border-box;
  background: white;
  height:200px;
  border-radius:20px;
  position: relative;
  top: 500px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction:column;
  z-index: 105;
  align-items:center;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
`;

const GreyBox =styled.div`
min-width: 447px;
min-height: 624px;
background: #F5F6F8;
border-radius: 24px;
display:flex;
align-items:center;
justify-content:center;
position:absolute;
z-index:-1;
font-family: 'Noto Sans KR';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 24px;
text-align: center;
letter-spacing: -0.03em;
color: #000000
`

const GreyBox2 =styled.div`
min-width: 447px;
min-height: 624px;
background: #F5F6F8;
border-radius: 24px;
display:flex;
align-items:center;
justify-content:center;
margin-left:470px;
float:left;
z-index:-1;
font-family: 'Noto Sans KR';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 24px;
text-align: center;
letter-spacing: -0.03em;
color: #000000
`
const DebateBottom=styled.div`
display:flex;
align-items:top;
width:100%;
margin-top:120px;
position:absolute;
top:780px;
`

export default DebateRoom;