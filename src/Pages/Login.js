import React from 'react';
import { Grid, Text, Image} from "../Elements/index";
import Logo from "../Assets/wepeech.png";
import LoginButton from "../Components/LoginButton/LoginButton";
import GoogleLoginButton from "../Components/LoginButton/GoogleButton";
import GoogleLogo from "../Assets/pngwing.com.png";
import styled from "styled-components";

const Login =()=>{
    const Yet=()=>{
        window.alert("아직 준비중입니다.");
    }
    return(
        <Wrapper>
            <LoginBox>
            <Image shape="rectangle" width="160px" height="31.31px" src={Logo}/>
            <Title>더이상 말하는게 두렵지 않아!<br/>
            스피치는 위피치에서!</Title>
                <ButtonWrapper>
                        <LoginButton provider="Kakao"/>
                        {/* <LoginButton provider="Naver"/>
                        <GoogleLogin >
                            <img src={GoogleLogo} style={{width:"24px", height:"24px", margin:"0px 5px"}}/>
                            Sign In with Google</GoogleLogin> */}
                        {/* <img src={GoogleLogo} style={height="40px"}/> */}
                        {/* <LoginButton provider="Google"/> */}
                </ButtonWrapper>
        </LoginBox>
        </Wrapper>
    )
};

const Wrapper=styled.div`
width:100%;
margin:0 auto;
`
const LoginBox=styled.div`
position: absolute;
top: 45%;
left: 50%;
transform: translate(-50% , -50%);
width:466px;
height:302px;
border: 1px solid #E8E9EC;
border-radius: 30px;
padding:40px;
box-sizing:border-box;
`
const Title =styled.div`
margin-top:20px;
font-size:20px;
font-weight:700;
color:#191919;
`
const ButtonWrapper =styled.div`
width:100%;
// background:red;
margin-top:30px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding:20px 0px;
box-sizing:border-box;
`
const OneButton =styled.div`
flex-direction:column;
align-items:center;
justify-content:center;
background:blue;
width:100%;
padding:0px 20px;
align-text:center;
margin-top:20px;
`
const GoogleLogin =styled.div`
width:100%;
background:white;
border-radius:5px;
height:45px;
text-align:center;
font-size:16px;
color:grey;
font-weight:600;
line-height:40px;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
display:flex;
align-items:center;
margin:0 auto;
margin-top:10px;
justify-content:center;
`


export default Login;