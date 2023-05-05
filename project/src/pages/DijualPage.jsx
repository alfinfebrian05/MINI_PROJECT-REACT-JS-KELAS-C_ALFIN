import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CardListing, NavbarComponent } from '../components/organism';
import {
  useDataIsLoading,
  useListingCategoryFiltered
} from '../config/redux/listingData/listingDataSelector';
import { getListingByCategory } from '../data';
import { LoadingData } from '../components/atoms';

function DijualPage() {
  const location = useLocation();
  const pageName = location.pathname.replace('/', '');
  const listingDatas = useListingCategoryFiltered();
  const isLoading = useDataIsLoading();

  function capitalizeString(stringValue) {
    const result = stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
    return result;
  }

  function convertAreaSqm(area) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    const result = `${formatter.format(area)} m²`;
    return result;
  }

  const priceFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    notation: 'compact',
    compactDisplay: 'short'
  });

  const category = capitalizeString(pageName);

  getListingByCategory(category);

  return (
    <>
      <NavbarComponent />
      <div className="mt-28 md:mt-28 xl:mt-40 px-0 lg:px-18 xl:px-36">
        <div className="grid md:grid-cols-2 md:gap-x-5 lg:grid-cols-3 lg:my-0 xl:grid-cols-4 xl:gap-x-20 xl:px-0 gap-y-5 mt-5 mb-6 px-6">
          {isLoading ? (
            <LoadingData />
          ) : (
            listingDatas.map((data) => (
              <Link to={`/${data.listingid}`}>
                <CardListing
                  listingImage={
                    data.jenislisting === 'Secondary'
                      ? `./listings/secondary/${data.gambarlisting}`
                      : `./listings/primary/${data.gambarlisting}`
                  }
                  listingCategory={data.kategorilisting}
                  listingType={data.tipelisting}
                  listingTitle={data.judullisting}
                  listingBedroom={data.kamar_tidur}
                  listingBathroom={data.kamar_mandi}
                  listingLandArea={convertAreaSqm(data.luas_tanah)}
                  listingBuildingArea={convertAreaSqm(data.luas_bangunan)}
                  listingPrice={priceFormatter.format(data.hargalisting)}
                  altImageListing={data.judullisting}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default DijualPage;
