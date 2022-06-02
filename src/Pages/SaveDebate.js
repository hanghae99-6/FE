import React ,{ useEffect, useState } from 'react';
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { ActionCreators as PostActions} from "../redux/modules/post";
import IconButton from "../Elements/IconButtons";
import Grid from "../Elements/Grid";
import {DropDown4} from "../Components/DropDown";
import {useHistory} from "react-router-dom";
import Main from "./Main";
import { IconButtons } from "../Elements/index";
import { ActionCreators as RoomActions} from "../redux/modules/room";
import { style } from '@mui/system';

function SaveDebate(props) {
    const RoomData = useSelector((state)=>state?.room?.roomdata)
    const location=useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    let evidences = useSelector((state)=>state?.post?.evidence)
    const [opinion,setOpinion]=useState('')//주장
    const [evidence,setEvidence]=useState('')//근거    
    // const prosCons
    const roomId=location.pathname.split("/saveDebate/")[1];
    console.log(roomId);
    const savePost=()=>{
        dispatch(PostActions.savePostDB(opinion,evidences,roomId))
    }
    const addEvidence=()=>{
        dispatch(PostActions.addEvidence(evidence))
        setEvidence("");
    }

    const alertPage=()=>{
        window.alert("마지막 한마디를 남겨주세요!")
    }
    const alertPage2=()=>{
        window.alert("최소 하나 이상의 근거를 입력해주세요!")
    }
    
    const onKeyPress =(e)=>{
        if(e.key=="Enter"){
            addEvidence();
        }
    }

    if(opinion.length>100||evidence.length>100){
        window.alert("주장과 근거는 각각 최대 100자를 넘길 수 없습니다");
    }

  return (
    <>
        <ModalBg/>
            <Wrapper>
                <div style={{display:"flex", alignItems:"center",  width:"100%", marginLeft:"230px"}}>
                    
                    
                   <Grid margin="0px 0px 0px 0px">
                        <TitleText>토론 종료</TitleText>
                   </Grid>
                   <Grid margin="0px -20px 0px 0px">
                        <IconButton cancle color="#d3d3d3" size="20" _onClick={alertPage}/>
                    </Grid>
                        
                 
                </div>
                    <SectionText>나의주장</SectionText>
                <div style={{marginTop:"10px"}}>
                    <FullInput maxLength={100} onChange={(e) => {setOpinion(e.target.value)}} placeholder="예)사형제도는 폐지되어야 한다"/>
                </div>
                <div style={{marginTop:"30px", display:"flex", flexDirection:"column"}}>
                    <SectionText>근거(최대 5개)</SectionText>
                    <div style={{margin:"10px 0px",position:"relative", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                        <FullInput maxLength={100} value={evidence} onChange={(e) => {setEvidence(e.target.value)}} onKeyPress={onKeyPress}/>
                        <Addbutton disabled={!evidence||evidences?.length>=5} onClick={addEvidence}  >+ 추가</Addbutton>
                    </div>
                    <ExText>최대 100자까지 입력할 수 있습니다</ExText>
                      {evidences?.map((evidence,index)=>{
                  return (<Evidence key={index}>
                      <div style={{display:"flex",alignItems:"center", justifyContent:"space-between", minHeight:"32px", padding:"0px 10px"}}>
                          <EvidenceText>
                            {evidence}
                          </EvidenceText>
                       
                       
                            <IconButtons margin="0px 0px 0px 0px" size="18" color="#999999" trash _onClick={()=>dispatch(PostActions.deleteEvidence(index))}></IconButtons>
                        
                      </div>
                      </Evidence>)
                  })}
                  {evidences?.length>0 ?<SaveBtnFocused  onClick={savePost}>저장하기</SaveBtnFocused>: <SaveBtn onClick={alertPage2}>저장하기</SaveBtn>}
                </div>
    </Wrapper>
      </>
  )
}
const EvidenceText=styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 22px;
letter-spacing: -0.03m;
color: #767676;
// background:yellow;
margin-right:7px;
`
const Wrapper=styled.div`
    margin:0 auto;
    width:620px;
    background:white;
    border:1px solid #d3d3d3;
    color:#404040;
    padding:24px 50px;
    box-sizing:border-box;
    border-radius:20px;
    z-index:99999;
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
`

const ModalBg = styled.div`
  width:100%;
  height:100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index:9999;
  cursor: pointer;
`;


const FullInput = styled.input`
    width:100%;
    padding:10px 20px;
    background: #F5F6F8;
    border:none;
    border-radius:10px;
    box-sizing:border-box;
    &:focus{
        outline:none;
    }
    &::placeholder{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.03em;
        color: #767676;
    }
`



const TitleText=styled.p`
font-size:16px;
font-weight:700;
color: #191919;
margin:0;
padding:0;
margin:5px 0px;
cursor:pointer;
`
const SectionText=styled.div`
font-size:12px;
font-weight:400;
color: #505050;
margin-top:-10px;
`

const ExText=styled.div`
font-size:12px;
font-weight:400;
color: #505050;
margin-top:-10px;
margin-left:20px;
`



const Addbutton =styled.button`
width:80px;
height:40px;
margin-left:10px;
border: 1px solid #CED2D9;
border-radius: 8px;
color:#767676;
background:transparent;
font-size:14px;
line-height:30px;
font-weight:400;
    &:hover{
        border:1px solid #FF5912;
        color:#FF5912;
    }
`
const Evidence =styled.div`
    width:100%;
    padding:10px;
    background: #F5F6F8;
    border:none;
    border-radius:10px;
    box-sizing:border-box;
    margin:5px 0px;
`
const DeleteEvidence =styled.button`
width:60px;
height:30px;
border-radius:5px;
background:#FFEEE7;
color:#191919;
font-size:14px;
line-height:30px;
font-weight:400;
border:1px solid #F5F6F8;
`
const SaveBtn =styled.button`
cursor:pointer;
width:183px;
height:49px;
background:  #E8E9EC;
border-radius:12px;
color:#767676;
margin-top:30px;
margin-left:335px;
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 24px;
letter-spacing: -0.02em;
color: #767676;
`
const SaveBtnFocused =styled.button`
cursor:pointer;
width:183px;
height:49px;
border-radius:12px;
margin-top:30px;
margin-left:335px;
background:#FF5912;     
color:white;
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 24px;
letter-spacing: -0.02em;
    
`

export default SaveDebate