import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import moment from 'moment';
import axios from "../utils/CustomAxios";

const MemberChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 페이지에 들어갈 때 웹소켓 연결 생성
    const newSocket = new SockJS("http://localhost:8080/ws/memberChat");

    newSocket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages((prevMessages) => [message, ...prevMessages]);
    };

    setSocket(newSocket);

    // 페이지를 벗어날 때 웹소켓 연결 해제
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 함

  const sendMessage = () => {
    if (inputValue.trim().length === 0) return;

    const data = {
      token: axios.defaults.headers.common['Authorization'],
      content: inputValue,
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

  return (
    <div>
      <h1>문의 채팅</h1>

      <div>

        <input
          type="text"
          className="text-input"
          placeholder="메세지 작성"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="btn-send" onClick={sendMessage}>전송</button>
      </div>
      <hr />
      <div className="chat-wrapper">
        {messages.map((message) => (
          <div key={message.message_no}>
            {message.message_sender}({message.message_sender_level})<br />
            {message.message_content}<br />
            {moment(message.message_time).format("a h:mm")}
            {/* {message.message_time} */}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default MemberChat;