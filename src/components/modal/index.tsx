/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import clsx from 'clsx';
import Image from 'next/image';
import React, { forwardRef, ReactNode, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

type Props = {
  children: ReactNode;
  open: boolean;
  onClose: () => [];
  title: ReactNode;
  myRef: any;
};

const ModalCom = ({ children, onClose, open, title, myRef }: Props) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isEndTransition, setIsEndStransiton] = useState(false);

  useEffect(() => {
    if (open) {
      setIsTransitioning(true);
    }

    return () => {
      setIsEndStransiton(true);
      setTimeout(() => {
        onClose();
      }, 300);
    };
  }, [open]);

  const handleClose = useCallback(() => {
    setIsEndStransiton(true);

    return setTimeout(() => {
      onClose();
    }, 300);
  });

  useEffect(() => {
    if (myRef) {
      myRef.current = handleClose;
    }
  }, [handleClose, myRef]);

  return (
    <div className={styles.modalContainer}>
      <div className={`${styles.overlay} ${open ? styles.open : ''}`} onClick={handleClose} />

      <div
        className={clsx(styles.modalContent, {
          [styles.isTransitioning]: isTransitioning,
          [styles.isEndTransition]: isEndTransition,
        })}
      >
        <div className={styles.modalHeader}>
          <Image
            alt="close"
            className={styles.close}
            onClick={handleClose}
            src="/close.png"
            width={24}
            height={24}
            loading="lazy"
          />
        </div>
        <div className={styles.modalTitle}>
          <h4>{title}</h4>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

function Modal(props: Props) {
  const [el] = useState(document.createElement('div'));
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    document.body.appendChild(el);
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.removeChild(el);
      document.body.style.overflowY = 'auto';
    };
  }, [el]);

  return ReactDOM.createPortal(<ModalCom {...props} />, el);
}

const ModalRef = forwardRef((props: Props, ref) => <Modal {...props} myRef={ref} />);

export default ModalRef;
