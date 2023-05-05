import { useSelector } from 'react-redux';

export const useNewListingPrimaryOnlyData = () =>
  useSelector((state) => state.listingData.listingNewPrimaryOnly);

export const useNewListingSecondaryOnlyData = () =>
  useSelector((state) => state.listingData.listingNewSecondaryOnly);

export const useLimitListingData = () =>
  useSelector((state) => state.listingData.limitData);

export const useSelectedListingCategory = () =>
  useSelector((state) => state.listingData.categorySelected);

export const useListingCategoryFiltered = () =>
  useSelector((state) => state.listingData.listingCategoryFiltered);

export const useListingDataByUuid = () =>
  useSelector((state) => state.listingData.listingDataByUuid);

export const useDataIsLoading = () =>
  useSelector((state) => state.listingData.dataIsLoading);
