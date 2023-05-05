import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Button, Card } from 'flowbite-react';
import { ChatFill, TagFill, TelephoneFill } from 'react-bootstrap-icons';
import { NavbarComponent } from '../components/organism';
import {
  useDataIsLoading,
  useListingDataByUuid
} from '../config/redux/listingData/listingDataSelector';
import { getListingByUuid } from '../data';
import { LoadingData } from '../components/atoms';

function DetailListing() {
  const location = window.location.href;
  const param = useParams();
  const navigate = useNavigate();
  const dataListing = useListingDataByUuid();
  const isLoading = useDataIsLoading();
  const { id } = param;

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

  function openWhatsapp(no_handphone, email) {
    const formattedPhoneNumber = no_handphone.replace(/^0/, '62');
    window.open(
      `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}${encodeURI(
        `&text=Hai 👋 ${email}! Saya Tertarik dengan listing Anda (${location})`
      )}`
    );
  }

  getListingByUuid(id);

  return (
    <>
      <NavbarComponent />
      <div className="mt-[6.5rem] mb-6 px-5 md:px-5 lg:mt-32 lg:mb-20 xl:px-[9rem] xl:mt-40">
        {isLoading ? (
          <LoadingData />
        ) : (
          dataListing.map((data) => (
            <>
              <div className="flex flex-col lg:flex-row gap-10">
                <img
                  src={`./listings/${
                    data.jenislisting === 'Primary' ? '/primary' : '/secondary'
                  }/${data.gambarlisting}`}
                  alt={data.judullisting}
                  className="md:w-full xl:w-[39rem] 2xl:w-[50rem] rounded-3xl object-fill"
                />
                <div className="hidden xl:flex-col xl:flex gap-6 w-[21rem]">
                  <Card className="lg:w-max h-max">
                    <div className="flex justify-between items-center">
                      <Avatar rounded />
                      <p className="text-lg">{data?.user_account.email}</p>
                    </div>
                    <hr className="mt-3 mb-2" />
                    <div className="flex justify-between md:justify-end gap-3 items-center">
                      <Button
                        onClick={() => {
                          window.open(
                            `tel:${data?.user_account.phone_number.replace(
                              /^0/,
                              '+62'
                            )}`
                          );
                        }}
                      >
                        {data?.user_account.phone_number.replace(/^0/, '+62')}
                      </Button>
                      <Button
                        onClick={() => {
                          openWhatsapp(
                            data?.user_account.phone_number,
                            data?.user_account.email
                          );
                        }}
                        color="success"
                      >
                        <div className="flex items-center gap-2">
                          <ChatFill />
                          Tanya Unit
                        </div>
                      </Button>
                    </div>
                  </Card>
                  <hr className="mt-4" />
                  <div className="flex gap-2 items-center justify-between">
                    Kategori Listing:{' '}
                    <span className="flex h-fit items-center gap-1 font-semibold bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800 group-hover:bg-blue-200 dark:group-hover:bg-blue-300 rounded px-2 py-0.5 p-1 text-md">
                      {data.kategorilisting}
                    </span>
                  </div>
                  <hr className="mt-0" />
                  <div className="flex items-center justify-between">
                    Jenis Listing:{' '}
                    <span className="flex h-fit items-center gap-1 font-semibold bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800 group-hover:bg-blue-200 dark:group-hover:bg-blue-300 rounded px-2 py-0.5 p-1 text-md">
                      <span>{data.jenislisting}</span>
                    </span>
                  </div>
                  <hr className="mt-0" />
                  <div className="flex gap-5 items-center justify-between truncate">
                    Listing ID:{' '}
                    <span className="flex h-fit items-center gap-1 font-semibold bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800 group-hover:bg-blue-200 dark:group-hover:bg-blue-300 rounded px-2 py-0.5 p-1 text-md">
                      <span>{data.listingid}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-6 divide-y gap-y-6 md:w-full xl:w-[42rem] 2xl:w-[50rem]">
                <div className="flex flex-col gap-5 md:flex-row-reverse md:justify-between xl:flex-row">
                  <div className="block xl:hidden">
                    <div className="flex justify-between gap-4 items-center border p-5 mb-6 rounded-xl">
                      <p className="flex items-center gap-2">
                        <TagFill /> Tags
                      </p>
                      <span className="flex h-fit items-center gap-1 font-semibold bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800 group-hover:bg-blue-200 dark:group-hover:bg-blue-300 rounded px-2 py-0.5 p-1 text-md">
                        <span>{data.kategorilisting}</span>
                      </span>
                      <span className="flex h-fit items-center gap-1 font-semibold bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800 group-hover:bg-blue-200 dark:group-hover:bg-blue-300 rounded px-2 py-0.5 p-1 text-md">
                        <span>{data.jenislisting}</span>
                      </span>
                      <span className="flex h-fit capitalize items-center gap-1 font-semibold bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800 group-hover:bg-blue-200 dark:group-hover:bg-blue-300 rounded px-2 py-0.5 p-1 text-md">
                        <span>{data.tipelisting}</span>
                      </span>
                    </div>
                    <Card className="lg:w-max h-max">
                      <div className="flex justify-between items-center">
                        <Avatar rounded />
                        <p className="text-lg">{data?.user_account.email}</p>
                      </div>
                      <hr className="mt-3 mb-2" />
                      <div className="flex items-center md:justify-end gap-3">
                        <button
                          type="button"
                          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[0.925rem] flex items-center justify-center gap-3 px-3 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                          onClick={() => {
                            window.open(
                              `tel:${data?.user_account.phone_number.replace(
                                /^0/,
                                '+62'
                              )}`
                            );
                          }}
                        >
                          <TelephoneFill />
                          {data?.user_account.phone_number.replace(/^0/, '+62')}
                        </button>
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md flex items-center justify-center gap-3 px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          onClick={() => {
                            openWhatsapp(
                              data?.user_account.phone_number,
                              data?.user_account.email
                            );
                          }}
                        >
                          <ChatFill />
                          Tanya Unit
                        </button>
                      </div>
                    </Card>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-blue-800 dark:text-blue-800">
                      {priceFormatter.format(data.hargalisting)}
                    </h1>
                    <h1 className="text-xl lg:text-2xl mt-4 text-dark">
                      {data.judullisting}
                    </h1>
                    <h1 className="text-sm mt-2 text-gray-400">
                      {data.alamatlisting}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col pt-5 gap-5 divide-y">
                  <div>
                    <h1 className="text-xl font-semibold text-gray-700 mb-3">
                      Informasi Properti
                    </h1>
                    <h6 className="text-xs text-gray-500">
                      Spesifikasi Properti
                    </h6>
                    <div className="pt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      <div className="shadow-none border px-4 py-3 flex flex-col gap-2 rounded-xl">
                        <h1 className="text-gray-400">K. Tidur</h1>
                        {data.kamar_tidur}
                      </div>
                      <div className="shadow-none border px-4 py-3 flex flex-col gap-2 rounded-xl">
                        <h1 className="text-gray-400">K. Mandi</h1>
                        {data.kamar_mandi}
                      </div>
                      <div className="shadow-none border px-4 py-3 flex flex-col gap-2 rounded-xl">
                        <h1 className="text-gray-400">L. Tanah</h1>
                        {convertAreaSqm(data.luas_tanah)}
                      </div>
                      <div className="shadow-none border px-4 py-3 flex flex-col gap-2 rounded-xl">
                        <h1 className="text-gray-400">L. Bangunan</h1>
                        {convertAreaSqm(data.luas_bangunan)}
                      </div>
                      <div className="shadow-none border px-4 py-3 flex flex-col gap-2 rounded-xl">
                        <h1 className="text-gray-400">Tipe Listing</h1>
                        <p className="capitalize">{data.tipelisting}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-5">
                    <h6 className="text-xs mb-2 text-gray-500">
                      Deskripsi Properti
                    </h6>
                    {data.spesifikasilisting}
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
}

export default DetailListing;
