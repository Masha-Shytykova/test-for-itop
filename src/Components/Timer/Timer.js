import { useEffect, useState } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import s from './Timer.module.css';

export default function Timer() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState('stop');

  useEffect(() => {
    const timer = new Subject();
    interval(1000)
      .pipe(takeUntil(timer))
      .subscribe(() => {
        if (status === 'run') {
          setSec(value => value + 1000);
        }
      });
    return () => {
      timer.next();
      timer.complete();
    };
  }, [status]);

  const start = () => {
    setStatus('run');
  };

  const stop = () => {
    setStatus('stop');
    setSec(0);
  };

  const reset = () => {
    setSec(0);
  };

  let wasClicked = false;
  let timeout;

  const wait = () => {
    if (wasClicked) {
      wasClicked = false;
      clearTimeout(timeout);
      setStatus('wait');
      return;
    }

    wasClicked = true;
    timeout = setTimeout(() => {
      wasClicked = false;
    }, 300);
  };

  return (
    <div className={s.container}>
      <p className={s.clockface}>{new Date(sec).toISOString().slice(11, 19)}</p>
      <div className={s.buttons}>
        {status !== 'run' && (
          <button className={s.btn} onClick={start}>
            start
          </button>
        )}
        {status === 'run' && (
          <button className={s.btn} onClick={stop}>
            stop
          </button>
        )}
        <button className={s.btn} onClick={reset}>
          reset
        </button>
        <button className={s.btn} onClick={wait}>
          wait
        </button>
      </div>
    </div>
  );
}
