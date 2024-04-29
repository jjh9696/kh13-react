import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Toastify from 'toastify-js';

const Chatbot = () => {
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // 웹소켓 연결 상태 추가

  useEffect(() => {
    const ws = new SockJS("/ws/chatbot/{userId}/{roomId}/websocket");

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true); // 연결 성공 시 상태 변경
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        setQuestions(data);
      } else {
        setAnswer(data.chatbotAnswer);
        Toastify({
          text: data.chatbotAnswer,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)"
          },
          onClick: function () { }
        }).showToast();
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false); // 연결 종료 시 상태 변경
    };

    setSocket(ws);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const handleQuestionClick = (questionNo) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(questionNo);
    }
  };

  return (
    <div>
      <h1>챗봇 예제</h1>
      <hr />
      {/* 웹소켓 연결 상태를 출력 */}
      {isConnected ? <p>웹소켓 연결 성공</p> : <p>웹소켓 연결 실패</p>}
      <div className="question-wrapper">
        {questions.map((question) => (
          <button
            key={question.chatbotNo}
            onClick={() => handleQuestionClick(question.chatbotNo)}
            className="btn-question"
          >
            {question.chatbotQuestion}
          </button>
        ))}
      </div>
      <div className="answer-wrapper">{answer}</div>
    </div>
  );
};

export default Chatbot;