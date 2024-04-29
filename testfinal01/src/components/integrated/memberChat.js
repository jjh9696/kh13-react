import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import moment from 'moment';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoggedin, setIsLoggedIn] = useState(sessionStorage.getItem('loginId') !== null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new SockJS(`${process.env.REACT_APP_API_URL}/ws/member`);

    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages((prevMessages) => [message, ...prevMessages]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    setSocket(ws);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const sendMessage = () => {
    if (inputValue.trim().length === 0) return;

    const data = {
      content: inputValue
    };

    const json = JSON.stringify(data);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(json);
    }

    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleLogout = () => {
    // 로그아웃 처리
    setIsLoggedIn(false);
    sessionStorage.removeItem('loginId');
    sessionStorage.removeItem('loginLevel');
  };

  return (
    <div>
      <h1>회원 전용 채팅 예제</h1>
      <h2>로그인 상태: {isLoggedin}</h2>
      <h2>아이디: {sessionStorage.getItem('loginId')}, 등급: {sessionStorage.getItem('loginLevel')}</h2>
      <input 
        type="text" 
        className="text-input" 
        placeholder="메세지 작성" 
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="btn-send" onClick={sendMessage}>전송</button>
      <button className="btn-logout" onClick={handleLogout}>로그아웃</button>
      <hr />
      <div className="chat-wrapper">
        {messages.map((message, index) => (
          <div key={index}>
            {message.message_sender}({message.message_sender_level})<br />
            {message.message_content}<br />
            {moment(message.message_time).format("a h:mm")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
