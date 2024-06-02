import React, { useState, useEffect } from 'react';

const ClickerGame = () => {
    const [points, setPoints] = useState(0);
    const [taps, setTaps] = useState(0);
    const [referrals, setReferrals] = useState(0);
    const [dailyTaps, setDailyTaps] = useState(100);

    useEffect(() => {
        // Загрузка состояния пользователя из локального хранилища или API
        const storedPoints = localStorage.getItem('points') || 0;
        const storedTaps = localStorage.getItem('taps') || 0;
        const storedReferrals = localStorage.getItem('referrals') || 0;

        setPoints(Number(storedPoints));
        setTaps(Number(storedTaps));
        setReferrals(Number(storedReferrals));
    }, []);

    useEffect(() => {
        // Сохранение состояния пользователя в локальное хранилище
        localStorage.setItem('points', points);
        localStorage.setItem('taps', taps);
        localStorage.setItem('referrals', referrals);
    }, [points, taps, referrals]);

    const handleTap = () => {
        if (dailyTaps > 0) {
            setPoints(points + 1);
            setTaps(taps + 1);
            setDailyTaps(dailyTaps - 1);
        } else {
            alert('Вы достигли дневного лимита тапов.');
        }
    };

    return (
        <div>
            <h1>Кликер-игра</h1>
            <p>Очки: {points}</p>
            <p>Осталось тапов на сегодня: {dailyTaps}</p>
            <button onClick={handleTap}>TAP</button>
        </div>
    );
};

export default ClickerGame;
