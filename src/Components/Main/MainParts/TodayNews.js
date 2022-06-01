import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import {Grid, Text, Image} from "../../../Elements/index";
import { ActionCreators as newsActions} from "../../../redux/modules/news";
import { AiFillCodeSandboxCircle } from 'react-icons/ai';
import index0 from "../../../Assets/news/index0.png"
import index1 from "../../../Assets/news/111.png"
import index2 from "../../../Assets/news/222.jpeg"
import index3 from "../../../Assets/news/index+3.png"
import mainPpImg from "../../../Assets/mainPpImg.png";

const TodayNews = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(newsActions.getNaverDB());
        dispatch(newsActions.getDebateDB());
        dispatch(newsActions.getCheilDB());
    }, []);

    const NaverInfo= useSelector((state) => state.news.NaverInfo);
    const DebateInfo= useSelector((state) => state.news.DebateInfo);
    const CheilInfo =useSelector((state)=>state.news.CheilInfo);
    //네이버 영역
    const NaverTitle = NaverInfo.title;
    const NaverContent = NaverInfo.content+NaverInfo.content2;
    const NaverUrl = NaverInfo.imgUrl;
    const NaverType = NaverInfo.type;
    const NaverLink = NaverInfo.articleUrl;
    //토론 영역
    const DebateTitle = DebateInfo.title;
    const DebateContent =DebateInfo.content+DebateInfo.content2;
    const DebateUrl =DebateInfo.imgUrl;
    const DebateType =DebateInfo.type;
    const DebateLink = DebateInfo.articleUrl;
    //제일 영역
    const CheilTitle = CheilInfo.title;
    const CheilContent =CheilInfo.content+CheilInfo.content2;
    const CheilUrl =CheilInfo.imgUrl;
    const CheilType =CheilInfo.type;
    const CheilLink = CheilInfo.articleUrl;

    const TestUrl = CheilLink;
    
    if(NaverInfo==null){
        return(<></>)
    }
    if(DebateInfo==null){
        return(<></>)
    }
    if(CheilInfo==null){
        return(<></>)
    }
   
    return(
        <Wrapper>
            <InfoWrap>
                {/* <Image shape="rectangle" width="60.22" src={mainPpImg}/> */}
                <Title>오늘의 위피치 뉴스</Title>
                <SubText>토론할 주제가 떠오르지 않는다면 요즘 어떤 토픽이 있는지 확인해보세요</SubText>
            </InfoWrap>
            <Grid width="1260px" height="1002px" margin="0 auto" borderRadius="30px" is_flex="true" flexDirection="row" alignItems="space-between" flexBasis="1,1">
                <Grid width="49.5%" height="1002px" position="relative" is_flex="true" flexDirection="column" alignitems="center">
                    <NewsSection>
                        <a href={NaverLink} style={{textDecoration:"none"}}>
                        <Container>
                            <CateText>{NaverType}</CateText>
                            <TitleText>{NaverTitle}</TitleText>
                            <ContentText>{NaverContent}</ContentText>
                        </Container>
                        <NaverImg src={index0}/>
                        </a>
                    </NewsSection>
                    <Grid height="185px" margin="15px 0" is_flex="true" flexDirection="row">
                        <KeySection>
                            <CateText>HOT KEYWORD</CateText>
                            <TagWrap>
                                <TitleText>#나노사회</TitleText>
                                <TitleText>#머니러시</TitleText>
                                <TitleText>#그래미</TitleText>
                                <TitleText>#친환경</TitleText>
                            </TagWrap>
                        </KeySection>
                        <TrendSection>
                            <Grid padding="10px 0px" width="100%">
                                <CateText>2022 TREND TOPIC</CateText>
                                {/* <TitleText>메타버스</TitleText> */}
                                <TrendText>
                                     가상, 초월을 의미하는 '메타'(meta)와 세계, 우주를 의미하는 '유니버스'(universe)를 합성한 신조어다.
                                </TrendText>
                            </Grid>
                        </TrendSection>
                    </Grid>
                    <Grid margin="0 10px" is_flex="true" flexDirection="row" flexBasis="1">
                        <PicWrap>
                            <a href="https://icee.snu.ac.kr/en/board/forumreport/view/7569">
                                <Image shape="rectangle" radius="30px" width="300px" height="100%" src={index1}/>
                            </a>
                        </PicWrap>
                        <PicWrap2>
                            <a href="https://mice.or.kr/bbs/board.php?bo_table=event&wr_id=78">
                                <Image shape="rectangle" radius="30px" width="300px" height="100%" src={index2}/>
                            </a>
                        </PicWrap2>
                    </Grid>
                </Grid>
                <Grid width="49.5%" height="1002px" position="relative">
                    <CheilSecction>
                        <a href={CheilLink} style={{textDecoration:"none"}}>
                            <CateText>{CheilType}</CateText>
                            <TitleText>{CheilTitle}</TitleText>
                            <ContentText>{CheilContent}</ContentText>
                        </a>
                    <MagazineWrap src={CheilUrl}/>
                    </CheilSecction>
                    <DebateSection>
                        <a href={DebateLink} style={{textDecoration:"none"}}>
                            <CateText>{DebateType}</CateText>
                            <TitleText>{DebateTitle}</TitleText>
                            <ContentText>{DebateContent}</ContentText>
                        </a>
                    </DebateSection>
                </Grid>
            </Grid>
        </Wrapper>
    )
}
const Wrapper=styled.div`
    width:1360px;
    margin:0 auto;
    margin-top:100px;
`

