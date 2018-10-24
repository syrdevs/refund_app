import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from './authority';
import setAuth from './setAuth';

let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority());
};

setAuth();

export { reloadAuthorized };
export default Authorized;
