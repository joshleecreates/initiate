import {combineReducers} from 'redux';

import {creatures} from './models/creatures';
import {stateManagement} from './stateManagement';
import {time} from './time';

export default function (state, action) {
  return stateManagement(state, action, combineReducers({
    creatures,
    time,
  }));
}
