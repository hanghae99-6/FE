import React from 'react';
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import { Grid, IconButtons } from "../Elements/index";
const LiveRoomItem =(props)=>{
    const history =useHistory();
    console.log(props);
    const roomId=props?.roomId
    console.log(roomId);
    const liveDebate=()=>{
        console.log("가즈아")
        history.push(`/debate/${roomId}`);
    }

        return(
        <Wrapper>
            <CardBox onClick={liveDebate}>
                <CardHeader>
                    <Grid display="flex" height="30px">
                        <Category>경제</Category>
                        <Category>{props.status}</Category>
                    </Grid>
                    
                    <Grid is_flex="true" justifyContent="space-between" alignItems="center" width="auto">
                        {/* <Image shape="rectangle" src={peechtotal} width="24px" height="24px"/> */}
                        {/* <Grid>
                            <IconButtons chat color="#CCCDCE" size="24"/>
                        </Grid> */}
                        <Grid height="24px" margin="5px 0px 0px 10px">
                            <TotalVotes>{props.enterUserCnt}/10</TotalVotes> 
                        </Grid>
                    </Grid>
                </CardHeader>
                <Grid width="90%" height="50px" padding="10px 0 0 0" margin="0 auto 55px">
                    <ProgressTitle>{props.topic}</ProgressTitle>
                </Grid>
                {/* <ProgressSection>
                        <Grid width="100%" position="absolute" top="-18px" is_flex="true" justifyContent="spaceBetween">
                            <AgreeWrap>
                                <Image shape="rectangle" src={Agree} width="36px" height="36px" cursor="pointer"/>
                            </AgreeWrap>
                            <Grid padding="0">
                                <ProgressBg>
                                    <ProgressPros style={{
                                        width: `${prosLength}%`,
                                        zIndex: (props.totalPros > props.totalCons)? 9:8,
                                        background: "#FFAC89",
                                    }}/> 
                                    <ProgressCons style={{
                                        width: `${consLength}%`,
                                        zIndex: (props.totalPros > props.totalCons)? 9:8,
                                        background:"#E8DCFF",
                                    }}/>
                                </ProgressBg>
                            </Grid>
                            <DenailWrap>
                                <Image shape="rectangle" src={Denial} width="36px" height="36px" cursor="pointer"/>                                
                            </DenailWrap>
                        </Grid>
                </ProgressSection> */}
                {/* <ProsConsTotal>
                    <Grid display="flex" alignItems="center" justifyContent="center" width="90px" height="30px" margin="10px 0px 0px 0px">
                        <ContentText>찬성</ContentText>
                        <AgreeText>{props.totalPros ? props.totalPros:0}</AgreeText>
                    </Grid>
                    <Grid display="flex" alignItems="center" justifyContent="center" width="90px" height="30px" margin="10px 0px 0px 0px">
                        <ContentText>반대</ContentText>  
                        <DenialText>{props.totalCons? props.totalCons:0}</DenialText>
                    </Grid>
                </ProsConsTotal>             */}
            </CardBox>
        </Wrapper>
    )

}
 
// function LiveRoomItem(props) {
   
//   return (
//       <Wrapper onClick={liveDebate}>
//       <div>{props.topic}</div>
//       <div>{props.content}</div>
//       <div>{props.status}</div>
//       <div>{props.enterUserCnt}/10</div>
//       </Wrapper>
//   )
// }

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
const CardBox=styled.div`
display: flex;
flex-direction: column;
align-items:center;
min-width:390px;
width:390px;
max-width:404px;
height:278px;
border:2.3px solid #E8E9EC;
border-radius:40px;
padding:28px 25px;
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
padding:5px 10px;
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
width: 90%;
height: 50px;
text-align:center;
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

export default LiveRoomItem