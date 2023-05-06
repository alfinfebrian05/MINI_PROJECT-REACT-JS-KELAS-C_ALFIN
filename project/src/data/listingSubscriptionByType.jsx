import { gql, useSubscription } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { useEffect } from 'react';
import { listingDataAction } from '../config/redux/listingData/listingDataSlice';
import { useDataIsLoading } from '../config/redux/listingData/listingDataSelector';

const getListingByFilter = (listing_type, category) => {
  const dispatch = useDispatch();
  const isLoading = useDataIsLoading();

  const SUBSCRIPTION_LISTING_BY_FILTER = gql`
    subscription SUBSCRIPTION_BY_FILTERS(
      $jenislisting: String!
      $kategorilisting: String!
    ) {
      property_listing(
        where: {
          jenislisting: { _ilike: $jenislisting }
          kategorilisting: { _ilike: $kategorilisting }
        }
      ) {
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

  const { loading: loadingFilteredListingByType } = useSubscription(
    SUBSCRIPTION_LISTING_BY_FILTER,
    {
      variables: {
        jenislisting: `%${listing_type}%`,
        kategorilisting: `%${category}%`
      },
      onData: ({ data }) => {
        const dataFetched = data.data?.property_listing;
        dispatch(listingDataAction.setListingCategoryFiltered(dataFetched));
      }
    }
  );

  if (loadingFilteredListingByType) {
    dispatch(listingDataAction.setDataIsLoading(true));
  } else {
    dispatch(listingDataAction.setDataIsLoading(false));
  }
};

export default getListingByFilter;
