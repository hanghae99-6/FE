import React from 'react';
import Cookies from "universal-cookie";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { Grid , IconButtons } from "../Elements/index";
import { ActionCreators as profileAction } from "../redux/modules/profile";


function Debate(props) {
    const history =useHistory();
    const dispatch =useDispatch();
    const debateId=props.debate.debateId;
    const prosOrCons=props.side;
    const category=props.debate.categoryEnum.name;
    const totalReply=props.totalReply;
    const topic=props.debate.topic;
    const totalCons =props.debate.totalCons;
    const totalPros =props.debate.totalPros;
    const Date=props.debate.createdAt.split(" ")[0]
    const goDetail=()=>{
        history.push(`/detailed/${debateId}`)
    }
    const deleteList = (debateId) => {
        dispatch(profileAction.deleteList(debateId));
    }
    const cookies = new Cookies(); 
    const token = cookies.get("token");
  return (
    //   <Wrapper>
        <DebateItemWrapper onClick={goDetail}>
            <Grid width="10%"   display="flex" alignItems="center" justifyContent="center">
                <CateText>{category}</CateText>
            </Grid>

            <Grid width="7.5%" display="flex" alignItems="center" justifyContent="center">
                {prosOrCons==1?<ProsTag>찬성</ProsTag>:<ConsTag>반대</ConsTag>}
            </Grid>

            <Grid  width="46%" >
                <TopicText>{topic}</TopicText>
            </Grid>
            <Grid display="flex"  width="11%" alignItems="center" justifyContent="space-between" margin="0px 0px 0px -25px">
                <ProsConsText>찬성&nbsp;&nbsp;{totalPros?totalPros:0}</ProsConsText> 
                <span style={{color:"#CED1D9" ,marginLeft:"3px"}}>|</span>
                <ProsConsText>반대&nbsp;&nbsp;{totalCons?totalCons:0}</ProsConsText> 
            </Grid>
            <Grid  width="7.5%" display="flex" justifyContent="center" alignItems="center" margin="0px 0px 0px 40px">
                <IconButtons chat color="#CCCDCE" size="20"/>
                <Text>{totalReply}</Text>
            </Grid>

            <Grid width="15%" display="flex" alignItems="center" justifyContent="center"  margin="0px 0px 0px -5px">
                <Text>{Date}</Text>
            </Grid>
        </DebateItemWrapper>
  )
}

const Wrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 96%;
`
const ProsConsText =styled.div`
color:#191919;
font-weight:400;
font-size:14px;

`
const DebateItemWrapper=styled.div`
margin:0 auto;
min-width:100%;
width:100%;
max-width:100%;
border-bottom: 1px solid #E8E9EC;
display:flex;
padding:20px 0px;
box-sizing:border-box;
align-items:center;
cursor:pointer;
    &:last-child {
    border-bottom:none;
  }
`
const CateText=styled.div`
color:#505050;
font-weight:400;
font-size:14px;
`

const TopicText=styled.div`
font-weight:600;
font-size:16px;
color:#191919;
width:90%;
text-align:left;
overflow:hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2; /* 라인수 */
-webkit-box-orient: vertical;
word-wrap:break-word; 
line-height: 1.2em;
`

const ProsTag=styled.div`
width:54px;
height:30px;
text-align:center;
background:#FFEEE7;
color:#FF5912;
font-size:14px;
font-weight:400;
border-radius:16px;
line-height:30px;
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
`
const Text=styled.div`
color:#191919;
font-weight:400;
font-size:14px;
margin-left:10px;
`


export default Debate