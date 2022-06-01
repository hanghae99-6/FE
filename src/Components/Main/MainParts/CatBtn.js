import React, { useState,useEffect } from 'react';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { Grid, Image, Text } from "../../../Elements/index";
import "../../../Shared/App.css";
import {actionCreators as mainActions} from "../../../redux/modules/main"
import { ReactComponent as All} from "../../../Assets/catBtns/catgray/all.svg"
import { ReactComponent as Art} from "../../../Assets/catBtns/catgray/art.svg"
import { ReactComponent as Economy} from "../../../Assets/catBtns/catgray/economy.svg"
import { ReactComponent as Etc} from "../../../Assets/catBtns/catgray/etc.svg"
import { ReactComponent as Politics} from "../../../Assets/catBtns/catgray/politics.svg"
import { ReactComponent as Science } from "../../../Assets/catBtns/catgray/science.svg"
import { ReactComponent as Social } from "../../../Assets/catBtns/catgray/social.svg"
import { ReactComponent as World } from "../../../Assets/catBtns/catgray/world.svg"
import { ReactComponent as Daily } from "../../../Assets/catBtns/catgray/daily.svg"
    const CatBtn = () => {
        const dispatch = useDispatch();
        const [category,setCategory] =useState("전체")
        useEffect(()=>{
            dispatch(mainActions.changeCatName(category))
        },[category])
        return(
            <Grid width="1200px" height="100px" margin="0 auto" is_flex="true" flexDirection="row" alignItems="center" line-height="300px">
                <CategoryBox onClick={()=>(setCategory("전체"))}>
                    {category==="전체"?  <Grid width="50px" height="50px" cursor="pocinter"><All className="All" fill="#FF5912"/></Grid>:<Grid width="50px" height="50px" cursor="pocinter"><All className="All" fill="#B8BBC6"/></Grid>}
                    <CategoryText>전체</CategoryText>
                </CategoryBox>
                <CategoryBox onClick={()=>(setCategory("정치"))}>
                    {category==="정치"?  <Grid width="50px" height="50px" cursor="pocinter"><Politics className="Politics" fill="#FF5912"/></Grid>: <Grid width="50px" height="50px" cursor="pocinter"><Politics className="Politics" fill="#B8BBC6"/></Grid>}
                    <CategoryText>정치</CategoryText>
                </CategoryBox>
                <CategoryBox onClick={()=>(setCategory("경제"))}>
                    {category==="경제"?  <Grid width="50px" height="50px" cursor="pocinter"><Economy className="Economics" fill="#FF5912"/></Grid>:<Grid width="50px" height="50px" cursor="pocinter"><Economy className="Economics" fill="#B8BBC6"/></Grid>}
                    <CategoryText>경제</CategoryText>
                </CategoryBox>
                <CategoryBox onClick={()=>(setCategory("사회"))}>
                    {category==="사회"?  <Grid width="50px" height="50px" cursor="pocinter"><Social className="Social" fill="#FF5912"/></Grid>:<Grid width="50px" height="50px" cursor="pocinter"><Social className="Social" fill="#B8BBC6"/></Grid>}
                    <CategoryText>사회</CategoryText>
                </CategoryBox>
                <CategoryBox onClick={()=>(setCategory("일상"))}>
                    {category==="일상"?  <Grid width="50px" height="50px" cursor="pocinter"><Daily className="Daily" fill="#FF5912"/></Grid>:<Grid width="50px" height="50px" cursor="pocinter"><Daily className="Daily" fill="#B8BBC6"/></Grid>}
                    <CategoryText>일상</CategoryText>
                </CategoryBox>
                <CategoryBox onClick={()=>(setCategory("문화예술"))}>
                    {category==="문화예술"?  <Grid width="50px" height="50px" cursor="pocinter"><Art className="Art" fill="#FF5912"/></Grid>:<Grid width="50px" height="50px" cursor="pocinter"><Art className="Art" fill="#B8BBC6"/></Grid>}
                    <CategoryText>문화예술</CategoryText>
                </CategoryBox>
                <CategoryBox onClick={()=>(setCategory("해외토픽"))}>
                    {category==="해외토픽"?  <Grid width="50px" height="50px" cursor="pocinter"><World  className="World" fill="#FF5912"/></Grid>:<Grid width="50px" height="50px" cursor="pocinter"><World  className="World" fill="#B8BBC6"/></Grid>}
                    <CategoryText>해외토픽</CategoryText>
                </CategoryBox>
                <CategoryBox onClick={()=>(setCategory("IT과학"))}>
                    {category==="IT과학"?  <Grid width="50px" height="50px" cursor="pocinter"><Science  className="Science" fill="#FF5912"/></Grid>:<Grid width="50px" height="50px" cursor="pocinter"><Science className="Science" fill="#B8BBC6"/></Grid>}
                    <CategoryText>IT/과학</CategoryText>
                </CategoryBox>
                <CategoryBox onClick={()=>(setCategory("기타"))}>
                    {category==="기타"?  <Grid width="50px" height="50px" cursor="pocinter"><Etc className="Etc" fill="#FF5912"/></Grid>: <Grid width="50px" height="50px" cursor="pocinter"><Etc className="Etc" fill="#B8BBC6"/></Grid>}
                    <CategoryText>기타</CategoryText>
                </CategoryBox>
            </Grid>
        )

}

const CategoryText=styled.div`
font-weight:400;
font-size:14px;
font-family:Roboto;
margin-top:17px;
font-family:Roboto;
`
const CategoryBox=styled.div`
text-align:center;
cursor:pointer;
`

export default CatBtn;




// {btnArr.map((item,index)=>{
//     return  (
//         <BtnWrap onClick={()=>{soltByCatName(item.name)}} {...item} key= {index}>
//             <svg src={item.src} style={{width:"50px",height:"50px",hover:{fill:"red"}}}/>
//             <Text width="100px" textAlign="center">{btnArr[index].name}</Text>
//         </BtnWrap>
//     )})}