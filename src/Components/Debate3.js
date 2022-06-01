import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch} from "react-redux";
import Cookies from "universal-cookie";
import styled from "styled-components";
import { IconButtons,Grid, Input } from "../Elements/index";
import {ActionCreators as commentActions} from "../redux/modules/comment"
import baseProfile from "../Assets/kakaobase.png";
import jwt_decode from "jwt-decode";


function CommentItem(props) {
    const prosOrCons= props?.side?.typeNum;
    const createdAt=props.createdAt.split("T")[0];
    const dispatch = useDispatch();
    const [thumbs, setThumbs] = useState();
    const [pencil, setPencil] = useState(false);
    const [newComment, setNewComment] = useState("");
    const status = props.status;
    const nickname= props.user.nickName? props.user.nickName:null;
    // const comment = fixedReply? fixedReply: reply;
    const reply= props.reply? props.reply:null;
    const profile= props.user.profileImg=="null" ? baseProfile : props.user.profileImg;
    const id = props.replyId;
    const like = 1;
    const hate = 2;
    const cookies = new Cookies(); 
    const token = (document.cookie)? cookies.get("token"):null;
    
    const openToken = token? jwt_decode(token):"";
    const myEmail = openToken?.EMAIL;
    const isMe = props.user.email == myEmail? true : false ;

    const postLikeHates = (status) => {
        dispatch(commentActions.postLikeHates(id,status));
    };
    useEffect(()=>{
        if(status==1){
            setThumbs(true);
        }else if(status==2){
            setThumbs(false);
        } else{
            setThumbs(null);
        };
    },[status]);

    const deleteComment = (id) => {
        dispatch(commentActions.deleteComment(id));
    }
    const fixComment = (newComment) => {
        dispatch(commentActions.fixComments(newComment,id,prosOrCons));
        setPencil(false);
    }
    const pencilHandler = () => {
        if(pencil==false){
            setPencil(true);
        } else {
            setPencil(false);
        }
    }
    return (
        <Wrapper>
            <UserSection>
                {prosOrCons==1? <ProsTag>찬성</ProsTag>:<ConsTag>반대</ConsTag>}
                <Profile src={profile}/>
                <Nickname>{nickname}</Nickname>     
            </UserSection>
            <CommentSection>
                <CommentText>
                    {pencil==true?
                        <FixWrap>
                            <FixInput placeholder="댓글을 수정하세요" 
                            onChange={(e) => setNewComment(e.target.value)}
                            // onKeyPress={(e) => {if(e.key === "Enter"){setNewComment(e.target.value)}}}
                            type="text" name="sendinput"></FixInput>
                            <FixBtn onClick={()=>fixComment(newComment)}
                            >수정</FixBtn>
                            <FixBtn onClick={()=>{setPencil(false)}}>취소</FixBtn>
                        </FixWrap>
                        :
                        <Grid display="flex" justifyContent="space-between" position="relative" >
                            <Comment>{reply}</Comment>
                            {isMe&&
                                 <Grid display="flex" alignItems="center" justifyContent="space-between" width="66px" position="absolute" right="-80px"  >
                                        <IconBorder>
                                                <IconButtons size="16px" Pencil _onClick={()=>{setPencil(true)}} color="#C5C5C5"/>
                                        </IconBorder>
                                        <IconBorder>
                                                <IconButtons size="16px" trash _onClick={()=>{deleteComment(id)}} color="#C5C5C5"/>
                                        </IconBorder>
                                    </Grid>
                            }
                        </Grid>
                        
                    }
                    <Grid>
                        <DateText>
                            {createdAt}
                             {thumbs==null?
                            <ButtonSection>
                                <LikeButton>
                                    <IconButtons _onClick={()=>{postLikeHates(like)}} good color="#999999" size="14"/>
                                    <Signal>{props.likesCnt?props.likesCnt:0}</Signal>
                                </LikeButton>
                                <HateButton>
                                    <IconButtons _onClick={()=>{postLikeHates(hate)}} bad color="#999999" size="14"/>
                                    <Signal>{props.badCnt?props.badCnt:0}</Signal>
                                </HateButton>
                            </ButtonSection>
                            :
                            (thumbs?
                            <ButtonSection>
                                <LikeButton>
                                    <IconButtons good color="#FF5912" size="14"/>
                                    <Signal>{props.likesCnt?props.likesCnt:0}</Signal>
                                </LikeButton>
                                <HateButton>
                                    <IconButtons _onClick={()=>{postLikeHates(hate)}} bad color="#999999" size="14"/>
                                    <Signal>{props.badCnt?props.badCnt:0}</Signal>
                                </HateButton>
                            </ButtonSection>
                            :
                            <ButtonSection>
                                <LikeButton>
                                    <IconButtons _onClick={()=>{postLikeHates(like)}} good color="#999999" size="14"/>
                                    <Signal>{props.likesCnt?props.likesCnt:0}</Signal>
                                </LikeButton>
                                <HateButton>
                                    <IconButtons bad color="#8A4FFF" size="14"/>
                                    <Signal>{props.badCnt?props.badCnt:0}</Signal>
                                </HateButton>
                            </ButtonSection>
                            )}
                           
                        </ DateText>
                    </Grid>        
                </CommentText>
            </CommentSection>
        </Wrapper>
    )
}

