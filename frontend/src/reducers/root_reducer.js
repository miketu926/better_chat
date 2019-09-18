import { combineReducers } from 'redux';
import session from './session_reducer';
import messages from './message_reducer';
import users from './user_reducer';

const RootReducer = combineReducers({
  session,
  messages,
  users,
});

export default RootReducer;