import React from 'react';
import {Grid} from "../../../Elements/index";
import styled from "styled-components";

const ProgressBar = (props) => {
    return(
        <ProgressWrapper>
            <Grid
            width="100%"
            height="13px"
            is_flex="true"
            alignItems="center"
            justifyContent="center"
            alignSelf="center"
            >
                <Grid
                height="12px"
                bg="#FF5912"
                opacity="1"
                zIndex="2"
                width="70%"
                // borderRadius="60px"
                >

                </Grid>
                <Grid
                height="12px"
                bg="#8A4FFF"
                opacity="0.4"            
                zIndex="1"
                width="100%"
                // borderRadius=""
                >

                </Grid>
            </Grid>
        </ProgressWrapper>
        
    )
}
const ProgressWrapper=styled.div`
width:100%;
background:yellow;
height:30px;
`

export default ProgressBar;