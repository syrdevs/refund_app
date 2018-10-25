import ajax from 'axios';
import jwtdecode from 'jwt-decode';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default function(isToken = false) {
  const token = localStorage.getItem('token');

  if (isToken) return token;

  if (token) {
    const decoded = jwtdecode(token);
    if (decoded.exp > Date.now() / 1000) {
      //ajax.defaults.headers.common['Authorization'] = token;
      // store.dispatch({
      //   type: SET_CURRENT_USER,
      //   payload: {isAuthenticated: true, user:decoded}
      //
      // })
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('antd-pro-authority');
      setAuthority('guest');
      reloadAuthorized();
    }
  } else {
    //delete ajax.defaults.headers.common['Authorization'];
  }
}
