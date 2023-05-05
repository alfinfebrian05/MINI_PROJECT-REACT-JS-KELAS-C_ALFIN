import { useSelector } from 'react-redux';

export const useOwnerDataSelector = () =>
  useSelector((state) => state.ownerProperty.ownerData);

export const useShowFormSelector = () =>
  useSelector((state) => state.ownerProperty.showForm);

export const useIsEditSelector = () =>
  useSelector((state) => state.ownerProperty.isEdit);

export const useOwnerNameSelector = () =>
  useSelector((state) => state.ownerProperty.ownerName);
