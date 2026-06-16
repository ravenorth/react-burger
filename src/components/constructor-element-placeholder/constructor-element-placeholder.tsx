import { clsx } from 'clsx';

import styles from './constructor-element-placeholder.module.css';

type TConstructorElementPlaceholderProps = {
  text: string;
  type?: 'top' | 'bottom';
  isTarget?: boolean;
};

export const ConstructorElementPlaceholder = ({
  text,
  type,
  isTarget = false,
}: TConstructorElementPlaceholderProps): React.JSX.Element => {
  const className = clsx(
    'text text_type_main-default',
    styles.placeholder,
    !!type && styles[type],
    isTarget && styles.target
  );
  return <div className={className}>{text}</div>;
};
