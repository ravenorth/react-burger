import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay';

import type { ReactNode } from 'react';

import styles from './modal.module.css';

type TModalProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ title, children, onClose }: TModalProps): React.JSX.Element => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return (): void => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} type="button">
          <CloseIcon type="primary" />
        </button>
        {title && (
          <h2 className={`${styles.title} text text_type_main-large pt-10 pl-10 pr-10`}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </>,
    document.getElementById('modals')!
  );
};
