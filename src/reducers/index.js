import { combineReducers } from 'redux';

import reducer from './reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';

const rootReducer = combineReducers({
    reducer,
    authentication,
    registration
});

export default rootReducer;