import { useEffect, useState } from 'react';

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const [windowType, setWindowType] = useState({
    isTable: false,
    isDesktop: false,
    isMobile: false,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      let tIsTable = false;
      let tIsMobile = false;
      let tIsDesktop = false;

      if (window.innerWidth > 1440) {
        tIsDesktop = true;
      }

      if (window.innerWidth < 541) {
        tIsMobile = true;
      }

      if (window.innerWidth <= 1440 && window.innerWidth >= 541) {
        tIsTable = true;
      }

      setWindowType({
        isDesktop: tIsDesktop,
        isMobile: tIsMobile,
        isTable: tIsTable,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return [windowType, windowSize];
}

export default useWindowSize;
