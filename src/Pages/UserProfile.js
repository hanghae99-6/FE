import React ,{useEffect,useState} from 'react';
import { Grid } from "../Elements/index";
import {useLocation,useHistory} from "react-router-dom";
import IconButtons from '../Elements/IconButtons';
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreators as postActions } from "../redux/modules/post";
import { ActionCreators as commentActions } from '../redux/modules/comment';
import { ActionCreators as profileActions } from "../redux/modules/profile";
import DebateList from "../Pages/DebateList";
import ReplyList from "../Pages/ReplyList";
import GoDebateImg from "../Assets/mainPpImg.png";

function UserProfile() {
  const history =useHistory();
  const location = useLocation();
  const dispatch =useDispatch();
  const userInfo= jwt_decode(document.cookie)?jwt_decode(document.cookie):null; 
  const userEmail = userInfo.EMAIL;
  const userProfile =userInfo.PROFILE_IMG;
  const userNickname=userInfo.NICK_NAME
  useEffect(()=>{
    dispatch(postActions.loadPostDB());
    dispatch(commentActions.getMyCommentDB());
  },[])
  const ReplyCnt=useSelector((state)=>state.comment.myReplyCnt);
  const DebateCnt =useSelector((state)=>state.post.DebateCnt);
  const [nickname,setNickname]=React.useState(false);
  const [nickName,setNickChange]=React.useState(userNickname);
  const [panel, setPanel]=useState("debate");
  const [cookies,setCookie,removeCookie] = useCookies(["user"]);
  if(nickName.length>6){
      window.alert("닉네임변경은 6글자까지 가능합니다")
  }
  
  const goCreateDebate =()=>{
      history.push("/createRoom")
  }
  const nickToggle=()=>{
      if(nickname==false){
          setNickname(true)
      }else{
          setNickname(false);
      }
  }
  const nickChange=()=>{
    dispatch(profileActions.changeNicknameDB(nickName));
  }
  useEffect(()=>{
    if(location.pathname.split("/userprofile/")[1]!=userEmail){
        history.replace("/")
        alert("잘못된 경로입니다")
    }
  },[]) 
  const Logout = () => {
    removeCookie("token");
    history.push("/login")
} 
  return (
      <Wrapper>
        <UserNav>
            <UserSection>
                <UserImage src={userProfile}/>
                    {!nickname?
                     <Grid display="flex" alignItems="center" justifyContent="center">
                         <NicknameSection>{userNickname}</NicknameSection>
                         <Grid minWidth="22px" maxWidth="22px">
                            <Round>
                                <Grid margin="-7px 0px 0px 0px">
                                    <IconButtons Pencil size={14} color="#767676" _onClick={nickToggle}/>
                                </Grid>
                            </Round>
                         </Grid>
                    </Grid>
                    :
                    <>
                    <NickChangeSection>
                        <NickInput maxLength={6} placeholder={userNickname}  onChange={(e) => {setNickChange(e.target.value)}}/>
                        <ChangeNickBtn onClick={nickChange}>수정</ChangeNickBtn>
                        <CancleBtn onClick={nickChange}>취소</CancleBtn>
                        {/* <IconButtons cancle color="black" size={14} _onClick={nickToggle}></IconButtons> */}
                    </NickChangeSection>
                    </>
                    
                    }
                <EmailText>{userEmail}</EmailText>
            </UserSection>
            <DebateSection>
            {panel=="debate"&&
            <>
                <SectionTitleSelected onClick={()=>(setPanel("debate"))}>토론 내역</SectionTitleSelected>
                <SectionTitle onClick={()=>(setPanel("reply"))}>내가 쓴 댓글</SectionTitle>
                {/* <SectionTitle onClick={Logout}>로그아웃</SectionTitle> */}
            </>}
            {panel=="reply"&&
            <>
                <SectionTitle onClick={()=>(setPanel("debate"))}>토론 내역</SectionTitle>
                <SectionTitleSelected onClick={()=>(setPanel("reply"))}>내가 쓴 댓글</SectionTitleSelected>
                {/* <SectionTitle onClick={Logout}>로그아웃</SectionTitle> */}
            </>
            }
                
            </DebateSection>
        </UserNav>
        <MyDebates>
           {panel=="debate"&&
           <>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <Title>{userNickname}님,<br/> 토론 내용을 되돌아보고 정리해보세요! </Title>
                <Grid width="230px">
                    <img src={GoDebateImg} style={{marginLeft:"80px"}}/>
                    <GoDebate onClick={goCreateDebate}>실시간 토론하러 가기</GoDebate>
                </Grid>
            </div>
                <div style={{display:"flex", marginTop:"60px"}}>
                    <ListTitle>내가 참여한 토론 {DebateCnt}</ListTitle>
                </div>
                <div style={{marginTop:"20px"}}>
                    {DebateCnt>0?<DebateList/>:<NoReply>토론 참여 내역이 없습니다</NoReply>}
                </div>
           </>
            }
            {panel=="reply"&&
           <>
           <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <Title>위피치에서 활발하게 활동하고<br/>대중의 공감을 받아보세요! </Title>
            </div>
                <div style={{marginTop:"60px"}}>
                    <ListTitle>댓글로 참여한 방{ReplyCnt}</ListTitle>
                   <div style={{marginTop:"20px"}}>
                       {ReplyCnt>0? <ReplyList/>: <NoReply >댓글 작성 내역이 없습니다</NoReply>}
                       
                   </div>
                </div>
            </>
            }
        </MyDebates>

      </Wrapper>
  )
}

