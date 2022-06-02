import React from 'react';
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import { Grid, Image} from "../Elements/index";

import livenowman from "../Assets/livenowman.png"

const LiveRoomItem =(props)=>{
    console.log("livenow props", props);
    const history =useHistory();
    const roomId=props?.roomId;
    const prosNickName=props?.prosNickName;
    const consNickName=props?.consNickName;
    const prosImage=props?.prosImage;
    const consImage=props?.consImage;
    const liveDebate=()=>{
        history.push(`/debate/${roomId}`);
    }

        return(
        <Wrapper>
            <CardBox onClick={liveDebate}>
                <CardHeader>
                    <Grid is_flex="true" justifyContent="flex-start" height="30px">
                        <Category>{props.category}</Category>
                        {props.status== "진행중" ? 
                        <OnAir>{props.status}</OnAir>
                        :
                        <OffAir>{props.status}</OffAir>
                    }
                    </Grid>
                    <Grid is_flex="true" justifyContent="space-between" alignItems="center" width="auto">
                        <Grid height="24px" margin="5px 0px 0px 10px">
                        </Grid>
                    </Grid>
                </CardHeader>
                <Grid width="100%" height="50px" padding="10px 0 0 0" margin="0 auto 55px">
                    <ProgressTitle>{props.topic}</ProgressTitle>
                </Grid>
                <Grid is_flex="true" alignItems="center">
                    <Grid display="flex" flexDirection="row" alignItems="center">
                        {/* <div>{prosNickName}(찬성)</div> */}
                        <Image width="34px" height="34px" border="3px solid #FF5912" margin="0 8px 0 0" src={prosImage}/>
                        {/* <div>{consNickName}(반대)</div> */}
                        <Image width="34px" height="34px" border="3px solid #8A4FFF" src={consImage}/>
                    </Grid>
                    <Grid display="flex" flexDirection="row" justifyContent="flex-end" alignItems="center" height="auto" >
                        <Image shape="rectangle" width="14px" height="16px" src={livenowman}/>
                        <TotalVotes>{(props.enterUserCnt<0)? 0:props.enterUserCnt}</TotalVotes>
                    </Grid>
                </Grid>       
            </CardBox>
        </Wrapper>
    )
}
 

const Wrapper = styled.div`
height: 275px;
`
const CardBox=styled.div`
display: flex;
flex-direction: column;
align-items:center;
width:398px;
height:258px;
border:2.3px solid #E8E9EC;
border-radius:30px;
padding: 32px 32px 20px;
margin:0px 10px;
cursor:pointer;
:hover{
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        transition: box-shadow 0.3s ease-in-out;
    }
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
color:#505050;
height:14px;
line-height:14px;
margin: 0 0 0 10px;
`
const AgreeText=styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
height: 16px;
font-size: 16px;
line-height: 16px;
letter-spacing: -0.03em;
color: #FF5912;
margin-top:3px;
margin-left:3px;
`
const DenialText=styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
height: 16px;
font-size: 16px;
line-height: 16px;
letter-spacing: -0.03em;
color: #8A4FFF;
margin-top:1px;
margin-left:3px;
`
const CardHeader=styled.div`
width: 100%;
height:80px;
display:flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`
const Category =styled.div`
/* width: 72px; */
margin-right: 10px;
height:auto;
padding:5px 15px;
border-radius:17px;
background: white;
color:#505050;
background-color: #F1F2F4;
font-size:14px;
`
const OnAir =styled.div`
/* width: 72px; */
margin-right: 10px;
height:auto;
padding:5px 15px;
border-radius:17px;
background: white;
color:#FF5912;
background-color: #FFE7DD;
font-size:14px;
`
const OffAir =styled.div`
/* width: 72px; */
margin-right: 10px;
height:auto;
padding:5px 15px;
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
margin: 10px 13px 0;
width: 90%;
height: 50px;
/* text-align:center; */
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
position:relative;
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

export default LiveRoomItem