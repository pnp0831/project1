import React, { useState, useEffect, useRef } from 'react';

function AutoAffix({ offsetTop = 0, offsetBottom = 0, children, container, width }) {
  const [affixed, setAffixed] = useState(false);
  const ref = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) {
        return;
      }

      const { top, bottom } = ref.current.getBoundingClientRect();
      const { innerHeight } = window;

      if (top > window.scrollY) {
        setAffixed(false);
      } else {
        if (top <= container?.current?.offsetTop) {
          setAffixed(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [offsetTop, offsetBottom, container?.current?.offsetTop]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {affixed ? (
        <div
          ref={ref}
          style={{
            position: 'fixed',
            top: offsetTop,
            width: `${width}px`,
            bottom: 50,
          }}
        >
          {children}
        </div>
      ) : (
        <div ref={ref}>{children}</div>
      )}
    </div>
  );
}

export default AutoAffix;
