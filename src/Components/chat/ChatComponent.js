import React, { Component } from 'react';
// import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Send from '@material-ui/icons/Send';
import styled from "styled-components";
import IconButtons from '../../Elements/IconButtons';

import './ChatComponent.css';
import { Tooltip } from '@material-ui/core';

export default class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            message: '',
        };
        this.chatScroll = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
        this.close = this.close.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentWillUnmount(){
        window.removeEventListener("beforeunload", this._confirm);
        window.onpopstate = () => { }
    }
    componentDidMount() {
        window.addEventListener("beforeunload", this._confirm);
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = this._backConfirm;
        
        this.props.user.getStreamManager().stream.session.on('signal:chat', (event) => {
            const data = JSON.parse(event.data);
            let messageList = this.state.messageList;
            messageList.push({ connectionId: event.from.connectionId, nickname: data.nickname, message: data.message });
            const document = window.document;
            setTimeout(() => {
                const userImg = document.getElementById('userImg-' + (this.state.messageList.length - 1));
                const video = document.getElementById('video-' + data.streamId);
                const avatar = userImg.getContext('2d');
                avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
                this.props.messageReceived();
            }, 50);
            this.setState({ messageList: messageList });
            this.scrollToBottom();
        });
    }
    _backConfirm = async () => {
        let event = window.confirm("Changes that you may not be saved.");
        if(event){
            window.history.pushState(null, "", window.location.href);
        }
    }
    _confirm = (e) => {
        var confirmationMessage = "\o/";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    handlePressKey(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    sendMessage() {
        if (this.props.user && this.state.message) {
            let message = this.state.message.replace(/ +(?= )/g, '');
            if (message !== '' && message !== ' ') {
                const data = { message: message, nickname: this.props.user.getNickname(), streamId: this.props.user.getStreamManager().stream.streamId };
                this.props.user.getStreamManager().stream.session.signal({
                    data: JSON.stringify(data),
                    type: 'chat',
                });
            }
        }
        this.setState({ message: '' });
    }

    scrollToBottom() {
        setTimeout(() => {
            try {
                this.chatScroll.current.scrollTop = this.chatScroll.current.scrollHeight;
            } catch (err) {}
        }, 20);
    }

    close() {
        this.props.close(undefined);
    }

    render() {
        const styleChat = { display: this.props.chatDisplay };
        return (
            <div id="chatContainer">
                <div id="chatComponent" style={styleChat}>
                    <div id="chatToolbar">
                        <span>실시간 채팅</span>
                        <div style={{display:"flex", alignItems:"center" }}>
                            {/* <IconButtons People size="30"/> */}
                            {/* <span style={{marginLeft:"10px"}}>4</span>  */}
                        </div>
                    </div>
                    <div className="message-wrap" ref={this.chatScroll}>
                        <NoticeTop>토론방에서 나가고 싶으실 때에는<br/>나가기 버튼을 눌러 토론 기록을 꼭 남겨주세요!</NoticeTop>
                        {this.state.messageList.map((data, i) => (
                            <div
                                key={i}
                                id="remoteUsers"
                                className={
                                    'message' + (data.connectionId !== this.props.user.getConnectionId() ? ' left' : ' right')
                                }
                            >
                                {/* <canvas id={'userImg-' + i} width="60" height="60" className="user-img"/> */}
                                <div className="msg-detail">
                                    <div className="msg-info">
                                        <UserName> {data.nickname}</UserName>
                                    </div>
                                    <div className="msg-content">
                                        {/* <span className="triangle" /> */}
                                        <Message>{data.message}</Message>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <div id="messageInput">
                            <input
                            placeholder="토론 내용에 대한 댓글을 남겨주세요"
                            id="chatInput"
                            value={this.state.message}
                            onChange={this.handleChange}
                            onKeyPress={this.handlePressKey}
                            />
                        </div>
                        
                        {/* <Tooltip title="Send message"> */}
                            <SendBtn onClick={this.sendMessage}>
                                <div style={{marginLeft:"0px", marginBottom:"4px", marginTop:"-5px", marginRight:"3px"}}>
                                    <IconButtons Airplane color="white" size="16"/>
                                </div>
                            </SendBtn>
                        {/* </Tooltip> */}
                    </div>
                    
                </div>
            </div>
        );
    }
}

const NoticeTop=styled.div`
width:100%;
height:auto;
background:white;
padding:10px 20px;
border-radius:10px;
margin-top:20px;
font-size:13px;
margin-left:0px;
`
const UserName=styled.p`
font-size:14px;
color:#191919;
`
const Message=styled.p`
font-size:14px;
color:#191919;
// background:white;
// width:auto;
// height:auto;
// padding:5px 10px;
// border-radius:5px;
box-sizing:border-box;
`


const SendBtn=styled.button`
width:28px;
height:28px;
border-radius:50%;
background:#FF5912;
position:absolute;
right:30px;
bottom:30px;
transform:rotate(45deg);
`