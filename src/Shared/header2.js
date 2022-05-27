import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import { Grid, Text, Button, Image } from "../Elements/index";
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { useCookies } from "react-cookie";

import grayprofile from "../Assets/basicprofile(gray).png"
import navarrow from "../Assets/navarrow.png"
import Kakaobase from "../Assets/kakaobase.png";

const Header2 = () => {
    const history = useHistory();
    const [isLogin, setIsLogin] = useState();
    const [navClick, setNavClick] = useState(false);
    
    const cookies = new Cookies(); 
    const token = cookies.get("token");
    const openToken = jwt_decode(token);
    const myEmail = openToken.EMAIL;
    
    useEffect(() => {
        if(myEmail){
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
      }, [token]);

    const loginInfo =
        useSelector((state)=>state?.login?.KakaoLogin);

    const navBtnHandle = () => {
            if(navClick == false){
            setNavClick(true)
        } else {
            setNavClick(false);
            }
        }
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);

    
    const Logout = () => {
        removeCookie("token");
        history.push("/");
    }
    const goProfile=()=>{
        const userInfo= jwt_decode(document.cookie);
        const email = userInfo.EMAIL;
        history.push(`/userprofile/${email}`)
    }
    const userInfo= jwt_decode(document.cookie);
    const userName = userInfo.NICK_NAME;
    const userProfile = userInfo.PROFILE_IMG=null? Kakaobase:userInfo.PROFILE_IMG;
  
        return(
            <HeaderWrapper>
                    <Grid name="inner" width="1260px" height="72px" margin="0 auto" is_flex="true" justifyContent="space-between">
                    {isLogin?
                        <>
                        <Logo onClick={()=>history.push("/")}>wepeech</Logo>
                        <Grid height="46px" width= "15%" is_flex="true" justifyContent="space-between" alignItems="center" padding="0">
                            <Grid margin="0 0 0 50px" is_flex= "true" flexDirection="row" alignItems="center" justifyContent="flex-end" width="240px">
                                <Text margin="3px 5px 0 0" width="100px" textAlign="end">{userName} 님</Text>
                                <img style={{width:"24px" ,height: "24px",borderRadius:"12px",cursur:"pointer"}} src={(userProfile=null)? Kakaobase:userProfile} onClick={goProfile}/>
                                <UserNavWrapper onClick={navBtnHandle}>
                                <Image shape="rectangle" width= "18px" height= "17px" src={navarrow}/>
                                {navClick&&
                                <>
                                    <UserNav>   
                                        <Button
                                        width="75%"
                                        height= "20px"
                                        margin="8px 0"
                                        padding="0 0"
                                        backGroundColor="white"
                                        text="내 토론내역"
                                        fontSize="14px"
                                        
                                        _onClick={goProfile}
                                        />
                                        <Button
                                        width= "75%"
                                        height= "20px"
                                        margin="8px 0"
                                        padding="0 0"
                                        backGroundColor="white"
                                        text="logout"
                                        fontSize="14px"
                                        _onClick={()=> {Logout()}}
                                        />
                                    </UserNav>
                                </>}
                                </UserNavWrapper>
                            </Grid>
                        </Grid>                
                        </>
                        :
                         <>
                         <Logo onClick={()=>(history.push("/"))}>wepeech</Logo>
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
                                 <Button
                                 width="45%"
                                 height="60px"
                                 backGroundColor="white"
                                 text="login"
                                 _onClick={()=>history.push('/login')}
                                 />  
                             </Grid>
                             </>
                            }

                        
                    </Grid>
            </HeaderWrapper> 
        )
};


const HeaderWrapper=styled.div`
position:fixed;
top:0;
left:0;
z-index:90;
background:white;
width:100%;
`

const Logo =styled.div`
color:#FF5912;
font-weight:700;
font-size:26px;
cursor: pointer;
`
const UserNavWrapper =styled.div`
    cursor: pointer;
    position: relative;
    margin-left:10px;
    border-radius:2px;
`
const UserNav = styled.div`
    position: absolute;
    left: -275%;
    top: 135%;
    width: 117px;
    height: 110px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
const Slicer = styled.div`
    width: 80%;
    height: 1px;
    border: 1px solid lightgray;
`

export default Header2;