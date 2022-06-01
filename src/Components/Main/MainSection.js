import React from 'react';
import styled from "styled-components";
import {useHistory} from 'react-router-dom'
import MainImage from "../../Assets/Group 436.svg";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";


const MainSection = () => {
    const history = useHistory();
    const goCreateRoom=()=>{
        const cookies = new Cookies(); 
        const token = cookies.get("token");
        if(token==null){
            window.alert("로그인이 필요합니다.")
            history.push("/login")
        } else {
            history.push("/createRoom")
        }
    };

    return(
        <Wrapper>
            <MainBanner>
                <TextSection>
                    <TitleText>막막했던 스피치 연습,<br/>이제 위피치로 함께 하세요!</TitleText>
                    <SubText>토론자를 초대하면 실시간 1:1 토론을 할 수 있습니다</SubText>
                    <MainButton onClick={goCreateRoom} >토론방 만들기</MainButton>
                </TextSection>
                <ImageSection>
                    <img src={MainImage} style={{marginTop:"55px"}}/>
                </ImageSection>
            </MainBanner>
        </Wrapper>
    )
}
const Wrapper=styled.div`
margin-top:72px;
width:100%;
height:600px;
margin:0 auto;
background:#FAFAFB;
`
const MainBanner=styled.div`
width:1260px;
height:600px;
margin:0 auto;
display:flex;
`
const TextSection=styled.div`
width:50%;
display:flex;
flex-direction:column;
justify-content:center;
margin-top:55px;
padding-left: 10px;
`
const ImageSection=styled.div`
width:50%;
margin-top:150px;
`
const TitleText=styled.div`
color:#191919;
font-weight:700;
font-size:30px;
margin-top:10px;
font-family:Roboto;
`

const SubText=styled.div`
color:#505050;
font-weight:400;
font-size:20px;
font-family:Roboto;
`

const MainButton=styled.button`
color:white;
width:219px;
height:48px;
background-color:#FF5912;
border-radius:60px;
font-size:20px;
font-weight:700;
margin-top:30px;
cursor:pointer;
font-family:Roboto;
`



export default MainSection;