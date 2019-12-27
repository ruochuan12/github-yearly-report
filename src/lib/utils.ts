import dayjs from 'dayjs';
import { TIMEOUT, YEAR_START, YEAR_END } from '@/lib/constant';

export const qs = () => {
  const { href } = window.location;
  const result: any = {};
  let param = null;
  const reg = /[?&](.*?)=([^&#]*)/g;
  param = reg.exec(href);
  while (param) {
    try {
      result[param[1]] = decodeURIComponent(param[2]);
    } catch (e) {
      try {
        result[param[1]] = unescape(param[2]);
      } catch (escapeErr) {
        result[param[1]] = param[2]; // eslint-disable-line
      }
    }
    param = reg.exec(href);
  }
  return result;
};

export const pick = (obj: any, propertyArr: string[] = []) => {
  const pickObj: any = {};
  propertyArr.forEach(property => {
    if (typeof obj[property] !== 'undefined') {
      pickObj[property] = obj[property];
    }
  });
  return pickObj;
};

export const timeoutFn = (promise: any) => Promise.race([
  promise,
  new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error('request timeout'));
    }, TIMEOUT);
  }),
]).catch(() => {});

export const inStartEndYear = (date: string) => {
  const temp = dayjs(date);
  const start = dayjs(YEAR_START);
  const end = dayjs(YEAR_END);
  return temp.isBefore(end, 'day') && temp.isAfter(start, 'day');
};
