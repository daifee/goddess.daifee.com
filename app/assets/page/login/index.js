

import './styles.scss';
import * as ajax from '../../util/ajax';
import * as auth from '../../util/auth';

const $ = window.$;

$('#login').on('submit', () => {

  console.warn('TODO show loading');

  ajax.post('/api/v1/authorization', JSON.stringify({
    phone: $('input[name="phone"]').val(),
    password: $('input[name="password"]').val(),
  }))
    .done(body => {
      if (body.code) {
        console.warn('TODO show error ' + body.message);
        return;
      }

      const user = body.data;
      auth.set(user.token);
      window.location.href = `/users/${user.id}`;
    })
    .fail(error => {
      console.log(error);
      console.warn('TODO show error');
    })
    .always(() => {
      console.warn('TODO hide loading');
    });
  return false;
});
