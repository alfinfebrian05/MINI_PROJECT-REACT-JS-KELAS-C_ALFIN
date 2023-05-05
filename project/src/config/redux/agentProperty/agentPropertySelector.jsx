import { useSelector } from 'react-redux';

export const useAgentListingData = () =>
  useSelector((state) => state.agentProperty.listingData);

export const useIsEditListing = () =>
  useSelector((state) => state.agentProperty.isEditListing);

export const useIsShowForm = () =>
  useSelector((state) => state.agentProperty.isShowForm);

export const useSearchListing = () =>
  useSelector((state) => state.agentProperty.searchListing);

export const useTotalListingSold = () =>
  useSelector((state) => state.agentProperty.listingSold);

export const useTotalListingRent = () =>
  useSelector((state) => state.agentProperty.listingRent);
