import { format } from 'date-fns/esm';
import { es } from 'date-fns/locale';

export const customDateFormat = (date, dateFormat) => {
    return format(date, dateFormat, { locale: es });
};



