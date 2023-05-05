import { createSlice } from '@reduxjs/toolkit';

const agentPropertyInitialState = {
  listingData: [],
  message: '',
  isEditListing: false,
  isShowForm: false,
  searchListing: '',
  listingSold: 0,
  listingRent: 0
};

const agentPropertySlice = createSlice({
  name: 'agentProperty',
  initialState: agentPropertyInitialState,
  reducers: {
    setListingData: (state, action) => {
      return {
        ...state,
        listingData: action.payload
      };
    },
    setIsShowForm: (state, action) => {
      return {
        ...state,
        isShowForm: action.payload
      };
    },
    setIsEditListing: (state, action) => {
      return {
        ...state,
        isEditListing: action.payload
      };
    },
    setSearchListing: (state, action) => {
      return {
        ...state,
        searchListing: action.payload
      };
    },
    setListingSold: (state, action) => {
      return {
        ...state,
        listingSold: action.payload
      };
    },
    setListingRent: (state, action) => {
      return {
        ...state,
        listingRent: action.payload
      };
    },
    setMessage: (state, action) => {
      return {
        ...state,
        message: action.payload
      };
    }
  }
});

export const { actions: agentPropertyAction, reducer: agentPropertyReducer } =
  agentPropertySlice;
