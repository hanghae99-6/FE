import React, { Component } from 'react';
import './ToolbarComponent.css';
import styled from "styled-components";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButtons from '../../Elements/IconButtons';

import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import SwitchVideoIcon from '@material-ui/icons/SwitchVideo';
import PictureInPicture from '@material-ui/icons/PictureInPicture';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Tooltip from '@material-ui/core/Tooltip';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';

import IconButton from '@material-ui/core/IconButton';

const logo = require('../../images/openvidu_logo.png');

export default class ToolbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { fullscreen: false };
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
    }


    micStatusChanged() {
        this.props.micStatusChanged();
    }

    camStatusChanged() {
        this.props.camStatusChanged();
    }

    screenShare() {
        this.props.screenShare();
    }

    stopScreenShare() {
        this.props.stopScreenShare();
    }

    toggleFullscreen() {
        this.setState({ fullscreen: !this.state.fullscreen });
        this.props.toggleFullscreen();
    }

    switchCamera() {
        this.props.switchCamera();
    }

    leaveSession() {
        this.props.leaveSession();
    }

    toggleChat() {
        this.props.toggleChat();
    }

    render() {
        const mySessionId = this.props.sessionId;
        const localUser = this.props.user;
        return (
                   <ButtonsWrapper>
                   <ButtonsContents>
                   <RoundBack>
                        <IconButton color="red" className="navButton" id="navMicButton" onClick={this.micStatusChanged}>
                            {localUser !== undefined && localUser.isAudioActive() ? 
                                (<IconButtons MicOn color="#FF5912" margin="-20px 0px 0px 0px" size="20"/>)
                            : 
                                (<IconButtons MicOff color="#999999" margin="-20px 0px 0px 0px" size="20"/>
                                )}
                        </IconButton>
                   </RoundBack>
                    <RoundBack>
                        <IconButton color="inherit" className="navButton" id="navCamButton" onClick={this.camStatusChanged}>
                            {localUser !== undefined && localUser.isVideoActive() ? (
                                <IconButtons VideoOn color="#FF5912" margin="-20px 0px 0px 0px" size="20"/>
                            ) : (
                                <IconButtons VideoOff color="#999999" margin="-20px 0px 0px 0px" size="20"/>
                            )}
                        </IconButton>
                    </RoundBack> 
                    </ButtonsContents>
                   </ButtonsWrapper>       
        );
    }
}
const ButtonsWrapper=styled.div`
position:relative;
width:100%;
height:100%;
`
const ButtonsContents =styled.div`
display:flex;
// background:yellow;
position:absolute;
left:300px;
`
const RoundBack=styled.div`
background:black;
width:40px;
height:40px;
border-radius:50%;
margin:0px 10px;

`

 {/* <IconButton color="inherit" onClick={this.toggleChat} id="navChatButton">
                            {this.props.showNotification && <div id="point" className="" />}
                             <Tooltip title="Chat">
                                <QuestionAnswer />
                            </Tooltip> 
                        </IconButton> */}
