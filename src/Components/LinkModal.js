import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import IconButton from "../Elements/IconButtons";
import { CopyToClipboard } from 'react-copy-to-clipboard';


function LinkModal(props) {
    const location =useLocation().pathname;
    const link =`https://wepeech.com${location}` //링크 baseurl로 교체할 예쩡
    // const link=props.link
    const [isOpen, setIsOpen] = useState(true);

    const closeModal=()=>{
        setIsOpen(false);
        return<></>
    }
    const url = window.location.href;
   if(isOpen==true){
       return(
        <ModalBg>
            <DetailModal>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                        <Title>토론방 생성 완료!</Title>
                        <IconButton cancle color="black" size="20" _onClick={closeModal}/>
                    </div>
                <SubText>상대방에게 링크를 공유하세요</SubText>
                <CopyLink>
                    <SubText>{link}</SubText>
                        <CopyToClipboard text={url}>
                            <button style={{background:"none", display:"flex", marginRight:"-20px"}}>
                                <IconButton copy color="black"></IconButton>
                                <SubText>링크복사</SubText> 
                            </button>
                            
                        </CopyToClipboard>
                </CopyLink>
                
            </DetailModal>
        </ModalBg>
       )
   }else{
       return null;
   }

}
const ModalBg=styled.div`
width:100%;
height:100%;
background:rgba(0,0,0,0.6);
position:fixed;
z-index:100;
top:0;
left:0;
`
const DetailModal = styled.div`
  max-width: 773px;
  width: 773px;
  padding:50px 50px;
  box-sizing:border-box;
  background: white;
  height:216px;
  border-radius:20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction:column;
  z-index: 105;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
`;
const Text=styled.div`
width:100%;
font-size:12px;
padding:3px 0px;
`
const Title=styled.div`
font-size:18px;
color:black;
font-weight:500;
`
const SubText =styled.div`
font-size:14px;
color:#777777;
font-weight:400;
`
const CopyLink=styled.div`
width:100%;
height:56px;
background:#f5f5f5;
display:flex;
padding:20px 20px;
box-sizing:border-box;
align-items:center;
justify-content:space-between;
 button{
     width:auto;
 }
`
export default LinkModal;