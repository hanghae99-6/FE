import React from 'react';
import styled from "styled-components";
import {Grid, Text, Image} from "../../Elements/index";


import FacebookMini from "../../Assets/Facebookmini.png"
import NaverMini from "../../Assets/Navermini.png";
import YoutubeMini from "../../Assets/Youtubemini.png";
import Kakaomini from "../../Assets/kakaomini.png"
import Instamini from "../../Assets/instamini.png"
import Googlemini from "../../Assets/googlemini.png"


const MainBottom = () => {

    return(
        <Grid padding="80px 0 0 0" width="1260px" height="270px" margin="160px auto 0">
            <Grid height="50px" is_flex="true" flexDirection="row" alignItems="space-between">
                <FooterLogo>WEPEECH</FooterLogo>
                <Grid width="20%" is_flex="true" flexDirection="row" justifyContent="space-around" alignItems="center">
                    <a href="https://www.facebook.com/wepeech">
                        <Image shape="rectangle" width="32px" src={FacebookMini}/>
                    </a>
                    <Image shape="rectangle" width="32px" src={NaverMini}/>
                    <Image shape="rectangle" width="32px" src={YoutubeMini}/>
                    <Image shape="rectangle" width="32px" src={Kakaomini}/>
                    <a href="https://www.instagram.com/accounts/login/?next=/wepeech/">
                        <Image shape="rectangle" width="32px" src={Instamini}/>
                    </a>
                    <Image shape="rectangle" width="32px" src={Googlemini}/>
                </Grid>
            </Grid>
            <RowLine/>
            <Grid margin="20px 0px 0px 0px">
                <Text color="#767676" bold="200" size="12px">
                    위피치 | 제작자:항해 6조 | Gathertown HangHae99-6A | 전화번호 : 02-1234-5678 | Hosting By : Amazon Web Services Inc. | E-mail : wepeech@wepeech.com
                    <br/>
                    @ 2022 Wepeech AlrightsReserved.
                </Text>
                <UserPrivate>
                    <PrivateLink>소개</PrivateLink>
                    <PrivateLink>이용약관</PrivateLink>
                    <PrivateLink>개인정보처리방침</PrivateLink>
                    <PrivateLink>문의사항</PrivateLink>
                </UserPrivate>
            </Grid>
        </Grid>
    )
}

export default MainBottom;
const FooterLogo=styled.div`
font-family:'Roboto';
font-style: normal;
font-weight:700;
font-size: 30px;
line-height: 40px;
letter-spacing: -0.02em;
color: #505050;
`

const RowLine = styled.div`
    height: 1px;
    border: 0.5px solid #E3E2E2;
    margin-top:30px;
`
const UserPrivate = styled.div`
    margin-left:-7px;
    width: 245px;
    height: 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`
const PrivateLink = styled.a`
    color:#767676;
    font-weight:200;
    font-size:12px;
    text-decoration: none;
    :active{
        color:#767676;
    }
    /* :hover{
    } */
`
