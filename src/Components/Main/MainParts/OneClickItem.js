import React,{ useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import {Grid, Text, Button, Image,IconButtons} from "../../../Elements/index";
import {actionCreators as mainActions} from "../../../redux/modules/main";
import OneClickImg from "../../../Assets/oneclicklogo.png"

const OneClickItem = (props) => {
    const dispatch = useDispatch();
    const id = props.oneClickId;
    const src= props.src;
    const title= props.oneClickTopic;
    const pros = props.agreeNum;
    const cons = props.oppoNum;
    const prosOrCons=props.oneClickState;
    const total = pros+cons;
    const [myState,setMyState]=useState(false);
    const [side, setSide] = useState(prosOrCons);
    const sideInfo = useSelector((state) => state.main.OneClickInfo);  

    useEffect(()=>{
        if(prosOrCons==1){
            setMyState(true)
        }else if(prosOrCons==2){
            setMyState(false);
        }else{
            setMyState(null)
        }
    },[prosOrCons])
    
    return(
        
        <ItemWrapper>
            <ItemBox>
                <LeftWrap>
                    <Image shape="rectangle" size="12px" width="30px" src={OneClickImg}/>
                    <TitleText> {title}</TitleText>
                </LeftWrap>
                <RightWrap>
                    <Grid  margin="0px 20px 0px 20px" display="flex" alignItems="center">
                        <IconButtons margin="0 0" people color="#767676" size="24" 
                        />
                        <TotalCnt>{total}</TotalCnt>
                    </Grid>
                        {myState==null?
                     <>
                     <Grid margin="0px 20px 0px 0px">
                     <ProsBtn onClick={()=>{ dispatch(mainActions.putOneClick(id, 1));}}>
                        <Grid display="flex" align-items="center" margin="12px 0px 0px 0px">
                            <IconButtons margin="0 0" happyFill color="#767676"/>
                            <BtnText>찬성</BtnText>
                        </Grid> 
                        <Grid margin="12px 0px 0px 0px">
                            <BtnNum>{pros}</BtnNum>
                        </Grid>
                    </ProsBtn>
             </Grid>
             <Grid> 
                 <ConsBtn onClick={()=>{
                             dispatch(mainActions.putOneClick(id, 2));}}>
                     <Grid display="flex" align-items="center" margin="12px 0px 0px 0px">
                         <IconButtons margin="0 0" unhappyFill color="#999999"/>
                         <BtnText>반대</BtnText>
                     </Grid> 
                     <Grid  margin="12px 0px 0px 0px">
                         <BtnNum>{cons}</BtnNum>
                     </Grid>
                 </ConsBtn>
                 </Grid>
                     </>    
                    :(myState?
                        <>
                            <Grid  margin="0px 20px 0px 0px">
                        <ProsProsBtn disabled={true}>
                            <Grid display="flex" align-items="center" margin="12px 0px 0px 0px">
                                <IconButtons margin="0 0" happyFill color="whit"/>
                                <BtnText>찬성</BtnText>
                            </Grid> 
                            <Grid  margin="12px 0px 0px 0px">
                                <BtnNum>{pros}</BtnNum>
                            </Grid>
                        </ProsProsBtn>
                    </Grid>
                    <Grid> 
                        <ConsBtn onClick={()=>{
                                    dispatch(mainActions.putOneClick(id, 2));
                                }}>
                            <Grid display="flex" align-items="center" margin="12px 0px 0px 0px">
                                <IconButtons margin="0 0" unhappyFill color="#8A4FFF"
                                 />
                                <BtnText>반대</BtnText>
                            </Grid> 
                            <Grid  margin="12px 0px 0px 0px">
                                <BtnNum>{cons}</BtnNum>
                            </Grid>
                        </ConsBtn>
                        </Grid>
                            </>
                        :<>
                            <Grid  margin="0px 20px 0px 0px">
                        <ProsBtn onClick={()=>{
                                    dispatch(mainActions.putOneClick(id, 1));
                                }}>
                            <Grid display="flex" align-items="center" margin="12px 0px 0px 0px">
                                <IconButtons margin="0 0" happyFill color="#FF5912" 
                                />
                                <BtnText>찬성</BtnText>
                            </Grid> 
                            <Grid  margin="12px 0px 0px 0px">
                                <BtnNum>{pros}</BtnNum>
                            </Grid>
                        </ProsBtn>
                    </Grid>
                    <Grid> 
                        <ConsConsBtn disabled={true}>
                            <Grid display="flex" align-items="center" margin="12px 0px 0px 0px">
                                <IconButtons margin="0 0" unhappyFill color="white"/>
                                <BtnText>반대</BtnText>
                            </Grid> 
                            <Grid  margin="12px 0px 0px 0px">
                                <BtnNum>{cons}</BtnNum>
                            </Grid>
                        </ConsConsBtn>
                    </Grid>
                            </>)
                    }
                      
                </RightWrap>
            </ItemBox>
        </ItemWrapper>
    )
}

export default OneClickItem;


const ItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding:0;
    border-bottom:1px solid #E8E9EC;
    &:last-child{
        border-bottom:none;
    }
`

const TitleText=styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 24px;
margin:12px;
margin-left:20px;
`
const ItemBox =styled.div`
    margin:0 auto;
    width:100%;
    height:86px;
    display:flex;
    padding:24px 40px;
    box-sizing:border-box;
    align-items:center;
    border-bottom:1px solid #E8E9EC;
    &:first-child{
        border-bottom:none;
    }
`
const TotalCnt = styled.p`
    font-size: 14px;
    padding-top: 18px;
    margin-left: 8px;
`

const ProsBtn =styled.div`
    padding:0px 13px 0 20px;
    box-sizing:border-box;
    width:138px;
    height:40px;
    border:1px solid #FF5912;   
    border-radius:10px;
    color:#FF5912;
    font-size:14px;
    font-weight:400;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
`
const ProsProsBtn =styled.div`
    padding:0px 13px 0 20px;
    box-sizing:border-box;
    width:138px;
    height:40px;
    border:1px solid #FF5912;   
    border-radius:10px;
    color:white;
    font-size:14px;
    font-weight:400;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    background:#FF5912;
`
const ConsBtn =styled.div`
    padding:0px 13px 0 20px;
    box-sizing:border-box;
    width:138px;
    height:40px;
    border:1px solid #8A4FFF;   
    border-radius:10px;
    color:#8A4FFF;
    font-size:14px;
    font-weight:400;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
`

const ConsConsBtn =styled.div`
    padding:0px 13px 0 20px;
    box-sizing:border-box;
    width:138px;
    height:40px;
    border:1px solid #8A4FFF;   
    border-radius:10px;
    color:white;
    font-size:14px;
    font-weight:400;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    background:#8A4FFF;
`


const LeftWrap = styled.div`
    width:67%;
    display:flex;
    align-items: center;
`

const RightWrap = styled.div`
    width: 33%;
    display:flex;
    align-items:center;
`

const BtnText = styled.p`
    width: 40px;
    line-height: 25px;
`

const BtnNum = styled.p`
    /* text */
    width: 35px;
    text-align:center;
    line-height: 24.5px;
`