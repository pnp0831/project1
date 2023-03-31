import React, { useEffect } from 'react';
import { APP_ROUTE } from '~/constants';
import useWindowSize from '~/hooks/useWindowResize';

const ScrollSpy = ({ children, headerSelector }) => {
  const [windowType] = useWindowSize();

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const headers = document.querySelectorAll(headerSelector.map((item) => `.${item}`));
    const tHeaders = document.querySelectorAll(headerSelector.map((item) => `.t-${item}`));

    const positions = [];

    sections.forEach((section) => {
      const position = section.getBoundingClientRect().top + window.pageYOffset;
      positions.push(position);
    });

    const handleScroll = () => {
      const extendOffset = windowType.isMobile ? 101 : 101;
      const currentScrollPosition = window.pageYOffset + extendOffset;
      let currentSectionIndex = 0;
      positions.forEach((position, index) => {
        if (currentScrollPosition >= position) {
          currentSectionIndex = index;
        }
      });
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        currentSectionIndex = headers.length - 1;
      }
      headers.forEach((header, index) => {
        if (index === currentSectionIndex) {
          header.classList.add('active');
          tHeaders[index].classList.add('active');
        } else {
          header.classList.remove('active');
          tHeaders[index].classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      headers.forEach((header, index) => {
        tHeaders[index].classList.remove('active');
      });

      window.removeEventListener('scroll', handleScroll);
    };
  }, [windowType]);

  return React.Children.map(children, (child) => React.cloneElement(child));
};

export default ScrollSpy;
