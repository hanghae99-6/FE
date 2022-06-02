import React, {useEffect}from 'react';
import styled from "styled-components";
import { ActionCreators as liveActions } from "../redux/modules/livenow";
import { useDispatch,useSelector } from 'react-redux';
import LiveRoomItem from './LiveRoomItem';

import eventBanner2 from "../Assets/event banner2.png"

const Livenow =() =>{
const dispatch =useDispatch();
const liverooms =useSelector((state)=>state?.livenow?.liverooms[0])

useEffect(()=>{
    dispatch(liveActions.getLiveRoomtDB())
},[])
  return (
    <Wrapper>
        <Banner2>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSf1CkE0xfazapP6S-0G6O2Pbd-R8FvSkRhsabwF3hnnoANLpQ/viewform?vc=0&c=0&w=1&flr=0">
            <Image2 src={eventBanner2}/>
          </a>
        </Banner2>
        <Title>LIVE NOW</Title>
        <SubTitle>실시간으로 진행 중인 토론방에 들어가서 채팅에 참여해보세요!</SubTitle>
        <CardsWrapper>
          {liverooms?.length==0&&<div>현재 진행중인 토론방이 없습니다</div>}
          {liverooms?liverooms.map((item,index)=>{
                  return <LiveRoomItem {...item} key={index}/>
                  }):null}
        </CardsWrapper>
    </Wrapper>
  )
}



const Banner2 = styled.div`
  height: 181px;
  background-color:#FDFAEB;
  width: 100%;
  margin: 71.99px auto 68px;
  display: flex;
  /* align-items: center; */
  justify-content: center;
`
const Title = styled.p`
  letter-spacing: -0.03em;
  font-family: "Roboto";
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  `
const SubTitle = styled.p`
  letter-spacing: -0.03em;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 18px;
  text-align: center;
`

const Image2 = styled.img`
  width: 1920px;
  margin: 0 auto;
`
const Wrapper=styled.div`
margin-bottom: 200px;
`
const CardsWrapper=styled.div`
width:1260px;
margin:45px auto 0px;
display: flex;
flex-wrap: wrap;
`


export default Livenow