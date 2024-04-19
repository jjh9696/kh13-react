import React, { useState } from 'react';

function App() {
  const [activeImage, setActiveImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleImageClick = (image) => {
    setActiveImage(activeImage === image ? null : image);
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col">
          <div className="p-4 bg-dark text-light rounded">
            <h1>평가 문항</h1>
            <p>다음 화면과 기능을 구현하시오</p>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col text-center">
          <img src={activeImage || 'https://picsum.photos/id/20/300/300'} alt="Main" className="mb-3" />
        </div>
      </div>
      <div className="row">
        {[1, 2, 3, 4].map((id) => (
          <div className="col-auto" key={id}>
            <div
              style={{ opacity: (activeImage === `https://picsum.photos/id/${id}/300/300` || hoveredImage === `https://picsum.photos/id/${id}/50`) ? 1 : 0.5 }}
              onMouseEnter={() => setHoveredImage(`https://picsum.photos/id/${id}/50`)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => handleImageClick(`https://picsum.photos/id/${id}/300/300`)}
            >
              <img src={`https://picsum.photos/id/${id}/50`} alt={`Image ${id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
