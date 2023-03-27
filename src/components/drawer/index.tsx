import Image from 'next/image';
import React, { ReactNode, useEffect, useState, forwardRef } from 'react';
import styles from './drawer.module.scss';

type Props = {
  children: ReactNode;
};

const Drawer = ({ children, myRef }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (myRef) {
      myRef.current = toggleDrawer;
    }
  }, [toggleDrawer, myRef]);

  return (
    <>
      <div onClick={toggleDrawer} className={styles.btnDrawer}>
        <Image alt="menu" src="/menu.png" width={24} height={24} loading="lazy" />
      </div>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={toggleDrawer} />
      <div className={`${styles.drawerContainer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.content}>
          <div className={styles.close} onClick={toggleDrawer}>
            <Image alt="close" src="/close.png" width={24} height={24} loading="lazy" />
          </div>
          {children({ styles })}
        </div>
      </div>
    </>
  );
};

export default forwardRef((props: Props, ref) => <Drawer {...props} myRef={ref} />);
