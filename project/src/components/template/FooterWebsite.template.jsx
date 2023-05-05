import React from 'react';
import { Facebook, Instagram, Linkedin, Tiktok } from 'react-bootstrap-icons';

function FooterWebsite() {
  return (
    <footer className="bg-[#104A80] px-8 pb-10 xl:px-36 xl:pt-4 xl:pb-10 flex flex-wrap lg:grid lg:grid-cols-4 md:gap-6 lg:gap-x-16 text-white">
      <div>
        <img
          src="./assets/logo/logo-footer.png"
          alt="logo-footer.png"
          className="w-54"
        />
        <p>
          AlfinProperty.com adalah situs teknologi jual beli rumah didirikan
          sejak tahun 2023 dan telah melayani puluhan ribu orang pembeli
          properti / rumah secara offline, sebelum situs jual beli rumah
          didirikan.
        </p>
      </div>
      <div className="pt-7">
        <h3 className="text-2xl font-semibold mb-4">Properti Dijual</h3>
        <div className="flex flex-col gap-y-3">
          <a href="#dijual">Rumah Dijual</a>
          <a href="#dijual">Ruko Dijual</a>
          <a href="#dijual">Tanah Dijual</a>
          <a href="#dijual">Apartemen Dijual</a>
          <a href="#dijual">Kosan Dijual</a>
        </div>
      </div>
      <div className="pt-7">
        <h3 className="text-2xl font-semibold mb-4">Properti Disewakan</h3>
        <div className="flex flex-col gap-y-3">
          <a href="#Disewakan">Rumah Disewakan</a>
          <a href="#Disewakan">Ruko Disewakan</a>
          <a href="#Disewakan">Tanah Disewakan</a>
          <a href="#Disewakan">Apartemen Disewakan</a>
          <a href="#Disewakan">Kosan Disewakan</a>
        </div>
      </div>
      <div className="pt-7">
        <h3 className="text-2xl font-semibold mb-4">Perusahaan</h3>
        <div className="flex flex-col gap-y-3">
          <a href="#Disewakan">Karir</a>
          <a href="#Disewakan">Tentang Kami</a>
          <a href="#Disewakan">Kontak Kami</a>
          <a href="#Disewakan">Kebijakan Privasi</a>
          <a href="#Disewakan">Blog</a>
        </div>
      </div>
      <div className="flex flex-col w-max mt-6 md:mt-5">
        <h4 className="text-xl lg:text-2xl font-semibold uppercase">
          Ikuti Kami di Media Sosial
        </h4>
        <ul className="mt-5 flex gap-4">
          <li className="bg-white w-max px-3.5 py-3 text-3xl text-[#104A80] hover:text-white hover:bg-[#3883c9] rounded-full">
            <a href="#instagram">
              <Instagram />
            </a>
          </li>
          <li className="bg-white w-max px-3.5 py-3 text-3xl text-[#104A80] hover:text-white hover:bg-[#3883c9] rounded-full">
            <a href="#instagram">
              <Facebook />
            </a>
          </li>
          <li className="bg-white w-max p-4 text-2xl text-[#104A80] hover:text-white hover:bg-[#3883c9] rounded-full">
            <a href="#instagram">
              <Linkedin />
            </a>
          </li>
          <li className="bg-white w-max p-4 text-2xl text-[#104A80] hover:text-white hover:bg-[#3883c9] rounded-full">
            <a href="#instagram">
              <Tiktok />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default FooterWebsite;
