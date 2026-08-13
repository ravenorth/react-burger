import { clsx } from 'clsx';

import { getFeedDoneNumbers, getFeedPendingNumbers } from '@services/feed/feedSlice';
import { useAppSelector } from '@services/hooks';

import styles from './feed-info.module.css';

const MAX_STATUS_NUMBERS_COUNT = 20;

type TFeedInfoProps = {
  total: number;
  today: number;
};

export const FeedInfo = ({ total, today }: TFeedInfoProps): React.JSX.Element => {
  const doneNumbers = useAppSelector(getFeedDoneNumbers);
  const pendingNumbers = useAppSelector(getFeedPendingNumbers);

  return (
    <section className={styles.container}>
      <div className={styles.statuses}>
        <StatusBlock title="Готовы:" numbers={doneNumbers} done />
        <StatusBlock title="В работе:" numbers={pendingNumbers} />
      </div>
      <TotalBlock label="Выполнено за все время:" value={total} />
      <TotalBlock label="Выполнено за сегодня:" value={today} />
    </section>
  );
};

type TStatusBlockProps = {
  title: string;
  numbers: number[];
  done?: boolean;
};

const StatusBlock = ({ title, numbers, done }: TStatusBlockProps): React.JSX.Element => {
  return (
    <div className={styles.statusBlock}>
      <p className="text text_type_main-medium mb-6">{title}</p>
      <ul className={styles.numbers}>
        {numbers.slice(0, MAX_STATUS_NUMBERS_COUNT).map((number) => (
          <li key={number}>
            <span className={clsx('text text_type_digits-default', done && styles.done)}>
              {number}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

type TTotalBlockProps = {
  label: string;
  value: number;
};

const TotalBlock = ({ label, value }: TTotalBlockProps): React.JSX.Element => {
  return (
    <div>
      <p className="text text_type_main-medium">{label}</p>
      <p className="text text_type_digits-large mt-2">{value}</p>
    </div>
  );
};
