let is24HourFormat = true;

const timezones = [
    { id: 'local', name: 'Local', zone: 'local' },
    { id: 'ny', name: 'New York', zone: 'America/New_York' },
    { id: 'london', name: 'London', zone: 'Europe/London' },
    { id: 'paris', name: 'Paris', zone: 'Europe/Paris' },
    { id: 'dubai', name: 'Dubai', zone: 'Asia/Dubai' },
    { id: 'tokyo', name: 'Tokyo', zone: 'Asia/Tokyo' },
    { id: 'sydney', name: 'Sydney', zone: 'Australia/Sydney' },
    { id: 'la', name: 'Los Angeles', zone: 'America/Los_Angeles' }
];

function updateClocks() {
    const now = new Date();

    timezones.forEach(tz => {
        let time, date;

        if (tz.zone === 'local') {
            time = now;
            date = now;
        } else {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: tz.zone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            const parts = new Intl.DateTimeFormat('en-US', {
                timeZone: tz.zone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).formatToParts(now);

            const dateObj = {};
            parts.forEach(part => {
                dateObj[part.type] = part.value;
            });

            time = new Date(
                parseInt(dateObj.year),
                parseInt(dateObj.month) - 1,
                parseInt(dateObj.day),
                parseInt(dateObj.hour),
                parseInt(dateObj.minute),
                parseInt(dateObj.second)
            );
            date = time;
        }

        const timeString = formatTime(time);
        const dateString = formatDate(date);

        document.getElementById(tz.id + '-clock').textContent = timeString;
        document.getElementById(tz.id + '-date').textContent = dateString;
    });
}

function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let period = '';

    if (!is24HourFormat) {
        period = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
    }

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    return hours + ':' + minutes + ':' + seconds + period;
}

function formatDate(date) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function toggle12HourFormat() {
    is24HourFormat = !is24HourFormat;
    updateClocks();
}

setInterval(updateClocks, 1000);

updateClocks();