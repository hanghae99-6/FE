import React,{ useEffect }from 'react';
import styled from "styled-components";
import { Grid, IconButtons} from "../Elements/index";
import { useHistory } from "react-router-dom";

function Debate2(props) {

    const history =useHistory();
    const debateId=props?.debateId;
    const goDetail=()=>{
        history.push(`/detailed/${debateId}`)
    }
    let prosOrCons =props?.side?.typeNum;
    const likesCnt=props.likesCnt
    if(prosOrCons===undefined){
        prosOrCons="찬성"
    }else if(prosOrCons===1){
        prosOrCons="찬성"
    }else{
        prosOrCons="반대"
    }
    const createdAt=props.createdAt.split("T")[0];
  return (
      <>
        <DebateItemWrapper onClick={goDetail}>
            <Header>
                <Grid display="flex" margin="0px 0px 0px -7px" >
                    <Category>{props.categoryEnum.name}</Category>
                    {(prosOrCons=="찬성")? <ProsTag>{prosOrCons}</ProsTag>:<ConsTag>{prosOrCons}</ConsTag>}
                </Grid>
                <Grid display="flex"  width="100px" alignItems="center" >
                    <DateText>{createdAt}</DateText>  
                </Grid>
            </Header>
            <Grid>
                <Grid margin="10px 0px 0px 0px">
                    <TitleText>{props.topic}</TitleText>
                </Grid>
                <Grid display="flex" alignItems="center" margin="10px 0px 0px 0px" justifyContent="space-between">
                    <ContentText>{props.reply}</ContentText>
                    <LikeText>
                        <IconButtons good color="#767676" size="16"/>
                        &nbsp;{likesCnt}개의 공감  
                    </LikeText>
                </Grid>     
            </Grid>
        </DebateItemWrapper>
      </>
  )
}

const DateText=styled.div`
color:#505050;
font-family:Roboto;
font-size:14px;
`



const DebateItemWrapper=styled.div`

width:100%;
padding:0px 0px 15px 15px;
cursor:pointer;
border-bottom: 1px solid #E8E9EC;
box-sizing:border-box;
display:flex;
flex-direction:column;
    &:last-child{
        border-bottom:none;
    }
`
const Header=styled.div`
display:flex;
justify-content:space-between;
align-items:center;
margin-top:20px;
`

const ConsTag=styled.div`
width:54px;
height:30px;
text-align:center;
background:#F3EDFF;
color:#8A4FFF;
font-size:14px;
font-weight:400;
border-radius:16px;
line-height:30px;
margin-left:10px;
`

const Text=styled.div`
font-weight:400;
font-size:14px;
color:black;
margin:0px 0px 0px 10px;
`
const TitleText=styled.div`
color:#191919;
font-weight:700;
font-size:16px;
width:80%;
overflow:hidden;
text-overflow:ellipsis;
white-space: nowrap;
`
const ContentText=styled.div`
max-width:80%;
color:#191919;
font-weight:400;
font-size:14px;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2; /* 라인수 */
-webkit-box-orient: vertical;
word-wrap:break-word; 

`

const Category=styled.div`
width:auto;
text-align:center;
max-height:30px;
padding:5px 14px;
box-sizing:border-box;
line-height:22px; 
color:#505050;
font-size:14px;
border-radius:16px;
background:#F5F6F8;
`

const ProsTag=styled.div`
margin-left:10px;
width:54px;
max-height:30px;
text-align:center;
background:#FFEEE7;
color:#FF5912;
font-size:14px;
font-weight:400;
border-radius:16px;
line-height:30px;
`
const LikeText=styled.div`
font-size:14px;
font-weight:400;
color:#505050;
background:#F5F6F8;
padding:5px;
box-sizing:border-box;
min-width:113px;
text-align:center;
border-radius:6px;
display:flex;
align-items:center;
justify-content:center;
margin-top:-10px;

`


export default Debate2;