const Title =styled.div`
    color:#191919;
    font-size:30px;
    font-weight:700;
    font-style:normal;
    margin-bottom:10px;
    font-family:Roboto;
    color:#191919;
    margin-bottom:10px;
    text-align:center;
    margin-top:24px;
    letter-spacing: -0.03em;
`
const NewsSection=styled.div`
    width:618px;
    height:380px;
    margin:0 10px;
    border:1px solid #E8E9EC;
    border-radius:30px;
    padding:40px 60px;
    box-sizing:border-box;
    align-items:center;
    position:relative;
    /* overflow:hidden; */
    text-overflow: ellipsis;
    :hover{
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        transition: box-shadow 0.3s ease-in-out;
    }
`

const TagWrap = styled.div`
    margin: 15px auto ;
    width: 222px;
    height: 81px;
    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
    justify-content: space-around;
`

const NaverImg = styled.img` 
    position:absolute;
    bottom:25px;
    right:25px;             
    width: 335px;
    height: 252px;
    z-index:-1;
`
const TrendSection=styled.div`
    margin:0 0 0 10px;
    border:1px solid #E8E9EC;
    border-radius:30px;
    padding:20px 40px;
    box-sizing:border-box;
    height:185px;
    width:300px;
    :hover{
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        transition: box-shadow 0.3s ease-in-out;
    }
`
const KeySection=styled.div`
    width:300px;
    height:185px;
    margin:0 10px 0 0;
    border:1px solid #E8E9EC;
    border-radius:30px;
    padding:30px 40px;
    box-sizing:border-box;
    :hover{
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        transition: box-shadow 0.3s ease-in-out;
    }
`
const MagazineWrap = styled.img`
    width:100%;
    height:378px;
    position:absolute;
    top:315px;
    left: 0px;
    border-radius:0px 0px 30px 30px;
    border: none;
` 
const CheilSecction=styled.div`
    width:100%;
    height:690px;
    border-radius:30px;
    border:1px solid #E8E9EC;
    padding:40px 60px;
    box-sizing:border-box;
    :hover{
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        transition: box-shadow 0.3s ease-in-out;
    }
`

const DebateSection =styled.div`
height:29%;
margin:20px 0 0 0;
align-items:center;
border-radius:30px;
border:1px solid #E8E9EC;
padding:40px 60px;
box-sizing:border-box;
:hover{
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    transition: box-shadow 0.3s ease-in-out;
    }

`
const Container =styled.div`
    width:250px;
    max-height:300px;
`

const CateText=styled.p`
    font-weight:700;
    margin-bottom: 10px;
    font-size:16px;
    color:#FF5912;
    font-family:"Rotobo";
`
const SubText =styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 24px;
letter-spacing: -0.03em;
    color:#505050;
    margin-bottom:50px;
    text-align:center;
`
const TitleText=styled.p`
    font-weight:700;
    font-size:20px;
    color:#505050;
    margin: 0 1px;
`
const ContentText=styled.div`
    height:150px;
    font-weight:400;
    font-size:14px;
    color:#767676;
    max-width:100%;
    overflow: hidden;
    text-overflow:ellipsis;
    display: -webkit-box !important;
    -webkit-line-clamp:7;
    -webkit-box-orient: vertical;
    white-space: wrap;
    margin-top:13px;
`

const TrendText=styled.div`
    height:150px;
    font-weight:400;
    font-size:14px;
    color:#767676;
    max-width:100%;
    overflow: hidden;
    text-overflow:ellipsis;
    display: -webkit-box !important;
    -webkit-line-clamp:7;
    -webkit-box-orient: vertical;
    white-space: wrap;
    margin-top:17px;
`
const InfoWrap = styled.div`
    display:flex;
    flex-direction:column;
    /* justify-content: center; */
    align-items: center;
    margin-bottom:-7px;
`
const PicWrap = styled.div`
    width: 300px;
    height: 98.5%;
    margin:0 10px 0 0;
    border:1px solid #E8E9EC;
    border-radius:30px;
    :hover{
        box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;
        transition: box-shadow 0.3s ease-in-out;
    }
`
const PicWrap2 = styled.div`
    width: 300px;
    height: 98.5%;
    margin:0 10px 0 13px;
    border:1px solid #E8E9EC;
    border-radius:30px;
    :hover{
        box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;
        transition: box-shadow 0.3s ease-in-out;
    }
`

export default TodayNews;

