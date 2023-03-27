import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import styles from './carousel.module.scss';

const WrapperScroll = ({ children, className, widthScroll, enableLongSlip }) => {
  const [isShowIconNext, setIsShowIconNext] = useState(false);
  const [isShowIconPrev, setIsShowIconPrev] = useState(false);
  const refWrapper = useRef(null);

  let isDown;

  const [activeCursor, setActiveCursor] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleScroll = (e) => {
    const {
      //          dynamic     maxWidth    showWidth
      target: { scrollLeft, scrollWidth, clientWidth },
    } = e;

    const maxWidthScroll = scrollWidth - clientWidth;

    if (maxWidthScroll === scrollLeft) {
      setIsShowIconNext(false);
    } else {
      setIsShowIconNext(true);
    }

    if (scrollLeft > 0) {
      setIsShowIconPrev(true);
    } else {
      setIsShowIconPrev(false);
    }
  };

  useEffect(() => {
    const { clientWidth, scrollWidth } = refWrapper.current;
    if (scrollWidth > clientWidth) {
      setIsShowIconNext(true);
    }

    refWrapper.current.addEventListener('scroll', handleScroll);

    return () => {
      if (refWrapper.current) {
        refWrapper.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleMouseUp = () => {
    isDown = false;
    setActiveCursor(false);
  };

  const handleMouseLeave = () => {
    isDown = false;
    setActiveCursor(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) {
      return;
    }
    e.preventDefault();
    const x = e.pageX - refWrapper.current.offsetLeft;
    const walk = (x - startX.current) * 3; //scroll-fast
    refWrapper.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseDown = (e) => {
    isDown = true;
    setActiveCursor(true);

    startX.current = e.pageX - refWrapper.current.offsetLeft;
    scrollLeft.current = refWrapper.current.scrollLeft;
  };

  useEffect(() => {
    refWrapper.current.addEventListener('mouseup', handleMouseUp);
    refWrapper.current.addEventListener('mousemove', handleMouseMove);
    refWrapper.current.addEventListener('mouseleave', handleMouseLeave);
    refWrapper.current.addEventListener('mousedown', handleMouseDown);

    return () => {
      if (refWrapper.current) {
        refWrapper.current.removeEventListener('mouseup', handleMouseUp);
        refWrapper.current.removeEventListener('mousemove', handleMouseMove);
        refWrapper.current.removeEventListener('mouseleave', handleMouseLeave);
        refWrapper.current.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, []);

  const onClick = (e, isScrollLeft) => {
    const { childNodes, scrollWidth, scrollLeft, clientWidth } = refWrapper.current;

    const numberScroll = enableLongSlip
      ? clientWidth
      : widthScroll || Math.round(scrollWidth / childNodes.length);

    if (isScrollLeft) {
      refWrapper.current.scrollTo({
        left: scrollLeft - numberScroll,
        behavior: 'smooth',
      });
    } else {
      refWrapper.current.scrollTo({
        left: scrollLeft + numberScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`${styles.wrapperOverflow} ${activeCursor ? styles.isDown : ''}`}>
      <div ref={refWrapper} className={className}>
        {children}
      </div>
      <Image
        onClick={(e) => onClick(e, true)}
        className={`${styles.icon} ${styles.iconPrev} ${isShowIconPrev && styles.active}`}
        src="/arrow-left.png"
        height={40}
        width={40}
        alt="arrow-left"
        loading="lazy"
      />

      <Image
        className={`${styles.icon} ${styles.iconNext} ${isShowIconNext && styles.active}`}
        onClick={(e) => onClick(e)}
        src="/arrow-right.png"
        height={40}
        width={40}
        alt="arrow-right"
        loading="lazy"
      />
    </div>
  );
};

export default WrapperScroll;
