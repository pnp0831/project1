import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './scroll-to-top.module.scss';
import clsx from 'clsx';

const ScrollToTop = () => {
  const [isShow, setIsShow] = useState(false);
  const onClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={clsx(styles.ScrollToTop, {
        [styles.isShow]: isShow,
      })}
      onClick={onClick}
    >
      <Image src="/scrolltotop.png" width={40} height={40} loading="lazy" alt="scroll-totop" />
    </div>
  );
};

export default ScrollToTop;
