import React, {useEffect}from 'react';
import styled from "styled-components";
import { ActionCreators as liveActions } from "../redux/modules/livenow";
import { useDispatch,useSelector } from 'react-redux';
import LiveRoomItem from './LiveRoomItem';

const Livenow =() =>{
const dispatch =useDispatch();
const liverooms =useSelector((state)=>state?.livenow?.liverooms[0])

useEffect(()=>{
    dispatch(liveActions.getLiveRoomtDB())
},[])
  return (
    <Wrapper>
        {liverooms?.length==0&&<div>현재 진행중인 토론방이 없습니다</div>}
        {liverooms?liverooms.map((item,index)=>{
                return <LiveRoomItem {...item} key={index}/>
                }):null}
    </Wrapper>
  )
}
const Wrapper=styled.div`
width:1260px;
margin:10px auto;
display: flex;
flex-wrap: wrap;
margin-top:150px;
`


export default Livenow