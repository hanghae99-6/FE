import React,{useEffect,useState} from 'react';
import styled from "styled-components";
import { useSelector, useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';
import {Grid, Text, Button, Image, IconButtons} from "../Elements/index";
import dayjs from "dayjs"
import { DropDown5 } from '../Components/DropDown';
import CommentList from '../Pages/CommentList';
import {ActionCreators as detailAction} from "../redux/modules/detail";
import {ActionCreators as commentAction} from "../redux/modules/comment";
import {ActionCreators as voteAction} from "../redux/modules/proscons";
import KakaoBaseImg from "../Assets/kakaobase.png";


function DebateDetail(props) {
    let [prosCons,setProsCons]=useState('');
    const dispatch =useDispatch();
    const history = useHistory();
    const [myState,setMyState]=useState(false);
    const debateDetail =
        useSelector((state)=>state?.detail?.detailInfo?.debate?state.detail.detailInfo.debate:"");
        console.log(debateDetail,"asdf");
    const enterUserList =
        useSelector((state)=>state?.detail?.detailInfo?.enterUserList?state.detail.detailInfo.enterUserList:"");
    const userSide =
        useSelector((state)=>state?.detail?.side? state?.detail?.side:"");
    const pickedSide=
        useSelector((state)=>state?.proscons?.TotalProsCons);
    const commentLength=useSelector((state)=>state?.comment?.commentList?.length);
    const category = debateDetail.categoryEnum;
    const topic = debateDetail.topic;
    const content = debateDetail.content;
    
    const createdAt = dayjs(debateDetail.createdAt).format("YYYY년 MM월 DD일");

    const visitCnt= debateDetail.visitCnt;
    const prosName = debateDetail.prosName;
    const consName = debateDetail.consName;
    const totalPros = debateDetail.totalPros;
    const totalCons = debateDetail.totalCons;
    const totalReply = debateDetail?.totalReply;
    const userImage = debateDetail.userImage;
    const side = userSide;
    const id = debateDetail.debateId
    const pros = 1;
    const cons = 2;
    const sendProsCons = (side) => {
        dispatch(voteAction.postProsCons(id,side));
    };
    useEffect(()=>{
        if(pickedSide==1){
            setMyState(true)
        }else if(pickedSide==2){
            setMyState(false);  
        }else{
            setMyState(null);
        }
    },[pickedSide]);
    const [reply,setReply]= useState('');
    const debateId=props.match.url.split("/detailed/")[1]
    useEffect(()=>{
        dispatch(voteAction.getProsConsDB(debateId));
        dispatch(detailAction.GetDetailDB(debateId));
        dispatch(commentAction.getCommentDB(debateId));
    },[totalReply])
    const addComment=()=>{
        if(prosCons===""){
            window.alert("찬/반을 선택해 주세요")
            return;
        }
        if(prosCons=="찬성"){
            prosCons="1"
        }else if(prosCons=="반대"){
            prosCons="2"
        }else{
            prosCons="0"
        }
        dispatch(commentAction.addCommentDB(debateId,reply,prosCons));
        setReply("");
    }
    if(debateDetail.createdAt==undefined){
        return(<></>)
    };
    if(debateDetail==""){
        return(<></>)
    };

    const onKeyPress =(e)=>{
        if(e.key=="Enter"){
            addComment();
        }
    }
    if(reply.length>125){
        window.alert("글자수를 초과하였습니다!")
    }
  return (
        <>
      <Wrapper>
        <Grid width="1134px" margin="0 auto">
            <DebateTitle>{topic}</ DebateTitle>
            <DebateInfo>
                <Text bold="400" size="14px" margin="5px 0 0 0" color="#505050">
                    {createdAt}
                </Text>
                <span style={{color:"grey", fontSize:"14px", marginTop:"5px"}}>|</span>
                <Text bold="400" size="14px" margin="5px -10px 0 0" color="#505050">조회 수 {visitCnt}</Text>
                <span style={{color:"grey", fontSize:"14px", marginTop:"5px", marginLeft:"10px"}}>|</span>
                <Text bold="400" size="14px" margin="5px -15px 0 0" color="#505050">댓글 수 {totalReply}</Text>
            </DebateInfo>
            <DebateContent>
                {content}
            </DebateContent>
        </Grid>
        <Grid width="1134px" margin="0 auto" is_flex="true">
            <Container>
                <GroundBox>
                    <OppBox>
                        <ProsSideBlock>찬성</ProsSideBlock>
                        <OpinionText>{enterUserList[0]?.opinion?enterUserList[0]?.opinion:null}</OpinionText>
                    </OppBox>
                    <EvidenceBox>
                        {enterUserList[0]?.evidences?.map((item,index) => {
                            return (
                                <OneEvidence>
                                    <OppNum>{index+1}</OppNum>
                                    <>
                                    <div {...item} key={index}>{item.evidence}</div>
                                    </>
                                </OneEvidence>
                            )
                        })}
                    </EvidenceBox>
                    <Grid is_flex="true" justifyContent="flex-end" alignItems="center" height="28px" padding="0">
                        <Image shape="rectangle" radius="50%" width="28px" height="28px"
                        src={enterUserList[0]?.userImage=="null" ? KakaoBaseImg : enterUserList[0].userImage}
                        />
                        <Text color="#000000" size="14px" bold="400" margin="0 0 0 8px">{enterUserList[0]?.userNickName? enterUserList[0].userNickName:enterUserList[0]?.userEmail} 님의 주장</Text>
                    </Grid>
                </GroundBox>
            </Container>
            <Container>
                
                <GroundBox>
                    <OppBox>
                        <ConsSideBlock>반대</ConsSideBlock>
                        <OpinionText >{enterUserList[1]?.opinion?enterUserList[1]?.opinion:null}</OpinionText>
                    </OppBox>
                    <EvidenceBox>
                        {enterUserList[1]?.evidences?.map((item,index) => {
                            return (
                                <OneEvidence>
                                    <OppNum>{index+1}</OppNum>
                                    <div {...item} key={index}>{item.evidence}</div>
                                </OneEvidence>
                            )
                        })}
                    </EvidenceBox>
                    <Grid is_flex="true" justifyContent="flex-end" alignItems="center" height="28px" padding="0">
                        <Image shape="rectangle" radius="50%" width="28px" height="28px"
                        src={enterUserList[1]?.userImage=="null" ? KakaoBaseImg : enterUserList[1].userImage}
                        />
                        <Text color="#000000" size="14px" bold="400" margin="0 0 0 8px">{enterUserList[1]?.userNickName?enterUserList[1].userNickName:enterUserList[1]?.userEmail} 님의 주장</Text>
                    </Grid>
                </GroundBox>
            </Container>
        </Grid>
            <BottomBtnSec>
            {myState==null?
                <>
                    <Grid margin="0px 20px 0px 0px">
                        <ProsBtn onClick={()=>{sendProsCons(pros)}}>
                            <Grid is_flex="true" justifyContent="center" align-items="center">
                                <IconButtons happyFill color="#CED2D9"/>
                                <Text size="16px" color="#505050" bold="500" margin="0 0 0 10px">찬성</Text>
                            </Grid> 
                        </ProsBtn>
                    </Grid>
                    <Grid> 
                        <ConsBtn onClick={()=>{sendProsCons(cons);}}>
                            <Grid is_flex="true" justifyContent="center" align-items="center">
                                <IconButtons unhappyFill color="#CED2D9"/>
                                <Text size="16px" color="#505050" bold="500" margin="0 0 0 10px">반대</Text>
                            </Grid> 
                        </ConsBtn>
                    </Grid>
                </>    
                :(myState?
                <>
                    <Grid margin="0px 20px 0px 0px">
                        <ProsProsBtn disabled={true}>
                            <Grid is_flex="true" justifyContent="center" alignItems="center">
                                <IconButtons happyFill color="white"/>
                                <Text size="16px" color="white" bold="500" margin="0 0 0 10px">찬성</Text>
                            </Grid> 
                        </ProsProsBtn>
                    </Grid>
                    <Grid> 
                        <ConsBtn onClick={()=>{sendProsCons(cons);}}>
                            <Grid is_flex="true" justifyContent="center" align-items="center">
                                <IconButtons unhappyFill color="#CED2D9"/>
                                <Text size="16px" color="#505050" bold="500" margin="0 0 0 10px">반대</Text>
                            </Grid> 
                        </ConsBtn>
                    </Grid>
                </>
                    :<>
                    <Grid  margin="0px 20px 0px 0px">
                        <ProsBtn onClick={()=>{sendProsCons(pros);}}>
                            <Grid is_flex="true" justifyContent="center" align-items="center">
                                <IconButtons happyFill color="#CED2D9"/>
                                <Text size="16px" color="#505050" bold="500" margin="0 0 0 10px">찬성</Text>
                            </Grid> 
                        </ProsBtn>
                    </Grid>
                    <Grid> 
                        <ConsConsBtn disabled={true}>
                            <Grid is_flex="true" justifyContent="center" align-items="center">
                                <IconButtons unhappyFill color="white"/>
                                <Text size="16px" color="white" bold="500" margin="0 0 0 10px">반대</Text>
                            </Grid>
                        </ConsConsBtn>
                    </Grid>
                </>)
                }
            </BottomBtnSec>
        <CommentSection>
            <Grid display="flex">
                <CommentTitle>댓글</CommentTitle>
                <CommentTitle>{commentLength}</CommentTitle>
            </Grid>
          
            <Grid display="flex" alignItems="center">
                <DropDown5 setProsCons={setProsCons}>{prosCons}</DropDown5>
                <CommentInput value={reply} maxLength="125" placeholder="자신의 의견을 적어주세요(최대125자)"  onKeyPress={onKeyPress} onChange={(e)=>(setReply(e.target.value))}/>
                <SendBtn onClick={addComment}>작성하기</SendBtn>
            </Grid>
            <Grid margin="40px 0px 0px 0px">
                <CommentList debateId={debateId}/>
            </Grid>
        </CommentSection>
    </Wrapper>
    </>
  )
}
const OpinionText=styled.div`
font-family:'Roboto';
font-style:normal;
font-weight: 700;
font-size: 16px;
line-height: 24px;
letter-spacing: -0.03em;
color: #191919;
`
const Wrapper=styled.div`
    width:1360px;
    margin:0 auto;
    margin-top: 112px;
    padding-bottom:350px;
`
const DebateInfo=styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    width:290px;
    font-weight:500;
    font-size:18px;
    color:#191919;
    padding-left:27px;
    margin:16px 0 43px 0;
`
const OneEvidence=styled.div`
width:100%;
display:flex;
align-items:top;
margin-bottom:15px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 22px;
letter-spacing: -0.03em;
color: #191919;
// background:red;
`
const DebateTitle=styled.div`
    background-color:#F5F6F8;
    line-height:40px;
    border-radius:12px;
    font-weight:700;
    font-size:20px;
    color: #191919;
    margin:0 auto;
    padding: 10px 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`
const ProsSideBlock = styled.div`
    min-width: 65px;
    width:65px;
    height:40px;
    line-height:40px;
    border-radius:10px;
    background-color:#FFEEE7;
    padding:0 15px;
    margin:0 20px 0 0;
    font-size:16px;
    font-weight:700;
    text-align:center;
    border:"1px solid lightgray";
    color:#FF5912;
`
const ConsSideBlock = styled.div`
    min-width: 65px;    
    width:65px;
    height:40px;
    line-height:40px;
    border-radius:10px;
    background-color:#F3EDFF;
    padding:0 15px;
    margin:0 20px 0 0;
    font-size:16px;
    font-weight:700;
    text-align:center;
    border:"1px solid lightgray";
    color:#8A4FFF;
`
const DebateContent=styled.div`
    width: 1080px;
    margin: 0 auto;
    font-weight:400;
    font-size: 14px;
    color:#191919;
    padding-left:2px;
`
const Container=styled.div`
    /* position:relative; */
    width:550px;
    height:411px;
    /* border:1px solid lightgray; */
    margin-top:50px;
    box-sizing:border-box;
`
const CommentSection =styled.div`
    padding-top:95px;
    width:1156px;
    margin:0 auto;
`
const CommentTitle=styled.p`
    width:100px;
    display:inline-block;
    font-weight:600;
    font-size:20px;
    color:#191919;
    margin-right:-45px;
`
const CommentInput=styled.input`
    width:100%;
    border:none;
    height:48px;
    background:#F5F6F8;
    padding:0px 10px;
    box-sizing:border-box;
    border-radius:0px 10px 10px 0px;
    &:focus
    {
        outline:none;
    }

`
const SendBtn=styled.button`
    width:122px;
    height:48px;
    color:#767676;
    padding:10px;
    box-sizing:border-box;
    background:#F5F6F8;
    border-radius:10px;
    margin-left:10px;
    &:hover{
        background:#FF5912;
        color:white;
    }
`
const BottomBtnSec = styled.div`
    width: 266px;
    height: 40px;
    margin: 42px auto 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* border: 1px solid black; */
`
const ProsBtn =styled.div`
    box-sizing:border-box;
    width:120px;
    height:48px;
    border:1px solid #CED2D9;   
    border-radius:30px;
    color:#CED2D9;
    font-size:14px;
    font-weight:400;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
`
const ProsProsBtn =styled.div`
    box-sizing:border-box;
    width:120px;
    height:48px;
    border:1px solid #FF5912;   
    border-radius:30px;
    color:white;
    font-size:14px;
    font-weight:400;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    background:#FF5912;
`
const ConsBtn =styled.div`
    box-sizing:border-box;
    width:120px;
    height:48px;
    border:1px solid #CED2D9;   
    border-radius:30px;
    color:#CED2D9;
    font-size:14px;
    font-weight:400;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
`
const ConsConsBtn =styled.div`
    box-sizing:border-box;
    width:120px;
    height:48px;
    border:1px solid #8A4FFF;   
    border-radius:30px;
    color:white;
    font-size:14px;
    font-weight:400;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    background:#8A4FFF;
`
const OppBox = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom:16px;
    /* border: 1px solid black; */
`
const GroundBox = styled.div`
    padding: 22px 32px;
    height: 364px;
    display: flex;
    flex-direction: column;
    border-radius: 24px;
    border: 1px solid #E8E9EC;
`
const OppNum = styled.div`
    min-width: 18px;
    min-height: 18px;
    max-width: 18px;
    max-height: 18px;
    line-height: 17px;
    text-align: center;
    font-size: 14px;
    margin: 2px 5px 0 0;
    padding-right:1px;
    text-align:center;
    border-radius:50%;
    color: white;
    background-color: #999999;
 `
const EvidenceBox = styled.div`
    border-radius: 16px;
    background-color: #F8F8FA;
    display: flex;
    flex-direction: column;
    height: 200px;
    padding: 20px 24px;
    margin-bottom: 32px;
    overflow:scroll;
`

export default DebateDetail;