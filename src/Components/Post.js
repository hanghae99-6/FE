import React from 'react';
import { Grid } from "../Elements/index";
import Debate from './Debate';
import {SpinnerCircular} from "spinners-react";
import styled from "styled-components";
import "../Shared/App.css"


const Posts = ({ posts, loading }) => {
  if (loading) {
    return  (<div style={{position:"fixed", top:"50%",left:"50%",transform:"translateX(0%)"}}>
            <SpinnerCircular color ="#FF5912" size="80"/>
            </div>)
  }

  return (
    <>
      {posts.map((item,index) => {
          return <Debate {...item} key={index}/>
      })}

    </>
   
  );
};





export default Posts;

