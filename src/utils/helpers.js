import { format } from 'date-fns';

export const formatDate = (date) => format(new Date(date), 'PPP');

export const getToday = () => new Date();