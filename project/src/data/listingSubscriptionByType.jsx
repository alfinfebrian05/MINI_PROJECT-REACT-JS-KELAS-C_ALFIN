import { gql, useSubscription } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { listingDataAction } from '../config/redux/listingData/listingDataSlice';

const getListingByType = (listing_type) => {
  const dispatch = useDispatch();

  const FILTER_LISTING_BY_TYPE = gql`
    subscription SUBSCRIPTION_BY_CATEGORY($jenislisting: String!) {
      property_listing(where: { jenislisting: { _ilike: $jenislisting } }) {
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
    FILTER_LISTING_BY_TYPE,
    {
      variables: { jenislisting: `%${listing_type}%` },
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

export default getListingByType;
