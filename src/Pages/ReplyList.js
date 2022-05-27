import React, { useState, useEffect } from 'react';
import Post2 from '../Components/Post2'
import Pagination from '../Components/Pagination';
import axios from 'axios';
import '../Shared/App.css';
import Cookies from "universal-cookie";
import "../../src/Shared/App.css";
import styled from "styled-components";


const ReplyList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  useEffect(() => {
    const fetchPosts = async () => {
      const cookies = new Cookies(); 
      const token = cookies.get("token");
      setLoading(true);
      const res = await axios.get('https://api.wepeech.com:8443/user/profile/myreply',{headers:{"Authorization":token}});
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
    <> 
    <div style={{margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <Wrapper>
        <Post2 post2={currentPosts} loading={loading} />
      </Wrapper>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      </div>
    </>
    
   
  );
};
const Wrapper=styled.div`
width:1051px;
border-radius:30px;
border:2px solid #F5F6F8;
padding:0px 20px 10px 20px;
box-sizing:border-box;
`
export default ReplyList;