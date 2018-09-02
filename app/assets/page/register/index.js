

import './styles.scss';
import * as ajax from '../../util/ajax';
import * as auth from '../../util/auth';

const $ = window.$;
const $submitBtn = $('button[type="submit"]');

$('#register').on('submit', () => {

  if ($submitBtn.text() !== '注册') return false;
  $submitBtn.text('loading...');

  ajax.post('/api/v1/users/', JSON.stringify({
    phone: $('input[name="phone"]').val(),
    name: $('input[name="name"]').val(),
    password: $('input[name="password"]').val(),
    repeatPassword: $('input[name="repeatPassword"]').val(),
  }))
    .done(body => {
      if (body.code !== 0) {
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
      $submitBtn.text('注册');
    });
  return false;
});
