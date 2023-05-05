import { useEffect } from 'react';
import { gql, useSubscription } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { useSelectedListingCategory } from '../config/redux/listingData/listingDataSelector';
import { listingDataAction } from '../config/redux/listingData/listingDataSlice';

const getListingByCategory = (listing_category) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'listingData/setCategoryListing',
      payload: listing_category
    });
  }, []);

  const listingCategory = useSelectedListingCategory();

  const FILTER_LISTING_BY_CATEGORY = gql`
    subscription SUBSCRIPTION_BY_CATEGORY($kategorilisting: String!) {
      property_listing(where: { kategorilisting: { _eq: $kategorilisting } }) {
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
    FILTER_LISTING_BY_CATEGORY,
    {
      variables: { kategorilisting: listingCategory },
      onData: ({ data }) => {
        const dataFetched = data.data?.property_listing;
        dispatch(listingDataAction.setListingCategoryFiltered(dataFetched));
      }
    }
  );

  if (loadingFilteredListingByCategory) {
    dispatch(listingDataAction.setDataIsLoading(true));
  } else {
    dispatch(listingDataAction.setDataIsLoading(false));
  }
};

export default getListingByCategory;
