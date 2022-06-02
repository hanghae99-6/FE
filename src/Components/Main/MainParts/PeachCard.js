import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import {Grid, Text, Button, Image, IconButtons} from "../../../Elements/index";

import Agree from "../../../Assets/Agree.png";
import Denial from "../../../Assets/Denial.png";
import GrayAgree from "../../../Assets/GrayAgree.png";
import GrayDenial from "../../../Assets/GrayDenial.png"
import peechtotal from "../../../Assets/peechtotal.png"
import { IconButton } from '@mui/material';

const PeachCard =(props)=>{
    // console.log(props);
    const history = useHistory();
    const dispatch = useDispatch();
    const debateId = props.debateId;
    const pros = props.totalPros;
    const cons = props.totalCons;
    const totalReply = props.totalReply;
    const totalVotes = pros+cons;
    const prosLength = (totalVotes === 0)? 50:(pros/totalVotes)*100;
    const consLength = (totalVotes === 0)? 50: 100 - prosLength;

        return(
        <Wrapper>
            <CardBox onClick={()=>(history.push(`/detailed/${debateId}`))}>
                <CardHeader>
                    <Category>{props.categoryName}</Category>
                    <Grid is_flex="true" justifyContent="space-between" alignItems="center" width="auto">
                        {/* <Image shape="rectangle" src={peechtotal} width="24px" height="24px"/> */}
                        <Grid>
                            <IconButtons chat color="#CCCDCE" size="24"/>
                        </Grid>
                        <Grid height="24px" margin="8px 0px 0px 10px">
                            <TotalVotes>{totalReply}</TotalVotes>
                        </Grid>
                    </Grid>
                </CardHeader>
                <Grid width="90%" height="50px" padding="10px 0 0 0" margin="0 auto 55px">
                    <ProgressTitle>{props.topic}</ProgressTitle>
                </Grid>
                <ProgressSection>
                        <Grid width="100%" position="absolute" top="-18px" is_flex="true" justifyContent="spaceBetween">
                            <AgreeWrap>
                                <Image shape="rectangle" src={totalVotes==0? GrayAgree:Agree} width="36px" height="36px" cursor="pointer"/>
                            </AgreeWrap>
                            <Grid padding="4px 0 0 0">
                                <ProgressBg>
                                    <ProgressPros style={{
                                        width: `${prosLength}%`,
                                        zIndex: (props.totalPros > props.totalCons)? 9:8,
                                        background:(totalVotes==0)? "#E8E9EC":"#FFAC89",
                                    }}/> 
                                    <ProgressCons style={{
                                        width: `${consLength}%`,
                                        zIndex: (props.totalPros > props.totalCons)? 9:8,
                                        background:(totalVotes==0)? "#E8E9EC":"#E8DCFF"
                                    }}/>
                                </ProgressBg>
                            </Grid>
                            <DenailWrap>
                                <Image shape="rectangle" src={totalVotes==0? GrayDenial:Denial} width="36px" height="36px" cursor="pointer"/>                                
                            </DenailWrap>
                        </Grid>
                </ProgressSection>
                <ProsConsTotal>
                    <Grid display="flex" alignItems="center" justifyContent="center" width="90px" height="30px" margin="10px 0px 0px 0px">
                        <ContentText>찬성</ContentText>
                        <AgreeText style={{color: totalVotes==0? "#767676":"#FF5912"}}>{props.totalPros ? props.totalPros:0}</AgreeText>
                    </Grid>
                    <Grid display="flex" alignItems="center" justifyContent="center" width="90px" height="30px" margin="10px 0px 0px 0px">
                        <ContentText>반대</ContentText>
                        <DenialText style={{color: totalVotes==0? "#767676":"#8A4FFF"}}>{props.totalCons? props.totalCons:0}</DenialText>
                    </Grid>
                </ProsConsTotal>            
            </CardBox>
        </Wrapper>
    )

}
 

const TestDiv = styled.div`
`

const Wrapper = styled.div`
width:auto;
height: 308px;
`
const ContentText=styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 30px;
color:black;
`
const TotalVotes=styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 14px;
color:#505050;
height:24px;
`
const AgreeText=styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
height: 16px;
font-size: 16px;
line-height: 16px;
letter-spacing: -0.03em;
margin-top:3px;
margin-left:5px;
`
const DenialText=styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
height: 16px;
font-size: 16px;
line-height: 16px;
letter-spacing: -0.03em;
margin-top:1px;
margin-left:5px;
`
const CardBox=styled.div`
display: flex;
flex-direction: column;
align-items:center;
min-width:390px;
width:390px;
max-width:404px;
height:278px;
border:2.3px solid #E8E9EC;
border-radius:30px;
padding:24px 20px;
box-sizing:border-box;
margin:0px 10px;
cursor:pointer;
:hover{
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        transition: box-shadow 0.3s ease-in-out;
    }
`
const CardHeader=styled.div`
padding:10px 30px;
width: 100%;
height:80px;
display:flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`
const Category =styled.div`
/* width: 72px; */
height:auto;
padding:5px 16px;
border-radius:17px;
background: white;
color:#505050;
background-color: #F1F2F4;
font-size:14px;
`
const ProgressBg=styled.div`
padding-top:5px;
margin: 0 auto;
height:13px;
width:95%;
/* background-color:lightgrey; */
/* position:absolute;
top: 38px;
margin-left:3px; */
display:flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`
const ProgressTitle=styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 24px;
margin: 0 auto;
margin-left:15px;
width: 90%;
height: 50px;
text-align:left;
color:#505050;
word-break: break-all;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
`
const ProgressSection=styled.div`
margin: 0 auto; 
width:85%;
height:100px;
// background:pink;
position:relative;
// display:flex;
// justify-content:space-between;
`
const ProgressPros=styled.div`
height:13px;
width:50%;
`
const ProgressCons=styled.div`
height:13px;
width:50%;
`
const AgreeWrap=styled.div`
/* width: 50px; */
height: 110px;
display: flex;
flex-direction:column;
align-items:center;
justify-content:center;
z-index:10;
position:absolute;
/* box-sizing: border-box; */
`
const ProsConsTotal=styled.div`
width:100%;
display:flex;
flex-direction:row;
justify-content: space-between;
`

const DenailWrap =styled.div`
/* width: 50px; */
height: 110px;
display: flex;
flex-direction:column;
align-items:center;
justify-content:center;
position:absolute;
right:0;
z-index:10;
`

export default  PeachCard;


