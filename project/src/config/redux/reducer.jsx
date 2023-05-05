import { combineReducers } from '@reduxjs/toolkit';
import { ownerPropertyReducer } from './ownerProperty/ownerPropertySlice';
import { agentPropertyReducer } from './agentProperty/agentPropertySlice';
import { listingDataReducer } from './listingData/listingDataSlice';

const reducer = combineReducers({
  ownerProperty: ownerPropertyReducer,
  agentProperty: agentPropertyReducer,
  listingData: listingDataReducer
});

export default reducer;
