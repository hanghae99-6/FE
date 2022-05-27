import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import { Grid,IconButtons } from "../Elements/index";
import {ActionCreators as Actions} from "../redux/modules/comment"



function CommentItem(props) {

    const dispatch = useDispatch();
    const [thumbs, setThumbs] = useState();

    const LikeHate = useSelector((state)=>state.comment.LikeHates);
    const status = LikeHate.likes.status;
    const nickname= props.user.nickName? props.user.nickName:null;
    const reply= props.reply? props.reply:null;
    const profile= props.user.profileImg? props.user.profileImg:null;
    const id = props.replyId;
    const like = 1;
    const hate = 2;

    const postLikeHates = (status) => {
        dispatch(Actions.postLikeHates(id,status));
    }

    useEffect(()=>{
        if(status==1){
            setThumbs(true);
        }else if(status==2){
            setThumbs(false);
        } else{
            setThumbs(null);
        }
    },[status]);
    return (
        <Wrapper>
            <UserSection>
                <ProsTag>찬성</ProsTag>
                <ConsTag>반대</ConsTag>
                <Profile src={profile}/>
                <User>
                    <Nickname>{nickname}</Nickname>
                    <Comment>{reply}</Comment>
                </User>
            </UserSection>
        {thumbs==null?
        <ButtonSection>
            <LikeButton>
                <IconButtons _onClick={()=>{postLikeHates(like)}} good color="white" size="14"/>
                <Signal>{props.likesCnt?props.likesCnt:0}</Signal>
            </LikeButton>
            <HateButton>
                <IconButtons _onClick={()=>{postLikeHates(hate)}} bad color="white" size="14"/>
                <Signal>{props.badCnt?props.badCnt:0}</Signal>
            </HateButton>
        </ButtonSection>
        :(thumbs?
        <ButtonSection>
            <LikeButton>
                <IconButtons good color="black" size="14"/>
                <Signal>{props.likesCnt?props.likesCnt:0}</Signal>
            </LikeButton>
            <HateButton>
                <IconButtons _onClick={()=>{postLikeHates(hate)}} bad color="white" size="14"/>
                <Signal>{props.badCnt?props.badCnt:0}</Signal>
            </HateButton>
        </ButtonSection>
        :
        <ButtonSection>
            <LikeButton>
                <IconButtons _onClick={()=>{postLikeHates(like)}} good color="white" size="14"/>
                <Signal>{props.likesCnt?props.likesCnt:0}</Signal>
            </LikeButton>
            <HateButton>
                <IconButtons bad color="black" size="14"/>
                <Signal>{props.badCnt?props.badCnt:0}</Signal>
            </HateButton>
        </ButtonSection>
        )}
        </Wrapper>
    )
}





const Wrapper=styled.div`
width:100%;
padding:33px;
box-sizing:border-box;
border-bottom:1px solid #AEAEAE;
display:flex;
align-items:top;
`
const UserSection=styled.div`
    display: flex;
    justify-content: space-between;
    align-items:top;
`
const User = styled.div`
    margin: 0px 10px;
`
const ButtonSection=styled.div`
    display:flex;
    justify-content: space-between;
    align-items:center;
    width:150px;
`
const LikeButton=styled.div`
    display:flex;
    justify-content: space-between;
    `
const HateButton=styled.div`
    display:flex;
    justify-content: space-between;
`

const Profile=styled.img`
width:40px;
height:40px;
border-radius:50%;
`
const Nickname=styled.div`
font-size:14px;
font-weight:500;
`
const Comment=styled.div`
font-size:14px;
font-weight:300;
`
const Signal=styled.div`
margin-left:10px;
font-size:16px;
font-weight:500;
`


export default CommentItem;