import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge, Card } from 'flowbite-react';
import getListingByType from '../data/listingSubscriptionByType';
import {
  useDataIsLoading,
  useListingCategoryFiltered
} from '../config/redux/listingData/listingDataSelector';
import { NavbarComponent } from '../components/organism';
import { LoadingData } from '../components/atoms';

function ListingByType() {
  const param = useParams();
  const listingType = param.type;
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

  getListingByType(listingType);

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
                <Card
                  imgSrc={
                    data.jenislisting === 'Primary'
                      ? `../listings/primary/${data.gambarlisting}`
                      : `../listings/secondary/${data.gambarlisting}`
                  }
                  imgAlt={data.judullisting}
                  className="w-full 2xl:w-max "
                >
                  <div className="flex gap-2 uppercase">
                    <Badge className="w-max text-lg font-bold" color="gray">
                      {listingType}
                    </Badge>
                    <Badge className="w-max text-lg font-bold" color="warning">
                      {data.kategorilisting}
                    </Badge>
                  </div>
                  <h3 className="text-2xl text-sky-500 font-bold tracking-tight">
                    {priceFormatter.format(data.hargalisting)}
                  </h3>
                  <h5 className="text-sm truncate mb-2">{data.judullisting}</h5>
                  <hr className="mb-0" />
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 w-fit">
                      <img
                        src="../assets/icons/bed-icon.svg"
                        className="w-4"
                        alt="bed-icon.svg"
                      />
                      <p>{data.kamar_tidur}</p>
                    </div>
                    <div className="flex items-center gap-2 w-fit">
                      <img
                        src="../assets/icons/bathtub-icon.svg"
                        className="w-4"
                        alt="bed-icon.svg"
                      />
                      <p>{data.kamar_mandi}</p>
                    </div>
                    <div className="flex items-center gap-2 w-fit">
                      <p>LT</p>
                      <p>{convertAreaSqm(data.luas_tanah)}</p>
                    </div>
                    <div className="flex items-center gap-2 w-fit">
                      <p>LB</p>
                      <p>{convertAreaSqm(data.luas_bangunan)}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ListingByType;
