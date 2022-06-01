import React from 'react';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { Grid, Image } from "../../Elements/index";
import OneClickItem from "./MainParts/OneClickItem";

import mainPpImg from "../../Assets/mainPpImg.png";

const OneClick = () => {
    const oneClickInfo = useSelector((state) => state.main.OneClickInfo);
    return(
        <Grid width= "1260px" margin="120px auto 0">
            <InfoWrap>
                <Title>원클릭 찬반토론</Title>
                <SubText>찬성 및 반대 의견을 실시간으로 빠르게 확인하고 투표할 수 있어요</SubText>
            </InfoWrap>
            <Grid width= "100%" margin= "0px auto" border="1px solid #E8E9EC" borderRadius="15px">
                {oneClickInfo.map((item,index)=>{
                    return(
                            <OneClickItem {...item} key={index}/>
                    )})}
            </Grid>
        </Grid>
    )
} 

const InfoWrap = styled.div`
    display:flex;
    flex-direction:column;
    /* justify-content: center; */
    align-items: center;
`

const Title=styled.div`
color:#191919;
font-weight:700;
font-style:normal;
font-family:Roboto;
font-size:30px;
margin:0 auto;
width:100%;
text-align:center;
margin-bottom:10px;
letter-spacing: -0.03em;
`
const SubText =styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 24px;
letter-spacing: -0.03em;
color:#505050;
margin-bottom:40px;
text-align:center;
`

export default OneClick;
