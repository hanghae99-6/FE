import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import '../../../Shared/App.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { actionCreators as mainActions} from "../../../redux/modules/main";
import PeachCard from "./PeachCard";
import styled from "styled-components";
import UserCheck from '../../../Pages/UserCheck';
import Main from '../../../Pages/Main';

const Slider=()=>{
  const history =useHistory();
  const dispatch = useDispatch();
  const MainInfo = useSelector((state) => state.main.MainInfo?state.main.MainInfo:null);

    useEffect(()=>{
      dispatch(mainActions.getMainInfoDB())
    },[])
  return(
              <Wrapper>
                {MainInfo?MainInfo.map((item,index)=>{
                return <PeachCard {...item} key={index}/>
                }):null}
            </Wrapper>
  )
}

const Wrapper=styled.div`
width:1260px;
margin:0px auto;
display: flex;
// background:yellow;
justify-content: space-between;
flex-wrap: wrap;
margin-top:-30px;

`


export default Slider;
