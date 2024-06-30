import React, { useState } from 'react';
import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';

function App() {
    const [bgUrl, setBgUrl] = useState('');
    const [bgStyle, setBgStyle] = useState({});
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleBgChange = (e) => {
        setBgUrl(e.target.value);
    };

    const applyBackground = () => {
        setBgStyle({
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        });
    };

    const handleSend = async () => {
        if (input.trim()) {
            const userMessage = { sender: "user", text: input };
            setMessages([...messages, userMessage]);
            setInput('');

            try {
                const response = await sendMsgToOpenAI(input);
                console.log('OpenAI response:', response);
                const botMessage = { sender: "bot", text: response };
                setMessages([...messages, userMessage, botMessage]);
            } catch (error) {
                console.error("Failed to send message:", error);
            }
        }
    };

    return (
        <div className="App">
            <div className="sideBar">
                <div className="upperside">
                    <div className="uppersideTop">
                        <img src={gptLogo} alt="" className="logo" />
                        <span className="brand">SmithGpt</span>
                    </div>
                    <button className="midBtn">
                        <img src={addBtn} alt="New Chat" className="addBtn" />New Chat
                    </button>
                    <div className="upperSideBottom">
                        <button className="query">
                            <img src={msgIcon} alt="Query" />What is Programming ?
                        </button>
                        <button className="query">
                            <img src={msgIcon} alt="Query" />How to use an API ?
                        </button>
                    </div>
                </div>
                <div className="lowerSide">
                    <div className="listItems">
                        <img src={home} alt="" className="listitemImg" />Home
                    </div>
                    <div className="listItems">
                        <img src={saved} alt="" className="listitemImg" />Saved
                    </div>
                    <div className="listItems">
                        <img src={rocket} alt="" className="listitemImg" />Upgrade to pro
                    </div>
                    <div className="backgroundInput">
                        <input type="text" placeholder="Enter image URL" value={bgUrl} onChange={handleBgChange} />
                        <button onClick={applyBackground}>Set Background</button>
                    </div>
                </div>
            </div>
            <div className="main" style={bgStyle}>
                <div className="chats">
                    {messages.map((msg, index) => (
                        <div key={index} className="chat">
                            <img src={msg.sender === "user" ? userIcon : gptImgLogo} alt="" />
                            <p className="txt">{msg.text}</p>
                        </div>
                    ))}
                </div>
                <div className="chatFooter">
                    <div className="inp">
                        <input 
                            type="text" 
                            placeholder="Send a Message" 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                        />
                        <button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
