export function timeMessage(data) {
    const timestamp = new Date(data);
    const now = new Date();
    const diffMs = now - timestamp;
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMins / 60);

    let dateText;
    if (diffMins < 1) {
        dateText = "1 минуту назад";
    } else if (diffMins < 5) {
        dateText = "5 минут назад";
    } else if (diffMins < 10) {
        dateText = "10 минут назад";
    } else if (diffMins < 30) {
        dateText = "30 минут назад";
    } else if (diffHours < 24) {
        const diffHoursRemainder = diffHours % 24;
        dateText = `${diffHours} ч. ${diffHoursRemainder} мин.`;
    } else if (timestamp.getFullYear() === now.getFullYear()) {
        dateText = `${timestamp.getDate()}.${timestamp.getMonth() + 1}`;
    } else {
        dateText = `${timestamp.getDate()}.${
            timestamp.getMonth() + 1
        }.${timestamp.getFullYear()}`;
    }

    return dateText;
}
