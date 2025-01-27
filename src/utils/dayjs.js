import dayjs from "dayjs";

export function formatTime(time, format = 'MM-DD-YYYY') {
    return dayjs(time).format(format)
}
