import React, { useEffect, useRef } from 'react';

const Flipbook = ({ options, className, children, flipbookRef }) => {
  const internalRef = useRef(null);
  const ref = flipbookRef || internalRef;
  const $flipbookRef = useRef(null);

  useEffect(() => {
    const flipbookNode = ref.current;
    
    const initTurn = () => {
      if (window.$ && window.$.fn.turn && flipbookNode) {
        const $flipbook = window.$(flipbookNode);
        
        // Destroy if already initialized
        try {
          if ($flipbook.turn('is')) {
            $flipbook.turn('destroy');
          }
        } catch (e) {
          // Not initialized yet
        }
        
        // Initialize turn.js
        $flipbook.turn(options);
        
        // Store the jQuery object
        $flipbookRef.current = $flipbook;
        
        // Expose to parent
        if (flipbookRef) {
          flipbookRef.current = $flipbook;
        }
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (!$flipbookRef.current) {
        return;
      }
      
      if (e.key === 'ArrowRight' || e.keyCode === 39) {
        e.preventDefault();
        $flipbookRef.current.turn('next');
      } else if (e.key === 'ArrowLeft' || e.keyCode === 37) {
        e.preventDefault();
        $flipbookRef.current.turn('previous');
      }
    };

    // Wait for DOM to be ready
    const timer = setTimeout(initTurn, 100);

    // Add keyboard listener
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      
      // Destroy turn.js
      if ($flipbookRef.current) {
        try {
          if ($flipbookRef.current.turn('is')) {
            $flipbookRef.current.turn('destroy');
          }
        } catch (e) {
          // Already destroyed
        }
      }
      
      $flipbookRef.current = null;
    };
  }, [options, ref, flipbookRef]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Flipbook;