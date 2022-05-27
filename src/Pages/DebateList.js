import React, { useState, useEffect } from 'react';
import {Grid,IconButtons }from "../Elements/index";
import Posts from '../Components/Post'
import Pagination from '../Components/Pagination';
import axios from 'axios';
import Cookies from "universal-cookie";
import "../../src/Shared/App.css";
import styled from 'styled-components';


const DebateList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const fetchPosts = async () => {
      const cookies = new Cookies(); 
      const token = cookies.get("token");
      setLoading(true);
      const res = await axios.get('https://api.wepeech.com:8443/user/profile/mydebate',{headers:{"Authorization":token}});
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    
  <div style={{margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center"}}>
  <Wrapper>
       <Header>
        <Grid width="10%"  display="flex" alignItems="top" justifyContent="center">
        <HeaderText>카테고리</HeaderText>
       </Grid>
       <Grid width="7.5%" display="flex" alignItems="top" justifyContent="center">
        <HeaderText>찬성</HeaderText>
       </Grid>
       <Grid width="45%"  display="flex" alignItems="top" justifyContent="center">
        <HeaderText>토론제목</HeaderText>
       </Grid>
       <Grid  width="15%"  display="flex" alignItems="top" justifyContent="center">
        <HeaderText>투표</HeaderText>
       </Grid>
      <Grid width="7.5%"  display="flex" alignItems="top" justifyContent="center">
        <HeaderText>댓글</HeaderText>
      </Grid>
      <Grid width="15%"  display="flex" alignItems="top" justifyContent="center">
       <HeaderText>생성 날짜</HeaderText>
      </Grid>
     </Header>
      <Posts posts={currentPosts} loading={loading} />
    </Wrapper>
    <Pagination
    postsPerPage={postsPerPage}
    totalPosts={posts.length}
    paginate={paginate}
  />
  </div>
  );
};

const Wrapper=styled.div`
width:1051px;
border-radius:30px;
border:2px solid #F5F6F8 ;
box-sizing:border-box;

`
const Header=styled.div`
width:1049px;
background:#F5F6F8;
height:50px;
border-radius:28px 28px 0px 0px;
display:flex;
padding:0px 20px;
box-sizing:border-box;
`
const HeaderText=styled.div`
font-size:14px;
font-weight:400;
color:#505050;
margin-top:16px;
`
export default DebateList;