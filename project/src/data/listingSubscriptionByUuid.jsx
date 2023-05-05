import { useEffect } from 'react';
import { gql, useSubscription } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { useSelectedListingCategory } from '../config/redux/listingData/listingDataSelector';
import { listingDataAction } from '../config/redux/listingData/listingDataSlice';

const getListingByUuid = (listingUUID) => {
  const dispatch = useDispatch();

  const GET_LISTING_BY_LISTING_ID = gql`
    subscription SUBSCRIPTION_BY_CATEGORY($_eq: String!) {
      property_listing(where: { listingid: { _eq: $_eq } }) {
        alamatlisting
        gambarlisting
        hargalisting
        jenis_sertifikat
        id
        jenislisting
        judullisting
        kamar_mandi
        kamar_tidur
        kategorilisting
        listingid
        luas_bangunan
        luas_tanah
        status_listing
        spesifikasilisting
        propertyowner
        tipelisting
        user_account {
          phone_number
          email
        }
      }
    }
  `;

  const { loading: loadingFilteredListingByCategory } = useSubscription(
    GET_LISTING_BY_LISTING_ID,
    {
      variables: { _eq: listingUUID },
      onData: ({ data }) => {
        const dataFetched = data.data?.property_listing;
        dispatch(listingDataAction.setListingDataByUuid(dataFetched));
      }
    }
  );

  if (loadingFilteredListingByCategory) {
    dispatch(listingDataAction.setDataIsLoading(true));
  } else {
    dispatch(listingDataAction.setDataIsLoading(false));
  }
};

export default getListingByUuid;
