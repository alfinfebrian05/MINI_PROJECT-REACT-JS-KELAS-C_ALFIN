import React from 'react';
import {
  NavbarComponent,
  PropertyTotalCard,
  TableProduct
} from '../components/organism';

function AgentDashboard() {
  return (
    <>
      <NavbarComponent />
      <main className="mt-28 lg:mt-32 xl:mt-40 px-6 lg:px-18 2xl:px-36">
        <div className="relative mix-blend-overlay">
          <img
            src="./assets/banner/banner-dashboard.svg"
            alt="banner-dashboard"
            className="absolute h-[13rem] w-full object-cover object-center opacity-20 lg:h-[40vh] xl:h-[43vh] md:h-[47.5vh] rounded-2xl"
          />
          <div className="absolute -z-10 h-[13rem] w-full bg-[#0f3e6a] dark:bg-[#0f3e6a] bg-opacity-95 lg:h-[40vh] xl:h-[43vh] md:h-[47.5vh] rounded-2xl" />
        </div>
        <div className="px-10 pt-8 pb-10 flex flex-col md:flex-row items-center justify-center gap-5">
          <img
            src="./assets/icons/dashboard/clarity_dashboard-solid.svg"
            alt="clarity_dashboard-solid.svg"
            className="h-14 md:h-10"
          />
          <h1 className="text-white text-2xl text-center md:text-3xl xl:text-4xl font-semibold tracking-wider">
            Dashboard Listing Summary
          </h1>
        </div>
        {/* #GRID OF CARDS region  */}
        <div className="flex justify-center flex-col md:flex-row flex-wrap gap-7 md:gap-6 px-0 mt-4 pb-8 md:pb-16 xl:pb-20 md:my-0 md:px-6 lg:px-8 relative z-10">
          {/* Put Card Here */}
          <PropertyTotalCard
            cardTitle="100+"
            cardLabelContent={
              <>
                <img
                  src="./assets/icons/dashboard/house-icon.svg"
                  alt="house-icon.svg"
                  className="mr-3"
                />
                Total Listing
              </>
            }
          />
          <PropertyTotalCard
            cardTitle="100+"
            cardLabelContent={
              <>
                <img
                  src="./assets/icons/dashboard/peoples-icon.svg"
                  alt="house-icon.svg"
                  className="mr-3"
                />
                Total Listing
              </>
            }
          />
          <PropertyTotalCard
            cardTitle="240"
            cardLabelContent={
              <>
                <img
                  src="./assets/icons/dashboard/money-bubble-chat_icon.svg"
                  alt="house-icon.svg"
                  className="mr-3"
                />
                Total Listing
              </>
            }
          />
          <PropertyTotalCard
            cardTitle="140"
            cardLabelContent={
              <>
                <img
                  src="./assets/icons/dashboard/key-icon.svg"
                  alt="house-icon.svg"
                  className="mr-3"
                />
                Total Listing
              </>
            }
          />
        </div>
        {/* #GRID OF CARDS endregion  */}
        {/* #ADD NEW OWNER CARD region  */}
        <div className="max-w flex flex-col md:flex-row justify-center md:justify-between items-center py-8 lg:px-16 md:py-10 md:px-10 bg-gray-100 rounded-xl mb-6">
          <div className="text-center md:text-start">
            <h5 className="mb-4 md:mb-6 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Add New Owner
            </h5>
            <p className="mb-6 md:mb-0 font-normal md:text-lg text-gray-700 dark:text-gray-400 w-[22rem]">
              Sebelum menambahkan listing, silahkan tambahkan data owner
              property dahulu.
            </p>
          </div>
          <a
            href="/owner"
            className="inline-flex items-center pl-5 pr-3 py-2 text-xl md:text-2xl font-medium text-center text-white bg-[#1f71bc] rounded-lg hover:bg-[#22578c] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Add New Owner
            <img
              src="./assets/icons/dashboard/material-symbols_man.svg"
              alt="material-symbols_man.svg"
              className="md:w-10 w-8 ml-2"
            />
          </a>
        </div>
        {/* #ADD NEW OWNER CARD endregion  */}
        {/* #ADD NEW LISTING CARD region  */}
        <div className="max-w flex flex-col md:flex-row justify-center md:justify-between items-center py-8 lg:px-16 md:py-10 md:px-10 bg-gray-100 rounded-xl mb-6">
          <div className="text-center md:text-start">
            <h5 className="mb-4 md:mb-6 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Add New Listing
            </h5>
            <p className="mb-6 md:mb-0 font-normal text-sm xl:text-md md:text-lg text-gray-700 dark:text-gray-400 w-[24rem]">
              Anda memiliki listing property baru? <br /> Klik “ New Listing “
              untuk tambah listing baru.
            </p>
          </div>
          <a
            href="/"
            className="inline-flex items-center px-5 gap-2 py-3 text-xl md:text-2xl font-medium text-center text-white bg-[#1f71bc] rounded-lg hover:bg-[#22578c] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Add New Listing
            <img
              src="./assets/icons/dashboard/streamline_interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard.svg"
              alt="material-symbols_man.svg"
              className="md:w-7 w-8 ml-2"
            />
          </a>
        </div>
        {/* #ADD NEW LISTING CARD endregion  */}
        <TableProduct />
      </main>
    </>
  );
}

export default AgentDashboard;
