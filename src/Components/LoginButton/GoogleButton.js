import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from "styled-components";

const clientId = "OAuth Web Client ID";

const GoogleLoginButton= ({ onSocial }) => {
    const onSuccess = async(response) => {
    const { googleId, profileObj : { email, name } } = response;
    
    await onSocial({
        socialId : googleId,
        socialType : 'google',
        email,
        nickname : name
    });
}
    const onFailure = (error) => {
        console.log(error);
    }

    return(
            <GoogleLogin
                // clientId={clientId}
                disabledStyle={{opacity: 1}}
                responseType={"id_token"}
                buttonText="signin with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                width={220}
                height={40}
                theme="light"
                 // 구글 버튼 커스텀
                render={(renderProps) => (
                    <GoogleButton onClick={renderProps.onClick}>
                      <GoogleWrapper>
                        <GoogleLogo src={google} />
                        <GoogleText>구글로 계속하기</GoogleText>
                      </GoogleWrapper>
                    </GoogleButton>
                    )}
                />
    )
}

export default GoogleLoginButton;

const GoogleButton = styled.button`
    width: 384px;
    height: 45px;
    box-shadow: none;
    border-radius: 5px;
`
const GoogleWrapper = styled.div`
    width: 100%;
`
const GoogleLogo = styled.img`
    width: 384px;
`
const GoogleText = styled.p`

`