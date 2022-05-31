import React, { useEffect } from 'react';
import Debate3 from './Debate3';
import {SpinnerCircular} from "spinners-react";
import { useSelector,useDispatch } from "react-redux";
import { ActionCreators as CommentAction} from '../redux/modules/comment';

const Post3 = ({ post3, loading }) => {
console.log(post3);
const dispatch =useDispatch();


  if (loading) {
    return <SpinnerCircular color ="#FF5912" size="80"/>;
  }

  return (
    <ul className='list-group mb-4'>
      {post3.map((item,index) => {
          return <Debate3 {...item} key={index}/>
      })}
    </ul>
  );
};

export default Post3;

