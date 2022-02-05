import { format, isValid } from 'date-fns';

export const validDate = (obj: Object): boolean => {
  return obj instanceof Date && isValid(obj);
}

export const formatDate = (date: Date): string => {
  if (validDate(date)) {
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  } else {
    return '';
  }
};
