import { createSlice } from '@reduxjs/toolkit';

const ownerInitialState = {
  showForm: false,
  isEdit: false,
  ownerName: '',
  ownerData: []
};

const ownerPropertySlice = createSlice({
  name: 'ownerProperty',
  initialState: ownerInitialState,
  reducers: {
    setOwnerData: (state, action) => {
      return {
        ...state,
        ownerData: action.payload
      };
    },
    setShowForm: (state, action) => {
      return {
        ...state,
        showForm: action.payload
      };
    },
    setOwnerName: (state, action) => {
      return {
        ...state,
        ownerName: action.payload
      };
    },
    setIsEdit: (state, action) => {
      return {
        ...state,
        isEdit: action.payload
      };
    }
  }
});

export const { actions: ownerPropertyAction, reducer: ownerPropertyReducer } =
  ownerPropertySlice;
