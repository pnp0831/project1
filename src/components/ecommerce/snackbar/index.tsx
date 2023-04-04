import clsx from 'clsx';
import Image from 'next/image';
import React, { useState, useEffect, memo } from 'react';
import { useSnackbarContext } from '~/contexts/snackbar-context';
import styles from './snackbar.module.scss';

const Snackbar = ({ message, duration, onClose, style }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isEndTransition, setIsEndStransiton] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const handleDismiss = () => {
    onClose(message.id);
  };

  return (
    <div className={clsx(styles.snackbarContainer)} style={style}>
      <div className={styles.snackbar}>
        <div className={styles.overlay} />
        <div className={styles.snackbarContent}>
          <div className={styles.snackBarButton}>
            <Image
              alt="close"
              className={styles.close}
              onClick={handleDismiss}
              src="/close-white.png"
              width={24}
              height={24}
              loading="lazy"
            />
          </div>
          <h6 className={styles.snackbarMessage}>{message.message}</h6>
        </div>
      </div>
    </div>
  );
};

const SnackbarContainer = memo(() => {
  const { messages, hideMessage } = useSnackbarContext();

  const onClose = (messageId) => {
    hideMessage(messageId);
  };

  return messages.map((message, index) => {
    const bottom = (index + 1) * 80 + (index + 1) * 20;

    const style = {
      bottom,
    };

    return (
      <Snackbar
        key={message.id}
        message={message}
        duration={3000}
        style={style}
        onClose={onClose}
      />
    );
  });
});

export default SnackbarContainer;
