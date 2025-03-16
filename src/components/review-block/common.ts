import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';


dayjs.extend(localeData);
dayjs().localeData();
dayjs.extend(updateLocale);

dayjs.updateLocale('ru', {
  months: [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
    'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ]
});
