import { makeMap } from './components/models/models';
import { user } from './user';

export default makeMap<any>(user.get('accounts'));
