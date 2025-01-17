export function formatTime(time, format = 'MM-DD-YYYY') {
    return day(time).format(format)
}
