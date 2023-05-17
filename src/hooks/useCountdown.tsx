import { useState, useEffect, useRef, useCallback } from 'react';

function useCountdown(initialSeconds = 0) {
    const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
    const [remainingMinutes, setRemainingMinutes] = useState(Math.floor(initialSeconds / 60));
    const countdown = useRef<ReturnType<typeof setInterval> | null>(null);

    const start = useCallback(() => {
        if (!countdown.current) {
            countdown.current = setInterval(() => {
                setRemainingSeconds(seconds => {
                    if (seconds > 0) {
                        return seconds - 1;
                    } else {
                        clearInterval(countdown.current as ReturnType<typeof setInterval>);
                        countdown.current = null;
                        
                        return 0;
                    }
                });
            }, 1000);
        }
    }, []);

    const stop = useCallback(() => {
        if (countdown.current) {
            clearInterval(countdown.current as ReturnType<typeof setInterval>);
            countdown.current = null;
        }
    }, []);

    const reset = useCallback(() => {
        stop();
        setRemainingSeconds(initialSeconds);
        setRemainingMinutes(Math.floor(initialSeconds / 60));
    }, [initialSeconds, stop]);

    useEffect(() => {
        setRemainingMinutes(Math.floor(remainingSeconds / 60));
    }, [remainingSeconds]);

    useEffect(() => {
        return () => {
            if (countdown.current) {
                clearInterval(countdown.current as ReturnType<typeof setInterval>);
            }
        };
    }, []);

    return { remainingSeconds, remainingMinutes, start, stop, reset };
}

export default useCountdown;
