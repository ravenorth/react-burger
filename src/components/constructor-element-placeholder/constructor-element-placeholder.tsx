import { clsx } from 'clsx';

import styles from './constructor-element-placeholder.module.css';

type TConstructorElementPlaceholderProps = {
  text: string;
  type?: 'top' | 'bottom';
  isTarget?: boolean;
  testId?: string;
};

export const ConstructorElementPlaceholder = ({
  text,
  type,
  isTarget = false,
  testId,
}: TConstructorElementPlaceholderProps): React.JSX.Element => {
  return (
    <div
      className={clsx(
        'text text_type_main-default',
        styles.placeholder,
        !!type && styles[type],
        isTarget && styles.target
      )}
      data-testid={testId}
    >
      {text}
    </div>
  );
};
