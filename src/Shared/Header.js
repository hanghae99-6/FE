import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Grid, Text, Button, Image } from "../Elements/index";
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import Livenow from '../Components/Livenow';
import mainlogo from "../Assets/Group.svg";
import grayprofile from "../Assets/basicprofile(gray).png";
import navarrow from "../Assets/navarrow.png";
import Kakaobase from "../Assets/kakaobase.png";


const Header = () => {
    const history = useHistory();
    const [navClick, setNavClick] = useState(false);
    const navBtnHandle = () => {
            if(navClick == false){
            setNavClick(true)
        } else {
            setNavClick(false);
            }
        }
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const Logout = () => {
        removeCookie("token");
        history.push("/");
    }
    const goProfile=()=>{
        const userInfo= jwt_decode(document.cookie);
        const email = userInfo.EMAIL;
        history.push(`/userprofile/${email}`)
    }
    const goMain=() => {
        history.push("/")
        window.location.reload();
    }
    const goLiveNow=()=>{
        console.log("고우라이브나우")
        history.push("/livenow")
    }
    if(document.cookie){
        const userInfo= jwt_decode(document.cookie);
        const userName = userInfo.NICK_NAME;
        const userProfile = userInfo.PROFILE_IMG=null? Kakaobase:userInfo.PROFILE_IMG;

        return(
            <HeaderWrapper>
                <Grid padding="0" margin="0 auto" />
                    <Grid name="inner" width="1260px" height="72px" margin="0 auto" is_flex="true" justifyContent="space-between" alignItems="center">
                        <MainLogo src={mainlogo} onClick={goMain}/>
                        {/* <Logo onClick={()=>history.push("/")}>wepeech</Logo> */}
                        <Grid height="46px" width= "15%" is_flex="true" justifyContent="space-between" alignItems="center" padding="0">
                            <LiveNowRound/><LiverNowText onClick={goLiveNow}>LiveNow</LiverNowText>
                            <Grid margin="0 0 0 50px" is_flex= "true" flexDirection="row" alignItems="center" justifyContent="flex-end" width="240px">
                                <Text margin="3px 5px 0 0" width="100px" textAlign="end">{userName} 님</Text>
                                <img style={{width:"24px" ,height: "24px",borderRadius:"12px",cursur:"pointer"}} src={userProfile} onClick={goProfile}/>
                                <UserNavWrapper onClick={navBtnHandle}>
                                <Image shape="rectangle" width= "18px" height= "17px" src={navarrow}/>
                                {
                                navClick&&
                                <>
                                    <UserNav>   
                                        <UserNavBtn onClick={goProfile}
                                        >내 토론내역</UserNavBtn>
                                        <UserNavBtn onClick={()=> {Logout()}}
                                        >로그아웃</UserNavBtn>
                                    </UserNav>
                                </>
                                }
                                </UserNavWrapper>
                            </Grid>
                        </Grid>                
                    </Grid>
            </HeaderWrapper> 
        )
    }
    if(!document.cookie){
        return(
            <HeaderWrapper>
                <Grid
                padding="0"
                margin="0 auto"
                >
                    <Grid
                    width="1260px" height="72px" margin="0 auto" is_flex="true" justifyContent="space-between">
                        <MainLogo src={mainlogo} onClick={goMain}/>
                        <Grid
                        margin="0 0 0 50px"
                        height= "25px"
                        is_flex="true"
                        flexDirection="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        width="20%"
                        >
                            <Image
                            src={grayprofile}
                            />
                            <LoginButton onClick={()=>history.push('/login')}>로그인</LoginButton> 
                        </Grid>
                    </Grid>
                </Grid>
            </HeaderWrapper>
        )
    }
}

const LiveNowRound=styled.div`
min-width: 6px;
min-height: 6px;
background: #FF5912;
border-radius:50%;
margin-right:5px;
margin-top:5px;
`
const LiverNowText=styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 24px;
letter-spacing: -0.03em;
color: #000000;
margin-top:5px;
cursor: pointer;
`
const HeaderWrapper=styled.div`
position:fixed;
margin: 0 auto;
top:0;
left:0;
z-index:90;
background:white;
width:100%;
`
const LoginButton=styled.div`
width:20%;
height:60px;
font-family:'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 30px;
margin-top:30px;
margin-left:10px;
`
const MainLogo=styled.img`
width:160px;
cursor:pointer;
`

const UserNavWrapper =styled.div`
cursor: pointer;
position: relative;
margin-left:10px;
border-radius:2px;
`
const UserNav = styled.div`
position: absolute;
padding:10px;
left: -275%;
top: 135%;
width: 117px;
/* height: 110px; */
background-color: white;
border-radius: 10px;
box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`

const UserNavBtn = styled.div`
width: 100%;
height: 30px;
line-height: 30px;
padding: 0 10px;
box-sizing: border-box;
font-family:'Roboto';
font-style: normal;
font-weight: 500;
font-size: 14px;
cursor:pointer;
`


const Slicer = styled.div`
width: 80%;
height: 1px;
border: 1px solid lightgray;
`

export default Header;