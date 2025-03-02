import dayjs from "dayjs";

export function formatTime(time: Date | string, format = 'MM-DD-YYYY') {
    if (!time) return 'null';
    return dayjs(time).format(format)
}
