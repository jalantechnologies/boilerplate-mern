import { useState } from 'react';

import { MILLISECONDS_IN_A_SECOND } from '../constants/timer';

type UseTimerProps = {
  delayInMilliseconds: number;
};

type UseTimerType = {
  isResendEnabled: boolean;
  remaininingSecondsStr: string;
  startTimer: () => void;
  stopTimer: () => void;
};

const useTimer = ({ delayInMilliseconds }: UseTimerProps): UseTimerType => {
  const [remainingTime, setRemainingTime] = useState(delayInMilliseconds);
  const [timerEnd, setTimerEnd] = useState(true);
  let timeoutId: NodeJS.Timeout;
  let intervalId: NodeJS.Timer;
  let started: boolean;

  const onTick = () => {
    setRemainingTime((oldTime) => oldTime - MILLISECONDS_IN_A_SECOND);
  };

  const onEnd = () => {
    setTimerEnd(true);
  };

  const stopTimer = () => {
    started = false;
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };

  const startTimer = () => {
    if (!started) {
      setTimerEnd(false);
      started = true;

      timeoutId = setTimeout(() => {
        started = false;
        onEnd();
        stopTimer();
      }, delayInMilliseconds);

      intervalId = setInterval(onTick, MILLISECONDS_IN_A_SECOND);
      setRemainingTime(delayInMilliseconds);
    }
  };

  const isResendEnabled = timerEnd || (remainingTime <= MILLISECONDS_IN_A_SECOND && !started);

  const remaininingSeconds = remainingTime / MILLISECONDS_IN_A_SECOND - 1;
  const remaininingSecondsStr = remaininingSeconds > 9 ? `${remaininingSeconds}` : `0${remaininingSeconds}`;

  return {
    isResendEnabled,
    remaininingSecondsStr,
    startTimer,
    stopTimer,
  };
};

export default useTimer;
