import React, { useRef, useEffect, useCallback, useState } from 'react';
import Flipbook from './components/flip-book';
import './App.css';

const options = {
  width: 979,
  height: 650,
  autoCenter: true,
  display: 'double',
  elevation: 30,
  duration: 1000,
  acceleration: true,
  gradients: true,
  responsive: true,
};

function App() {
  const flipbookRef = useRef(null);
  const autoplayIntervalRef = useRef(null);
  const [isAutoplaying, setIsAutoplaying] = useState(false);

  const toggleAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
      setIsAutoplaying(false);
    } else {
      if (!flipbookRef.current) {
        return;
      }
      setIsAutoplaying(true);
      autoplayIntervalRef.current = setInterval(() => {
        if (flipbookRef.current) {
          try {
            const currentPage = flipbookRef.current.turn('page');
            const totalPages = flipbookRef.current.turn('pages');

            if (currentPage < totalPages) {
              flipbookRef.current.turn('next');
            } else {
              // Stop autoplay when reaching the last page
              clearInterval(autoplayIntervalRef.current);
              autoplayIntervalRef.current = null;
              setIsAutoplaying(false);
            }
          } catch (error) {
            console.error('Error during autoplay:', error);
          }
        }
      }, 8000);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <header className="main-header">
        <img src="/logo.svg" alt="Logo" className="header-logo" />
        <span className="team-title">AstroIgnite</span>
        <button className="autoplay-btn" onClick={toggleAutoplay}>
          {isAutoplaying ? 'Stop Autoplay' : 'Auto Play'}
        </button>
      </header>
      <div className="app-container">
        <Flipbook options={options} className="magazine" flipbookRef={flipbookRef}>
          <div className="page">
            <img src="/cover.svg" alt="Cover" />
          </div>
          <div className="page">
            <img src="/f0.png" alt="Page 0" />
          </div>
          <div className="page">
            <img src="/f1.png" alt="Page 1" />
          </div>
          <div className="page">
            <img src="/f2.png" alt="Page 2" />
          </div>
          <div className="page">
            <img src="/f3.png" alt="Page 3" />
          </div>
          <div className="page">
            <img src="/f4.png" alt="Page 4" />
          </div>
          <div className="page">
            <img src="/f5.png" alt="Page 5" />
          </div>
          <div className="page">
            <img src="/f6.png" alt="Page 6" />
          </div>
          <div className="page">
            <img src="/f7.png" alt="Page 7" />
          </div>
          <div className="page">
            <img src="/f8.png" alt="Page 8" />
          </div>
          <div className="page">
            <img src="/f9.png" alt="Page 9" />
          </div>
          <div className="page">
            <img src="/f10.png" alt="Page 10" />
          </div>
          <div className="page">
            <img src="/f11.png" alt="Page 11" />
          </div>
        </Flipbook>
        <span className="description">The adventures of sunny the solar flare - stellar stories</span>
      </div>
    </>
  );
}

export default App;