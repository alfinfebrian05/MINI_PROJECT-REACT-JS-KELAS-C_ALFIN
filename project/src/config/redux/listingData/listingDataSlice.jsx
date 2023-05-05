import { createSlice } from '@reduxjs/toolkit';

const listingDataInitialState = {
  listingNewPrimaryOnly: [],
  listingNewSecondaryOnly: [],
  limitData: 4,
  categorySelected: '',
  listingCategoryFiltered: [],
  listingDataByUuid: [],
  dataIsLoading: false
};

const listingDataSlice = createSlice({
  name: 'listingData',
  initialState: listingDataInitialState,
  reducers: {
    setListingNewPrimaryOnly: (state, action) => {
      return {
        ...state,
        listingNewPrimaryOnly: action.payload
      };
    },
    setListingNewSecondaryOnly: (state, action) => {
      return {
        ...state,
        listingNewSecondaryOnly: action.payload
      };
    },
    setLimitData: (state, action) => {
      return {
        ...state,
        limitData: action.payload
      };
    },
    setDataIsLoading: (state, action) => {
      return {
        ...state,
        dataIsLoading: action.payload
      };
    },
    setListingCategoryFiltered: (state, action) => {
      return {
        ...state,
        listingCategoryFiltered: action.payload
      };
    },
    setListingDataByUuid: (state, action) => {
      return {
        ...state,
        listingDataByUuid: action.payload
      };
    },
    setCategoryListing: (state, action) => {
      return {
        ...state,
        categorySelected: action.payload
      };
    }
  }
});

export const { actions: listingDataAction, reducer: listingDataReducer } =
  listingDataSlice;
