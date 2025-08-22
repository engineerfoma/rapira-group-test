import dayjs from "dayjs";
import 'dayjs/locale/ru';

export const shortDate = (date: string | number | Date) => {
    const d = dayjs(date).locale('ru');
    const day = d.date();
    const month = d.format('MMM').replace('.', '');
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)}`;
};
