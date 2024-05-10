import React, { useState } from 'react';
import { Modal } from 'bootstrap'; // 부트스트랩의 모달 임포트
import Chatbot from './integrated/chatbot'; 
import MemberChat from './integrated/memberChat';

function Home() {
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  const [isMemberChatModalOpen, setIsMemberChatModalOpen] = useState(false);

  // 챗봇 모달 열기
  const openChatbotModal = () => {
    const newModal = new Modal(document.getElementById('chatbotModal')); // 모달 객체 생성
    newModal.show(); // 모달 열기
    setIsChatbotModalOpen(true); // 모달 상태 업데이트
  };

  // 챗봇 모달 닫기
  const closeChatbotModal = () => {
    const modal = Modal.getInstance(document.getElementById('chatbotModal'));
    modal.hide(); // 모달 닫기
    setIsChatbotModalOpen(false); // 모달 상태 업데이트
  };
  
  // 문의 채팅 모달 열기
  const openMemberChatModal = () => {
    const newModal = new Modal(document.getElementById('memberChatModal')); // 모달 객체 생성
    newModal.show(); // 모달 열기
    setIsMemberChatModalOpen(true); // 모달 상태 업데이트
  };

  // 문의 채팅 모달 닫기
  const closeMemberChatModal = () => {
    const modal = Modal.getInstance(document.getElementById('memberChatModal'));
    modal.hide(); // 모달 닫기
    setIsMemberChatModalOpen(false); // 모달 상태 업데이트
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={openChatbotModal}>Open Chatbot</button>
      <button onClick={openMemberChatModal}>Open memberChat</button>

      <div className="modal fade" id="chatbotModal" tabIndex="-1" aria-labelledby="chatbotModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="chatbotModalLabel">운수좋은날 챗봇</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeChatbotModal}></button>
            </div>
            <div className="modal-body">
              {isChatbotModalOpen && <Chatbot />} {/* Chatbot 컴포넌트를 모달 안에 렌더링 */}
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="memberChatModal" tabIndex="-1" aria-labelledby="memberChatModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="memberChatModalLabel">운수좋은날 문의</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeMemberChatModal}></button>
            </div>
            <div className="modal-body">
              {isMemberChatModalOpen && <MemberChat />} {/* Chatbot 컴포넌트를 모달 안에 렌더링 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
