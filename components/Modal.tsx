import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../styles/components/Modal.module.scss';

interface ModalProps {
  children?: React.ReactNode;
  title?: string;
  onClose: (e: React.SyntheticEvent) => void;
  show: boolean;
}

export default function Modal({ children, title, onClose, show }: ModalProps) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const close = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose(e);
  };

  const content = show ? (
    <div className={styles.modal__wrapper}>
      <div
        className={styles.modal__overlay}
        onClick={close}
      ></div>
      <article className={styles.modal__box}>
        <header className={styles.modal__header}>
          <h3>{title ? title : ''}</h3>
        </header>
        <br />
        <main className={styles.modal__body}>{children}</main>
        <button
          className={styles.modal__close}
          onClick={close}
        >
          X
        </button>
      </article>
    </div>
  ) : null;

  if (isClient) {
    return ReactDOM.createPortal(content, document.getElementById('modal-root')!);
  } else {
    return null;
  }
}
