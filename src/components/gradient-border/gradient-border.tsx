import { clsx } from 'clsx';

import type { ReactNode } from 'react';

import styles from './gradient-border.module.css';

type TGradientBorderProps = {
  extraClass?: string;
  children: ReactNode;
};

export const GradientBorder = ({
  extraClass,
  children,
}: TGradientBorderProps): React.JSX.Element => {
  return (
    <div className={clsx(styles.wrapper, extraClass)}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};