const IconBorder=styled.div`
width:28px;
height:28px;
border:1px solid lightgrey;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;

`

const Wrapper=styled.div`
width:100%;
padding:44px 62px 0px 62px;
box-sizing:border-box;
display:flex;
flex-direction: column;
`
const UserSection=styled.div`
display: flex;
align-items:center;
`
const CommentSection =styled.div`
font-size:14px;
font-weight:340;
color:#191919;
max-width:870px;
margin:0 auto;
padding:10px 0px;
box-sizing:border-box;
`
const CommentText=styled.div`
font-size:14px;
font-weight:340;
color:#191919;
width:870px;
margin:0 auto;
box-sizing:border-box;
`
const DateText=styled.div`
color:#747474;
font-size:14px;
font-weight:400;
margin-top:10px;
display:flex;
align-items:center;
`
const ButtonSection=styled.div`
display:flex;
align-items:center;
margin-left:10px;
`
const Comment =styled.div`
max-width:860px;
min-width:500px;
// background:red;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
`
const LikeButton=styled.div`
display:flex;
justify-content: space-around;
`
const HateButton=styled.div`
display:flex;
justify-content: space-around;
margin-left:10px;
`
const Profile=styled.img`
width:40px;
height:40px;
border-radius:50%;
margin-right:8px;
`
const Nickname=styled.div`
font-size:14px;
font-weight:500;
text-align:left;
`

const Signal=styled.div`
margin-left:5px;
font-size:16px;
font-weight:500;
`

const ProsTag=styled.div`
width:54px;
height:30px;
text-align:center;
background:#FFEEE7;
color:#FF5912;
font-size:14px;
font-weight:400;
border-radius:16px;
line-height:30px;
margin-right:24px;
`
const ConsTag=styled.div`
width:54px;
height:30px;
text-align:center;
background:#F3EDFF;
color:#8A4FFF;
font-size:14px;
font-weight:400;
border-radius:16px;
line-height:30px;
margin-right:24px;
`
const FixWrap= styled.div`
display: flex;
flex-direction: row;

`
const FixInput= styled.textarea`
width: 800px;
padding: 10px 20px;
white-space: pre-line;
border : 1px solid lightgray;
border-radius: 15px;
outline: none;
resize: none;
:focus {
    border: solid 1.1px black;
  }
`
const FixBtn= styled.button`
margin-left:5px;
width: 40px;
height: 30px;
margin-top: 35px;
background-color:white;
outline: none;
:hover{
    border-bottom: solid 1px lightgray;
}
`


export default CommentItem;