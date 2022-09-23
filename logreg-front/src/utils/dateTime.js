export function formatTime(date) {
    let hours = date.getHours()
    let minutes = date.getMinutes()

    if (0 <= hours && hours < 10) hours = '0' + hours
    if (0 <= minutes && minutes < 10) minutes = '0' + minutes

    return `${hours}:${minutes}`
}