import React,{useState} from 'react'
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import { ActionCreators as RoomActions} from "../redux/modules/room";
import IconButton from "../Elements/IconButtons";
import Grid from "../Elements/Grid";
import {DropDown,DropDown2,DropDown3} from "../Components/DropDown";
import {useHistory} from "react-router-dom";
import Main from "./Main";


const CreateDebate = (props) => {
    const [disabled, setDisabled] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();
    //방 생성 키를 받을떄 전달할 6가지 데이터들
    const [topic,setTopic]=useState('');//1) 주제 입력
    const [categoryName,setCategoryName]=useState('')
    const [prosName,setPros]=useState('');//3) 첫번째 유저 입력
    const [consName,setCons]=useState('');//4) 두번째 유저 입력
    const [content,setContent]=useState('');//5)추가 해야 할 부분(배경 설명// 선택으로 감?)
    //방생성하기 버튼 클릭 시 실행
    const goDebate=()=>{
        dispatch(RoomActions.createRoomDB(topic,categoryName,prosName,consName,content));
    }
    const contentLength=content.length;
    const clear=()=>{
        setTopic("");
        setCategoryName("");
        setPros("");
        setCons("");
        setContent("");
    }
    const goMain=()=>{
        history.push("/");    
    };
  return (
      <>
      <Main/>
       
        <ModalBg/>
            <Wrapper>
                <div style={{display:"flex", alignItems:"center"}}>
                    <IconButton cancle color="#d3d3d3" size="20" _onClick={goMain}/>
                    <div style={{marginLeft:"50%", transform:"translateX(-65%)"}}>
                        <TitleText>토론방 생성하기</TitleText>
                    </div>
                </div>
                    <SectionText>토론주제</SectionText>
                    <DropDown setCategoryName={setCategoryName}>{categoryName}</DropDown>
                <div style={{marginTop:"10px"}}>
                    <FullInput maxLength ={100} value={topic} onChange={(e) => {setTopic(e.target.value)}} placeholder="평서문으로 토론주제를 입력해주세요"/>
                    <ExText>예)살인죄의 공소시효는 폐지되어야 한다(최대 100자)</ExText>
                </div>
                <div style={{marginTop:"30px", display:"flex", flexDirection:"column"}}>
                    <SectionText>토론자 이메일(카카오톡 로그인 아이디)</SectionText>
                    <div>
                        <EmailInput maxLength={30} value={prosName} onChange={(e) => {setPros(e.target.value)}} placeholder="찬성측 이메일을 입력해주세요"/>
                    </div>                
                   <div style={{marginTop:"10px"}}>
                        <EmailInput maxLength={30} value={consName} onChange={(e) => {setCons(e.target.value)}} placeholder="반대측 이메일을 입력해주세요"/>
                   </div>
                    
                </div>
                <div style={{marginTop:"30px"}}>
                    <SectionText>토론 내용(선택)</SectionText>
                    <TextAreaInput type="textarea" maxLength={700} value={content} rows={5} onChange={(e) => {setContent(e.target.value)}} placeholder="토론 참여 전 알고 있어야 하는 사항에 대해 입력해주세요(배경 지식, 관련 사례, 용어 등)"/>
                    <ExText>{contentLength}/700자</ExText>
                </div>
                
                <hr/>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <TitleText onClick={clear}>초기화</TitleText>
                <CreateRoomBtn onClick={goDebate}>토론방 생성</CreateRoomBtn>
            </div>
    </Wrapper>
      </>
  )
}

const Wrapper=styled.div`
margin:0 auto;
background:white;
border:1px solid #d3d3d3;
color:#404040;
width:730px;
height:700px;
padding:24px 50px;
box-sizing:border-box;
border-radius:20px;
z-index:105;
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
  z-index: 100;
  cursor: pointer;
`;
const AutoInput=styled.input`
width:auto;
padding:10px;
background: #F5F6F8;
color:#404040;
border:none;
border-radius:10px;
`

const FullInput = styled.input`
    width:100%;
    padding:10px;
    background: #F5F6F8;
    border:none;
    border-radius:10px;
    box-sizing:border-box;
    &:focus{
        outline:none;
    }
`
    


const EmailInput=styled.input`
width:40%;
padding:10px;
background: #F5F6F8;
border:none;
border-radius:10px;
box-sizing:border-box;
    &:focus{
        outline:none;
    }
`
const TextAreaInput=styled.textarea`
width:100%;
padding:10px;
background: #F5F6F8;
border:none;
border-radius:10px;
box-sizing:border-box;
overflow-y:scroll;
resize:none;
    &:focus{
        outline:none;
    }
`
const CreateRoomBtn=styled.div`
width:237px;
height:48px;
padding:10px;
background:#E8E9EC;
border-radius:10px;
text-align:center;
cursor:pointer;
&:hover {
    background:#FF5912;
    color: white;
}
`

const ExText=styled.p`
font-size:12px;
font-weight:400;
color: #949494;
margin:5px 0px;
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
margin:0;
padding:0;
margin:5px 0px;

`


export default CreateDebate;