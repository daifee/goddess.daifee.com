/**
 * 用户权限
 */

import jsCookie from 'js-cookie';


export function get() {
  return jsCookie.get('Authorization');
}

export function set(authorization) {
  return jsCookie.set('Authorization', authorization, {
    expires: 7,
  });
}
