import React, {useEffect}from 'react';
import styled from "styled-components";
import { ActionCreators as liveActions } from "../redux/modules/livenow";
import { useDispatch,useSelector } from 'react-redux';
import LiveRoomItem from './LiveRoomItem';

const Livenow =() =>{
const dispatch =useDispatch();
const liverooms =useSelector((state)=>state?.livenow?.liverooms[0])
console.log(liverooms);

useEffect(()=>{
    dispatch(liveActions.getLiveRoomtDB())
},[])

  return (
    <Wrapper>
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