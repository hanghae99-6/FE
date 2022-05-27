import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {Grid, Text, Image} from "../Elements/index";
import { ActionCreators as LoginAction } from "../redux/modules/login";

import LoadingImg from "../Assets/loadingImage.png";


// 로그인 성공 후 잠시 빈페이지
const KakaoIsLogin = () => {
    const dispatch = useDispatch();
    const code = new URL(window.location.href).searchParams.get("code");
    dispatch(LoginAction.KakaoLogin(code));

    return(
        <>
            <Grid
            border="1px solid lightgray"
            width="800px"
            height="520px"
            is_flex="true"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            margin="320px auto"
            borderRadius="40px"
            >
                <Image
                shape="rectangle"
                width="440px"
                src={LoadingImg}
                >
                </Image>
                <Text
                margin="30px 0 0 0"
                size="19px"
                >
                  로그인 시도 중 입니다.
                </Text>

            </Grid>
        </>
    )
}

export default KakaoIsLogin;