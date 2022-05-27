import React, { useState, useEffect} from 'react';
import Post3 from '../Components/Post3';
import Pagination from '../Components/Pagination';
import '../Shared/App.css';
import "../../src/Shared/App.css";
import { useSelector, useDispatch} from "react-redux";
import { ActionCreators as commentActions } from '../redux/modules/comment';
import styled from "styled-components";


const CommentList = (props) => {
  const dispatch=useDispatch();
  const debateId= props.debateId;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const commentList=useSelector((state)=>state.comment.commentList);
  const comments=useSelector((state)=>state.comment);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  useEffect(()=>{
    setPosts(commentList);
  },[commentList])

  useEffect(() => {
    dispatch(commentActions.getCommentDB(debateId));
  }, []);

    if(commentList.length==0){
      return(<></>)
    }else{
      return(
        <div style={{margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center"}}>
        <Wrapper>
          <Post3 post3 ={currentPosts} loading={loading} />
        </Wrapper>
        <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      )
    }


};
export default CommentList;

const Wrapper=styled.div`
width:1150px;
border: 2px solid #E8E9EC;
border-radius: 24px;
margin:0
`