const Wrapper=styled.div`
min-width: 1045px;
width:1360px;
margin:0 auto;
display:flex;
position:relative;
`
const NickChangeSection=styled.div`
width:100%;
position:relative;

`
const NicknameSection=styled.div`
width:90%;
max-width:150px;
width:auto;
height:24px;
overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;
font-size:16px;
color:black;
font-weight:500;
text-align:center;
`
const Round=styled.div`
width:22px;
height:22px;
border-radius:50%;
border:1px solid #C4C4C4;
display:flex;
align-items:center;
justify-content:center;
`
const UserNav=styled.div`
width:207px;
height:838px;
background:#F5F6F8;
border-radius:30px;
margin-top:157px;
padding:40px 15px;
box-sizing:border-box;
`

const ChangeNickBtn=styled.div`
width:40px;
height:24px;
background:#505050;
border-radius:6px;
color:white;
text-align:center;
font-size:12px;
line-height:24px;
position:absolute;
right:48px;
top:15px;
cursor:pointer;
`
const CancleBtn=styled.div`
width:40px;
height:24px;
border:1px solid #505050;
color:#505050;
border-radius:6px;
text-align:center;
font-size:12px;
line-height:24px;
position:absolute;
right:5px;
top:15px;
cursor:pointer;
`
const UserSection =styled.div`
width:100%;
margin:0 auto;
text-align:center;
`

const NoReply =styled.div`
font-weight:400;
color:#191919;
font-size:16px;
`


const UserImage =styled.img`
width:100px;
height:100px;
border-radius:50%;
background:darkgrey;
margin:0 auto;
`
const NickText =styled.p`

`
const NickInput =styled.input`
margin:0 auto;
font-size:12px;
color:black;
font-weight:500;
margin:10px 0px 5px 0px;
border-radius:8px;
width:100%;
height:34px;
border:1px solid #C4C4C4;
background:transparent;
padding:10px;
box-sizing:border-box;
    &:focus{
        outline:none;
    }
`
const EmailText =styled.div`
margin:0 auto;
font-size:12px;
color:#999999;
font-weight:500;
`
const GoDebate =styled.button`
width:217px;
height:42px;
line-height:16px;
border:1px solid #191919;
background:none;
border-radius:28px;
color:#FF5912;
font-weight:700;
font-size:16px;

`

const DebateSection =styled.div`
width:100%;
margin:0 auto;
margin-top:30px;
border-top:1px solid #F5F6F8;
padding:10px 0px;
box-sizing:border-box;
`
const SectionTitle=styled.div`
line-height:40px;
width:100%;
height:40px;
background:transparent;
font-size:14px;
font-weight:500;
color:black;
cursor:pointer;
text-align:center;
border-radius:10px;
margin:10px 0px;
    &:hover{
        background:white;
    }
`

const SectionTitleSelected=styled.div`
line-height:40px;
width:100%;
height:40px;
background:white;
font-size:14px;
font-weight:500;
color:black;
cursor:pointer;
text-align:center;
border-radius:10px;
margin:10px 0px;
`
const MyDebates=styled.div`
width:1113px;
height:838px;
margin-top:157px;
padding-left:61px;
padding-top:26px;
box-sizing:border-box;
`
const Title =styled.div`
font-weight:700;
font-size:22px;
color:black;
`
const ListTitle=styled.div`
font-size:14px;
font-weight:400;
color:#505050;
margin-bottom:10px;
`

export default UserProfile;

