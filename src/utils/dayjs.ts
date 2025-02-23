import dayjs from "dayjs";

export function formatTime(time: Date | string, format = 'MM-DD-YYYY') {
    return dayjs(time).format(format)
}
