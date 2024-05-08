import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import moment from 'moment';
import axios from "../utils/CustomAxios";

const MemberChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(''); // 방 ID 상태 추가
  const [userId, setUserId] = useState(''); // 현재 사용자의 ID

  useEffect(() => {
    // 사용자 ID 설정
    const token = localStorage.getItem('token');
    if (token) {
      const userIdFromToken = decodeTokenAndGetUserId(token); // 토큰에서 사용자 ID 추출하는 함수
      setUserId(userIdFromToken);
    }
    // 방 ID 설정
    const roomIdForUser = generateRoomId(userId); // 사용자 ID를 기반으로 방 ID 생성하는 함수
    setRoomId(roomIdForUser);

    // 페이지에 들어갈 때 웹소켓 연결 생성
    const newSocket = new SockJS("http://localhost:8080/ws/memberChat");

    newSocket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (message.roomId === roomId) {
        setMessages((prevMessages) => [message, ...prevMessages]);
      }
    };

    newSocket.onopen = () => {
      console.log('WebSocket connection established');
      // 웹소켓이 열리면서 사용자가 속한 방에 들어가는 요청
      newSocket.send(JSON.stringify({ type: 'join_room', roomId, userId }));
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(newSocket);

    // 페이지를 벗어날 때 웹소켓 연결 해제
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [roomId, userId]); // roomId와 userId가 변경될 때마다 연결을 다시 설정

  const sendMessage = () => {
    if (inputValue.trim().length === 0) return;

    const data = {
      token: axios.defaults.headers.common['Authorization'],
      content: inputValue,
      roomId: roomId, // 현재 사용자의 방 ID를 전송
      senderId: userId, // 현재 사용자의 ID를 전송
    };

    const json = JSON.stringify(data);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(json);
      setInputValue('');
    } else {
      console.error('WebSocket connection is not open');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>문의 채팅</h1>
      <div>
        <p>현재 방의 ID: {roomId}</p> {/* 여기서 현재 방의 ID를 확인합니다 */}
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
            {message.senderId === userId ? '보낸 메시지' : '받은 메시지'}<br />
            {message.message_content}<br />
            {moment(message.message_time).format("a h:mm")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberChat;
