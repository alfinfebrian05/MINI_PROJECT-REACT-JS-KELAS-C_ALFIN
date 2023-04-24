import React, { useState } from 'react';

function NavbarComponent() {
  const userData = JSON.parse(localStorage.getItem('dataUser')) || false;
  const [showMiniNavbar, setShowMiniNavbar] = useState(false);
  const [showDropDownMobile, setShowDropDownMobile] = useState(false);
  return (
    <header>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <img
              src="./assets/logo/logo-web.png"
              className="h-14 lg:h-20 xl:h-24 mr-3"
              alt="Flowbite Logo"
            />
          </a>
          <div className="flex items-center justify-between md:order-2">
            <button
              id="avatarButton"
              type="button"
              data-dropdown-toggle="userDropdown"
              data-dropdown-placement="bottom-end"
              className="h-10 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2 mt-2 md:mt-0 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 w-fit"
              alt="User dropdown"
              onClick={() => setShowMiniNavbar(!showMiniNavbar)}
            >
              {userData.loggedIn ? (
                <div>
                  <i className="fa-solid fa-circle-user mr-2" />
                  {userData.email.replace(/[\d]+@([\w-]+\.)+[\w-]{0,32}$/g, '')}
                </div>
              ) : (
                <>
                  Akun <i className="fa-solid fa-circle-user ml-2" />
                </>
              )}
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowDropDownMobile(!showDropDownMobile)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            id="userDropdown"
            className={`z-10 ${
              showMiniNavbar ? '' : 'hidden'
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-700 dark:divide-gray-600`}
          >
            <div className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
              <h1 className="text-lg tracking-wide">Aktivitas Akun</h1>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="avatarButton"
            >
              <li>
                {userData.loggedIn ? (
                  <>
                    <a
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-blue"
                      href="/dashboard"
                    >
                      Manage Listings
                    </a>
                    <a
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      href="/logout"
                    >
                      <button
                        type="button"
                        className="text-white bg-red-500 hover:bg-red-700 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 w-full"
                        href="/logout"
                      >
                        Logout
                      </button>
                    </a>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <button
                      type="button"
                      className="text-black bg-yellow-200 hover:bg-yellow-300 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 w-full"
                    >
                      Login / Register
                      <i className="fa-solid fa-arrow-right-to-bracket ml-2" />
                    </button>
                  </a>
                )}
              </li>
            </ul>
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div className="mb-4">Ingin properti Anda cepat terjual?</div>
              <a
                href="/"
                className="block dark:hover:bg-gray-600 dark:hover:text-white text-white bg-green-500 hover:bg-green-600 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center mr-3 md:mr-0 w-full"
              >
                <i className="fa-brands fa-whatsapp mr-2" />
                Titip Jual / Sewa
              </a>
            </div>
          </div>
          <div
            className={`items-center ${
              showDropDownMobile ? '' : 'hidden'
            } w-full md:flex md:w-auto md:order-1"
            `}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Dijual
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Disewakan
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavbarComponent;
