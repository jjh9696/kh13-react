import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const Chatbot = () => {
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws/chatbot');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log('Connected to WebSocket');
      setStompClient(client);

      client.subscribe('/topic/questions', (message) => {
        const questions = JSON.parse(message.body);
        setQuestions(questions);
      });
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [stompClient]);

  const handleQuestionClick = (questionNo) => {
    stompClient.send('/app/question', {}, JSON.stringify({ questionNo }));
  };

  return (
    <div>
      <h1>챗봇 예제</h1>
      <button className="btn-connect">연결</button>
      <button className="btn-disconnect">종료</button>
      <hr />
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
