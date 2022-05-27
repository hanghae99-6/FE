import React, { Component } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';
import MicOff from '@material-ui/icons/MicOff';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import VideocamOff from '@material-ui/icons/VideocamOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';
import FormHelperText from '@material-ui/core/FormHelperText';
// import IconButton from '../../Elements/IconButton';
import styled from "styled-components";

export default class StreamComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            nickname: this.props.user.getNickname(),
            showForm: false, mutedSound: false, 
            isFormValid: true };
        this.handleChange = this.handleChange.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
        this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
        this.toggleSound = this.toggleSound.bind(this);
    }

    handleChange(event) {
        this.setState({ nickname: event.target.value });
        event.preventDefault();
    }

    toggleNicknameForm() {
        if (this.props.user.isLocal()) {
            this.setState({ showForm: !this.state.showForm });
        }
    }

    toggleSound() {
        this.setState({ mutedSound: !this.state.mutedSound });
    }

    handlePressKey(event) {
        if (event.key === 'Enter') {
            if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
                this.props.handleNickname(this.state.nickname);
                this.toggleNicknameForm();
                this.setState({ isFormValid: true });
            } else {
                this.setState({ isFormValid: false });
            }
        }
    }

    render() {
        return (
            <div className="OT_widget-container">
                {this.props.user !== undefined && this.props.user.getStreamManager() !== undefined ? (
                    <div className="streamComponent">
                        <OvVideoComponent user={this.props.user} mutedSound={this.state.mutedSound} />
                        {/* <div class="statusIcon">
                            {!this.props.user.isVideoActive() ? (
                                <div class="camIcon">
                                    <VideocamOff id="statusCam" />
                                </div>
                            ) : null}
                            
                            {!this.props.user.isAudioActive() ? (
                                <div class="micIcon">
                                    <MicOff id="statusMic" />
                                </div>
                            ) : <div class="micIcon">
                                    <KeyboardVoiceIcon id="statusMic" />
                                </div>}
                        </div> */}
                        {/* <div>
                            {!this.props.user.isLocal() && (
                                <IconButton id="volumeButton" onClick={this.toggleSound}>
                                    {this.state.mutedSound ? <VolumeOff color="secondary" /> : <VolumeUp />}
                                </IconButton>
                            )}
                        </div> */}
                    </div>
                ) : null}
                <div className="pointer nickname">
                    {this.state.showForm ? (
                        <FormControl id="nicknameForm">
                            <IconButton color="inherit" id="closeButton"> 
                            </IconButton>
                            <InputLabel htmlFor="name-simple" id="label">
                                Nickname
                            </InputLabel>
                            <Input
                                color="inherit"
                                id="input"
                                value={this.state.nickname}
                                onChange={this.handleChange}
                                onKeyPress={this.handlePressKey}
                                required
                            />
                            {!this.state.isFormValid && this.state.nickname.length <= 3 && (
                                <FormHelperText id="name-error-text">Nickname is too short!</FormHelperText>
                            )}
                            {!this.state.isFormValid && this.state.nickname.length >= 20 && (
                                <FormHelperText id="name-error-text">Nickname is too long!</FormHelperText>
                            )}
                        </FormControl>
                    ) : (
                        <div>
                            <span class="nickname">{this.props.user.getNickname()}</span>
                            {this.props.user.isLocal() && <span id=""></span>}
                          
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const DevoteBtn =styled.button`
width:168px;
height:40px;
border:1px solid black;
border-radius:5px;
background:white;
colkr:black;
cursor:pointer;
margin: 0px 10px;
`
const GreyBox=styled.div`
width:468px;
height:600px;
background:lightgrey;
`