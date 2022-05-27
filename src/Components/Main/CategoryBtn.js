import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Image, Text } from "../../Elements";
import { useHistory } from "react-router-dom";
import CatBtn from "../../Components/Main/MainParts/CatBtn";
const CategoryBtn = () => {
    return (
        <Grid height="100px" margin="50px 0px 95px 0px">
            <CatBtn/> 
        </Grid>
    )
}


export default CategoryBtn;