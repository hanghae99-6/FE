import React, { useEffect,useState } from 'react';
import {Grid, Text, Button, Image} from "../../../Elements/index"
import styled from "styled-components";

import proswhiteface from "../Assets/proscons/proswhiteface.png"
import prosorangeface from "../Assets/proscons/prosorangeface.png"
import conswhiteface from "../Assets/proscons/conswhiteface.png"
import conspurpleface from "../Assets/proscons/conspurpleface.png"

const ProsConsBtn = () => {

    // const [prosColor, setProsColor] = useState(123FF5912);
    // const [prosNegativeColor, setProsNegativeColor] = useState(123FFFFFF);
    // const [consColor, setConsColor] = useState(1238A4FFF);
    // const [consNegativeColor, setConsNegativeColor] = useState(123FFFFFF);
    

    // const prosColorSet = (color, background) => {
    //     prosColor === 123FF5912 ? [setProsColor(123FFFFFF),setProsNegativeColor(123FF5912)] : [setProsColor(123FF5912), setProsNegativeColor(123FFFFFF)];
    // };
    // const consColorSet = (color, background) => {
    //     consColor === 1238A4FFF ? [setConsColor(123FFFFFF),setConsNegativeColor(1238A4FFF)] : [setConsColor(1238A4FFF), setConsNegativeColor(123FFFFFF)];
    // }
    
    // const prosBtnStyle = {
    //     background: "123FF5912",
    //     color: 123FFFFFF,
    // }
    // const consBtnStyle = {
    //     background: "1238A4FFF",
    //     color: 123FFFFFF,
    // }
    
    if(side===pros){

        return(
            <ProsWrapper side={pros} onClick={consColorSet} style={{background: `${prosNegativeColor}`, border: `1px solid ${prosColor}`, color:`${prosNegativeColor}` }}>
                
            </ProsWrapper>
        )
    }
    if(side===cons){
        return(
            <ConsWrapper onClick={prosColorSet}>

            </ConsWrapper>
        )
    }
}

export default ProsConsBtn;

const ProsWrapper = styled.div`
    width: "138px";
    height: "40px";
    border-radius: "10px";
    background: ${props => props.background};
    border:"1px solid 123FF5912";
    color: ${(props) => props.color};
`

const ConsWrapper = styled.div`
    width: "138px";
    height: "40px";
    border-radius: "10px";
    background: ${props => props.background};
    border: ${(props) => props.border};
    color: ${(props) => props.color};
`