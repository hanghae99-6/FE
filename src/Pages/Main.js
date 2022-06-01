import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { actionCreators as mainAction} from "../redux/modules/main";
import styled from "styled-components"

//컴포넌트 추가
import MainSection from "../Components/Main/MainSection";
import CategoryBtn from "../Components/Main/CategoryBtn";
import HotPeech from "../Components/Main/HotPeech";
import OneClick from  "../Components/Main/OneClick";
import TodayNews from "../Components/Main/MainParts/TodayNews";
import MainBottom from "../Components/Main/MainBottom";
import banner1 from "../Assets/Group 398.png"

//이벤트 배너
import eventBanner2 from "../Assets/event banner2.png"

const Main = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(mainAction.getMainInfoDB());
    }, []);
    const newMainInfo = useSelector((state) => state.main.MainInfo);
  return (
    <Wrapper>
      <MainSection/>
      {/* <CategoryBtn/> */}
      <Banner>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSf1CkE0xfazapP6S-0G6O2Pbd-R8FvSkRhsabwF3hnnoANLpQ/viewform?vc=0&c=0&w=1&flr=0">
          <Image src={banner1} />
        </a>
      </Banner>
      <HotPeech/>
      <OneClick/>
      <Banner2>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSf1CkE0xfazapP6S-0G6O2Pbd-R8FvSkRhsabwF3hnnoANLpQ/viewform?vc=0&c=0&w=1&flr=0">
          <Image2 src={eventBanner2}/>
        </a>
      </Banner2>
      <TodayNews/>
      <MainBottom/>
    </Wrapper>
  )
}

const Wrapper=styled.div`
overflow:hidden;
min-width: 1045px;
width:100%;
margin:0 auto 80px;
overflow: hidden;
`
const Banner=styled.div`
width:100%;
height:100px;
background:#FDFAEB;
position:fixed;
left: 50%;
bottom: 0;
transform: translateX(-50%);
z-index:50;
`
const Image =styled.img`
margin:0 auto;
max-width:1920px;
min-width:1920px;
height:100px;
position:absolute;
top:0;
left:50%;
transform:translateX(-50%);
`

export default Main;

const Banner2 = styled.div`
  height: 181px;
  background-color:#FDFAEB;
  width: 100%;
  margin: 120px auto 0;
  display: flex;
  /* align-items: center; */
  justify-content: center;
`

const Image2 = styled.img`
  /* height: 100%; */
  width: 1920px;
  /* width: 100%; */
  margin: 0 auto;
`