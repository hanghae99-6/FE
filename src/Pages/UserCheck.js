import React,{useState,useEffect} from 'react';
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { ActionCreators as RoomActions} from "../redux/modules/room";
import jwt_decode from "jwt-decode";
import {SpinnerCircular} from "spinners-react";

const UserCheck = (props) =>{

const userInfo= jwt_decode(document.cookie)?jwt_decode(document.cookie):null; 
const userEmail = userInfo.EMAIL;
const location=useLocation;
const sessionId=props.location.pathname.split(`/userCheck/`)[1];
const [userName,setUserName]=useState("")
const dispatch =useDispatch();

useEffect(()=>{
  dispatch(RoomActions.roomCheckDB(sessionId))
},[])
  

  return (
    <Wrapper>
        <div style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,0%)"}}>
        <SpinnerCircular color ="#FF5912" size="80"/>
        </div>
    </Wrapper>
    
  )
}
const Wrapper=styled.div`
background:yellow;
max-width:1260px;
margin:0 auto;
margin-top:300px;
position:relative;
`

export default UserCheck;