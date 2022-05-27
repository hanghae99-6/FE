import React from 'react';
import styled from 'styled-components';

function DebateNotice() {
  return (
    <Wrapper>
            <Title>이런 점은<br/>지켜주세요</Title>
                <NoticeContents>
                    <Text>•  토론주제의 핵심에서 벗어나는 이야기는 삼가해 주시고, 상대방의 의견을 끝까지 경청해주시기 바랍니다.</Text>
                    <Text>•  자신의 주장을 뒷받침하는 근거를 제시해야 합니다. (최대3가지)</Text>
                </NoticeContents>
    </Wrapper>
  )
}

const Wrapper=styled.div`
width:950px;
display:flex;

`
const Title=styled.div`
width:150px;
font-weight:700;
font-size:16px;
padding:10px 70px 10px 0px;
box-sizing:border-box;
color:#191919;
`
const NoticeContents=styled.div`
width:811px;
height:100px;
background:#F5F6F8;
border-radius:16px;
padding:20px;
box-sizing:border-box;
`
const Debaters=styled.div`
width:100%;
// background:green;
display:flex;
align-items:top;
`
const Text=styled.p`
font-size:14px;
color:#191919;
margin:5px 10px 0px 0px;
`
const SubText=styled.div`
color:#767676;
font-size:14px;
margin-right:10px;
`
const Pannels=styled.div`
width:100%;
display:flex;
align-items:top;
`

export default DebateNotice;