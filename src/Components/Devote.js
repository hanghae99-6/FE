import React from 'react'
import styled from "styled-components";
import { Popover, OverlayTrigger} from 'react-bootstrap';
import "../Shared/App.css";
import IconButtons from '../Elements/IconButtons';

function Devote(props) {
    const popoverRight = (
        <Popover id="popover-positioned-scrolling-right" title="Popover right">
            레벨은 글 작성시 20%, 댓글 작성시 5% 상승합니다.
        </Popover>
     );
  return (
    <Wrapper>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <h3>실시간 투표 현항</h3>
            <OverlayTrigger 
                trigger="click"
                placement="right"
                overlay={popoverRight}>
                <p style={{cursor:"pointer"}}>투표 규칙보기</p>
            </OverlayTrigger>
        </div>
        <Contents>
            <DevoteBox>
                <EmptyBtn/>
                <ProgressBack>
                    <ProgressUp/>
                    <ProgressText>유저의 이름이 들어갈 공간입니다</ProgressText>
                    <ProgressText>14표</ProgressText>
                </ProgressBack>
            </DevoteBox>
            <DevoteBox>
                <CheckBtn>
                    <IconButtons check color="white" size="12" margin="-2px 0px 4px 5px"/>
                </CheckBtn>
                <ProgressBack>
                    <ProgressUp/>
                    <ProgressText>유저의 이름이 들어갈 공간입니다</ProgressText>
                    <ProgressText>14표</ProgressText>
                </ProgressBack>
            </DevoteBox>
        </Contents>
        
    </Wrapper>
  )
}

const Wrapper=styled.div`
margin-top:-420px;
width:950px;
height:200px;
border:1px solid lightgrey;
border-radius:20px;
padding:10px 20px;
box-sizing:border-box;
    h3{
        font-size:16px;
    }
    p{
        font-size:14px;
        color:#767676;
    }
`
const Contents= styled.div`
width:100%;
`
const ProgressBack=styled.div`
width:100%;
background:#F5F6F8;
height:42px;
line-height:42px;
border-radius:10px;
position:relative;
display:flex;
justify-content:space-between;
padding:0px 20px;
box-sizing:border-box;
`
const ProgressUp=styled.div`
line-height:42px;
width:70%;
height:42px;
background:#FFDED0;
z-index:10;
border-radius:10px 0px 0px 10px;
position:absolute;
left:0px;
`
const ProgressText=styled.p`
font-size:14px;
color:#191919;
z-index:11;
`
const CheckBtn=styled.div`
width:24px;
height:24px;
border-radius:50%;
background:#FF5912;
margin-right:20px;
`

const EmptyBtn=styled.div`
width:24px;
height:24px;
border-radius:50%;
border:1px solid #CED2D9;
margin-right:20px;
`

const DevoteBox=styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:space-between;
padding:10px 0px;
`


export default Devote;