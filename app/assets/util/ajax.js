
import * as auth from './auth';

const $ = window.$;
const token = auth.get();

export const get = function (url, query = {}, setting = {}) {
  return $.ajax(url, {
    data: query,
    method: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    ...setting,
    headers: {
      Authorization: 'Bearer ' + token,
      ...setting.headers,
    },
  });
};
export const post = function (url, data = {}, setting = {}) {
  return $.ajax(url, {
    data,
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    ...setting,
    headers: {
      Authorization: 'Bearer ' + token,
      ...setting.headers,
    },
  });
};
