import React from "react";
import styled from "styled-components";

import {Grid, Text, Button, Image, IconButtons} from "../../Elements/index";

import GoogleLoginButton from "../LoginButton/GoogleButton";
import KaKaoLogo0 from "../../Assets/kakao_login_medium_wide.png";
import NaverLogo0 from "../../Assets/naver_login.png";
import GoogleLogo from "../../Assets/btn_google_signin_light_normal_web@2x.png";
import NaverLogo from "../../Assets/naverLogo.png";
import KaKaoLogo from "../../Assets/kakaoLogo.png";
import { ContactsOutlined } from "@material-ui/icons";

const LoginButton = (props) => {
    const { text, _onClick, is_float, children, margin, width, padding, provider } = props;
    const Yet=()=>{
        window.alert("아직 준비중입니다.");
    }
    LoginButton.defaultProps = {
        margin: false,
        width: "120px",
        height: "30px",
        padding: "12px 0px",
        provider: "none",
        _onClick: () => {},
    };
    
    //카카오톡 로그인
    const KAKAO_CLIENT_ID = `${process.env.REACT_APP_KAKAO_CLIENT_ID}`;
    // const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/user/kakao/callback&response_type=code`;
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=https://www.wepeech.com/user/kakao/callback&response_type=code`;

    
    //네이버 로그인
    const NAVER_CLIENT_ID = `${process.env.REACT_APP_NAVER_CLIENT_ID}`;
    const NAVER_SECRET_KEY = `${process.env.REACT_APP_NAVER_SECRET_KEY}`;
    const naverRedirectUri = "http://localhost:3000/user/naver/callback";
    const NAVER_AUTH_URI = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${naverRedirectUri}`;

    if(provider==="Kakao"){
        return(
            <React.Fragment>
                <KakaoButton href={KAKAO_AUTH_URI}>
                    <Image shape="rectangle" width="25px" src={KaKaoLogo}/>
                    <LoginText size="14px" bold="600" margin="0 0 0 25px">
                        카카오 계정으로 로그인</LoginText>
                </KakaoButton>
            </React.Fragment>
        )
    }
    if(provider==="Naver"){
        return(
            <React.Fragment>
                <NaverButton
                // onClick={Yet}
                // href={NAVER_AUTH_URI}
                >
                    <Image shape="rectangle" width="25px" src={NaverLogo}/>
                    <Text size="14px" bold="600" margin="0 0 0 25px">
                        login with naver</Text>
                </NaverButton>                   
            </React.Fragment>
        )
    }
    if(provider==="Google"){
        return(
            // <div  style={{background:"white", width:"100%", borderRadius:"5px", marginTop:"10px"}}>
                <GoogleLoginButton/>
            // </div>
        )
    }
    return (
        <React.Fragment>
            <ErrButton>
                set provider~
            </ErrButton>
        </React.Fragment>
    )
}
export default LoginButton;

const KakaoButton = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #ffe812;
    margin-top:5px;
    border-radius: 5px;
    padding-right: 40px;
    width: 100%;
    height: 45px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
`
const NaverButton = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #1DC800;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-top: 10px;
    padding-right: 40px;
    width: 100%;
    height: 45px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
`
const GoogleButton = styled.div`
    /* display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center; */
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-top: 10px;
    padding-right: 40px;
    width: 100%;
    height: 45px;
    /* text-align: center;
    text-decoration: none; */
    cursor: pointer;
`

const ErrButton= styled.a`
    background-color: red;
    border: 1px solid lightgray;
    border-radius: 10px;
    color: black;
    width: 210px;
    height: 35px;
    padding: 3px;
    text-align: center;
`

const LoginText = styled.p`
    size: 14px ;
    font-weight: 600 ;
    margin: 0 0 0 25px ;
    color: #505050;
    /* font: ; */
`