exports.calculateTimeLeft = (date_future, date_now) => {
    const difference = date_future - date_now;
    let timeLeft = {};
    if (difference > 0) {
        timeLeft = {
            day: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }
    return timeLeft;
};