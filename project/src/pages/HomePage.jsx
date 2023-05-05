import React from 'react';
import { gql, useSubscription } from '@apollo/client';
import {
  Badge,
  Button,
  Card,
  Carousel,
  Select,
  TextInput
} from 'flowbite-react';
import { ArrowRight, Search } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { NavbarComponent } from '../components/organism';
import {
  useLimitListingData,
  useNewListingPrimaryOnlyData,
  useNewListingSecondaryOnlyData,
  useSelectedListingCategory
} from '../config/redux/listingData/listingDataSelector';
import { listingDataAction } from '../config/redux/listingData/listingDataSlice';
import { LoadingData } from '../components/atoms';
import FooterWebsite from '../components/template/FooterWebsite.template';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const limitData = useLimitListingData();
  const listingNewPrimaryOnly = useNewListingPrimaryOnlyData();
  const listingNewSecondaryOnly = useNewListingSecondaryOnlyData();

  const priceFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    notation: 'compact',
    compactDisplay: 'short'
  });

  function convertAreaSqm(area) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    const result = `${formatter.format(area)} m²`;
    return result;
  }

  const NEW_PRIMARY_LISTING_ONLY_SUBSCRIPTION = gql`
    subscription SUBSCRIPTION_NEW_PRIMARY_LISTINGS($limit: Int!) {
      property_listing(
        where: {
          _and: {
            status_listing: { _eq: "Baru" }
            jenislisting: { _eq: "Primary" }
          }
        }
        limit: $limit
        order_by: { id: asc }
      ) {
        id
        gambarlisting
        hargalisting
        listingid
        jenislisting
        tipelisting
        judullisting
        alamatlisting
        kamar_mandi
        kamar_tidur
        luas_bangunan
        luas_tanah
      }
    }
  `;

  const SECONDARY_PRIMARY_LISTING_ONLY_SUBSCRIPTION = gql`
    subscription SUBSCRIPTION_NEW_PRIMARY_LISTINGS($limit: Int!) {
      property_listing(
        where: {
          _and: {
            status_listing: { _eq: "Baru" }
            jenislisting: { _eq: "Secondary" }
          }
        }
        limit: $limit
        order_by: { id: asc }
      ) {
        id
        listingid
        gambarlisting
        hargalisting
        jenislisting
        tipelisting
        judullisting
        alamatlisting
        kamar_mandi
        kamar_tidur
        luas_bangunan
        luas_tanah
      }
    }
  `;

  const { loading: loadingNewPrimaryListingOnly } = useSubscription(
    NEW_PRIMARY_LISTING_ONLY_SUBSCRIPTION,
    {
      variables: { limit: limitData },
      onData: ({ data }) => {
        const dataFetched = data.data?.property_listing;
        dispatch(listingDataAction.setListingNewPrimaryOnly(dataFetched));
      }
    }
  );

  const { loading: loadingNewSecondaryListingOnly } = useSubscription(
    SECONDARY_PRIMARY_LISTING_ONLY_SUBSCRIPTION,
    {
      variables: { limit: limitData },
      onData: ({ data }) => {
        const dataFetched = data.data?.property_listing;
        dispatch(listingDataAction.setListingNewSecondaryOnly(dataFetched));
      }
    }
  );

  return (
    <>
      <NavbarComponent />
      <div className="mt-[5.6rem] lg:mt-28 xl:mt-40 px-0 lg:px-18 xl:px-36">
        {/* Banner STARTREGION */}
        <div className="relative">
          <div className="h-36 md:h-72 lg:h-[400px] xl:h-80 2xl:h-[430px] shadow-lg relative">
            <Carousel slide={true} slideInterval={4000} indicators={true}>
              <div className="rounded-none">
                <img
                  src="../assets/banner/Banner-Website_01.png"
                  alt="banner-web-1"
                />
              </div>
              <div className="rounded-none">
                <img
                  src="../assets/banner/Banner-Website_02.png"
                  alt="banner-web-1"
                />
              </div>
            </Carousel>
          </div>
          <div className="absolute z-10 left-0 right-0 top-[9rem] md:top-[8.5rem] lg:top-[48%] px-5">
            <form>
              <div className="grid md:flex md:justify-center md:gap-2 gap-3">
                <Select className="hidden lg:block">
                  <option>Dijual</option>
                  <option>Disewakan</option>
                </Select>
                <TextInput
                  rightIcon={Search}
                  placeholder="Cari berdasarkan alamat"
                  className="w-full md:w-72 lg:w-[21rem]"
                />
                <Button>CARI</Button>
              </div>
              <div className="grid md:flex md:justify-center md:gap-2 mt-3 gap-3">
                <Select className="hidden lg:block">
                  <option value="" selected>
                    Harga Min
                  </option>
                  <option value="50000000">Rp. 50 Juta</option>
                  <option value="100000000">Rp. 100 Juta</option>
                  <option value="200000000">Rp. 200 Juta</option>
                  <option value="300000000">Rp. 300 Juta</option>
                  <option value="400000000">Rp. 400 Juta</option>
                  <option value="500000000">Rp. 500 Juta</option>
                  <option value="600000000">Rp. 600 Juta</option>
                  <option value="700000000">Rp. 700 Juta</option>
                  <option value="800000000">Rp. 800 Juta</option>
                  <option value="900000000">Rp. 900 Juta</option>
                  <option value="1000000000">Rp. 1 Milliar</option>
                </Select>
                <Select className="hidden lg:block">
                  <option value="" selected>
                    Harga Max
                  </option>
                  <option value="50000000">Rp. 50 Juta</option>
                  <option value="100000000">Rp. 100 Juta</option>
                  <option value="200000000">Rp. 200 Juta</option>
                  <option value="300000000">Rp. 300 Juta</option>
                  <option value="400000000">Rp. 400 Juta</option>
                  <option value="500000000">Rp. 500 Juta</option>
                  <option value="600000000">Rp. 600 Juta</option>
                  <option value="700000000">Rp. 700 Juta</option>
                  <option value="800000000">Rp. 800 Juta</option>
                  <option value="900000000">Rp. 900 Juta</option>
                  <option value="1000000000">Rp. 1 Milliar</option>
                </Select>
                <Select className="hidden lg:block">
                  <option value="" selected>
                    Kamar Tidur
                  </option>
                  <option value="0">0 KT</option>
                  <option value="1">1 KT</option>
                  <option value="2">2 KT</option>
                  <option value="3">3 KT</option>
                  <option value="4">4 KT</option>
                  <option value="5">5 KT</option>
                  <option value="> 5">&gt; 5 KT</option>
                </Select>
                <Select className="hidden lg:block">
                  <option value="" selected>
                    Kamar Mandi
                  </option>
                  <option value="0">0 KT</option>
                  <option value="1">1 KT</option>
                  <option value="2">2 KT</option>
                  <option value="3">3 KT</option>
                  <option value="4">4 KT</option>
                  <option value="5">5 KT</option>
                  <option value="> 5">&gt; 5 KT</option>
                </Select>
              </div>
            </form>
          </div>
        </div>
        {/* Banner ENDREGION */}
        {/* //#TITLE NEW PROPERTY ONLY SECTION  */}
        <div className="flex flex-col md:flex-row justify-between mt-32 md:mt-10 px-6 xl:px-0 lg:my-10">
          <div className="flex items-center w-fit mb-3 lg:mb-0 flex-row-reverse gap-x-3 lg:items-center lg:gap-x-4">
            <h3 className="lg:text-2xl text-2xl font-semibold">
              Properti Baru Untuk Anda
            </h3>
            <img
              src="./assets/icons/new-listing-primary-icons.svg"
              alt=""
              className="w-7 lg:w-8"
            />
          </div>
          <button
            type="button"
            onClick={() => navigate('/dijual?listing_type=Primary')}
            className="text-blue-700 hidden md:flex mr-0 my-auto items-center gap-3 h-fit hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            See More <ArrowRight className="text-lg" />
          </button>
        </div>
        {/* //#TITLE NEW PROPERTY ONLY SECTION ENDREGION */}
        {/* //#CARD NEW PRIMARY LISTING REGION */}
        <div className="grid md:grid-cols-2 md:gap-x-5 lg:grid-cols-3 lg:my-0 xl:grid-cols-4 xl:gap-x-20 xl:px-0 gap-y-5 mt-5 mb-6 px-6">
          {loadingNewPrimaryListingOnly ? (
            <LoadingData />
          ) : (
            listingNewPrimaryOnly.map((dataNewPrimaryListing) => (
              <Link to={`/${dataNewPrimaryListing.listingid}`}>
                <Card
                  imgSrc={
                    dataNewPrimaryListing.jenislisting === 'Primary'
                      ? `./listings/primary/${dataNewPrimaryListing.gambarlisting}`
                      : null
                  }
                  imgAlt={dataNewPrimaryListing.judullisting}
                  className="w-full 2xl:w-max"
                  key={dataNewPrimaryListing.id}
                >
                  <div className="flex gap-2 uppercase">
                    <Badge className="w-max text-lg font-bold" color="gray">
                      {dataNewPrimaryListing.tipelisting}
                    </Badge>
                    <Badge className="w-max text-lg font-bold" color="warning">
                      {dataNewPrimaryListing.jenislisting}
                    </Badge>
                  </div>
                  <h3 className="text-2xl text-sky-500 font-bold tracking-tight">
                    {priceFormatter.format(dataNewPrimaryListing.hargalisting)}
                  </h3>
                  <h5 className="text-sm truncate mb-2">
                    {dataNewPrimaryListing.judullisting}
                  </h5>
                  <hr className="mb-0" />
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 w-fit">
                      <img
                        src="./assets/icons/bed-icon.svg"
                        className="w-4"
                        alt="bed-icon.svg"
                      />
                      <p>{dataNewPrimaryListing.kamar_tidur}</p>
                    </div>
                    <div className="flex items-center gap-2 w-fit">
                      <img
                        src="./assets/icons/bathtub-icon.svg"
                        className="w-4"
                        alt="bed-icon.svg"
                      />
                      <p>{dataNewPrimaryListing.kamar_mandi}</p>
                    </div>
                    <div className="flex items-center gap-2 w-fit">
                      <p>LT</p>
                      <p>{convertAreaSqm(dataNewPrimaryListing.luas_tanah)}</p>
                    </div>
                    <div className="flex items-center gap-2 w-fit">
                      <p>LT</p>
                      <p>
                        {convertAreaSqm(dataNewPrimaryListing.luas_bangunan)}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
          <button
            type="button"
            className="text-blue-700 flex justify-center md:hidden mr-0 mt-1.5 my-auto items-center gap-5 h-fit hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            See More <ArrowRight className="text-lg" />
          </button>
        </div>
        {/* //#CARD NEW PRIMARY LISTING ENDREGION */}
        {/* //#TITLE NEW PROPERTY ONLY SECTION  */}
        <div className="flex flex-col md:flex-row justify-between mt-8 md:mt-10 px-6 xl:px-0 lg:my-10">
          <div className="flex items-center mb-3 w-fit lg:mb-0 flex-row-reverse gap-x-5 lg:items-center lg:gap-6">
            <h3 className="lg:text-2xl text-xl md:text-2xl font-semibold">
              Rekomendasi Properti Untukmu
            </h3>
            <img
              src="./assets/icons/new-listing-secondary-icons.svg"
              alt=""
              className="w-7 lg:w-8"
            />
          </div>
          <button
            type="button"
            onClick={() => navigate('/dijual?listing_type=Secondary')}
            className="text-blue-700 hidden md:flex mr-0 my-auto items-center gap-3 h-fit hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            See More <ArrowRight className="text-lg" />
          </button>
        </div>
        {/* //#TITLE NEW PROPERTY ONLY SECTION ENDREGION */}
        {/* //#CARD NEW PRIMARY LISTING REGION */}
        <div className="grid md:grid-cols-2 md:gap-x-5 lg:grid-cols-3 lg:mb-10 xl:grid-cols-4 xl:gap-x-20 xl:px-0 gap-y-5 mt-5 mb-6 px-6">
          {loadingNewPrimaryListingOnly ? (
            <LoadingData />
          ) : (
            listingNewSecondaryOnly.map((dataNewSecondaryListing) => (
              <Link
                to={`/${dataNewSecondaryListing.listingid}`}
                target="_blank"
              >
                <Card
                  imgSrc={
                    dataNewSecondaryListing.jenislisting === 'Secondary'
                      ? `./listings/secondary/${dataNewSecondaryListing.gambarlisting}`
                      : null
                  }
                  imgAlt={dataNewSecondaryListing.judullisting}
                  className="w-full 2xl:w-max"
                  key={dataNewSecondaryListing.id}
                >
                  <div className="flex gap-2 uppercase">
                    <Badge className="w-max text-lg font-bold" color="gray">
                      {dataNewSecondaryListing.tipelisting}
                    </Badge>
                    <Badge className="w-max text-lg font-bold" color="warning">
                      {dataNewSecondaryListing.jenislisting}
                    </Badge>
                  </div>
                  <h3 className="text-2xl text-sky-500 font-bold tracking-tight">
                    {priceFormatter.format(
                      dataNewSecondaryListing.hargalisting
                    )}
                  </h3>
                  <h5 className="text-sm truncate mb-2">
                    {dataNewSecondaryListing.judullisting}
                  </h5>
                  <hr className="mb-0" />
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 w-fit">
                      <img
                        src="./assets/icons/bed-icon.svg"
                        className="w-4"
                        alt="bed-icon.svg"
                      />
                      <p>{dataNewSecondaryListing.kamar_tidur}</p>
                    </div>
                    <div className="flex items-center gap-2 w-fit">
                      <img
                        src="./assets/icons/bathtub-icon.svg"
                        className="w-4"
                        alt="bed-icon.svg"
                      />
                      <p>{dataNewSecondaryListing.kamar_tidur}</p>
                    </div>
                    <div className="flex items-center gap-2 w-fit">
                      <p>LT</p>
                      <p>
                        {convertAreaSqm(dataNewSecondaryListing.luas_tanah)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 w-fit">
                      <p>LT</p>
                      <p>
                        {convertAreaSqm(dataNewSecondaryListing.luas_bangunan)}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
          <button
            type="button"
            className="text-blue-700 flex justify-center md:hidden mr-0 mt-1.5 my-auto items-center gap-5 h-fit hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            See More <ArrowRight className="text-lg" />
          </button>
        </div>
        {/* //#CARD NEW PRIMARY LISTING ENDREGION */}
        <div className="mb-10 px-6 xl:px-0 md:mt-10 lg:mt-3">
          <img
            src="./assets/banner/banner_before-footer.png"
            alt="before_footer.svg"
          />
        </div>
      </div>
      <FooterWebsite />
    </>
  );
}

export default HomePage;
