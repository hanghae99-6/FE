import React from 'react';
import Debate2 from './Debate2';
import {SpinnerCircular} from "spinners-react";
import { RiDivideLine } from 'react-icons/ri';
import styled from "styled-components";

const Post2 = ({ post2, loading }) => {
  if (loading) {

    return (
      <div style={{position:"fixed", top:"50%",left:"50%",transform:"translateX(-50%)"}}>
          <SpinnerCircular color ="#FF5912" size="80"/>
      </div>
    );
  }

  return (
    <>
      {post2.map((item,index) => {
          return <Debate2 {...item} key={index}/>
      })}
    </>
  );
};


export default Post2;

