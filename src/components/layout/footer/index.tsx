import React from 'react';
import Image from 'next/image';
import Container from '../../container';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <Image alt="logo" src="/logo.png" width={268} height={100} loading="lazy" />
        <div className={styles.copyright}>Copyright © 2023 PAM. All Rights Reserved</div>
      </Container>
    </footer>
  );
};

export default Footer;
