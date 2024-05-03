import React, { useState } from 'react';
import { Modal } from 'bootstrap'; // 부트스트랩의 모달 임포트
import Chatbot from './integrated/chatbot'; // chatbot.js 컴포넌트 임포트

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const openModal = () => {
    const newModal = new Modal(document.getElementById('exampleModal')); // 모달 객체 생성
    newModal.show(); // 모달 열기
    setIsModalOpen(true); // 모달 상태 업데이트
  };

  // 모달 닫기
  const closeModal = () => {
    const modal = Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide(); // 모달 닫기
    setIsModalOpen(false); // 모달 상태 업데이트
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={openModal}>Open Chatbot</button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">운수좋은날 챗봇</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              {isModalOpen && <Chatbot />} {/* Chatbot 컴포넌트를 모달 안에 렌더링 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
