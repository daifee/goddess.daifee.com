

import './styles.scss';
import * as ajax from '../../util/ajax';
import * as auth from '../../util/auth';

const $ = window.$;

$('#register').on('submit', () => {

  console.warn('TODO show loading');

  ajax.post('/api/v1/users/', JSON.stringify({
    phone: $('input[name="phone"]').val(),
    name: $('input[name="name"]').val(),
    password: $('input[name="password"]').val(),
    repeatPassword: $('input[name="repeatPassword"]').val(),
  }))
    .done(body => {
      if (body.code !== 0) {
        console.warn('TODO show error ' + body.message);
        return;
      }

      auth.set(body.data.token);
      window.location.href = '/';
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
