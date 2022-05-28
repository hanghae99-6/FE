import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as Actions} from "../../redux/modules/main" 
import {Grid, Text, Button, Image} from "../../Elements/index";
import styled from "styled-components";
import Slider from "./MainParts/Slider";
import CategoryBtn from './CategoryBtn';

import mainPpImg from "../../Assets/mainPpImg.png"

const HotPeech = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(Actions.getOneClick());
    }, []);


    return(
        <HotPeechWrapper>
            {/* <Image shape="rectangle" width="60.22" src={mainPpImg}/> */}
            <Title>이번주 PEECH</Title>
            <SubText>어떤 토론들이 있었는지 살펴보고 나의 의견을 공유해보세요</SubText>
            <CategoryBtn></CategoryBtn>
            <Slider/>
        </HotPeechWrapper>
    )
}
const HotPeechWrapper=styled.div`
width:1260px;
margin: 0px auto;
text-align:center;
margin-top:50px;
`
const Title =styled.div`
color:#191919;
font-size:30px;
font-weight:700;
font-style:normal;
margin-bottom:10px;
font-family:Roboto;
letter-spacing: -0.03em;
`

const SubText =styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
letter-spacing: -0.03em;
color:#505050;
margin-bottom:57px;
`

export default HotPeech;