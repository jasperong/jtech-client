import moment from 'moment-timezone';

export const m = x => moment(x).tz(process.env.REACT_APP_TZ);
