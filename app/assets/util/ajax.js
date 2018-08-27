
const $ = window.$;


export const get = $.get;
export const post = function (url, data, setting = {}) {
  return $.ajax(url, {
    data,
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    ...setting,
  });
};
