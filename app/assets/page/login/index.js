

import './styles.scss';
import * as ajax from '../../util/ajax';
import * as auth from '../../util/auth';

const $ = window.$;
const $submitBtn = $('button[type="submit"]');

$('#login').on('submit', () => {

  if ($submitBtn.text() !== '登录') return false;
  $submitBtn.text('loading...');

  ajax.post('/api/v1/authorization', JSON.stringify({
    phone: $('input[name="phone"]').val(),
    password: $('input[name="password"]').val(),
  }))
    .done(body => {
      if (body.code) {
        // eslint-disable-next-line
        window.alert(body.message);
        return;
      }

      const user = body.data;
      auth.set(user.token);
      window.location.href = `/users/${user.id}`;
    })
    .fail(error => {
      // eslint-disable-next-line
      window.alert(error.message);
    })
    .always(() => {
      $submitBtn.text('登录');
    });
  return false;
});
