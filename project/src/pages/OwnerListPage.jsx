import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useSubscription, useMutation } from '@apollo/client';
import { v4 as uuid_v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { InputText, LoadingData } from '../components/atoms';
import { NavbarComponent, TableProduct } from '../components/organism';
import {
  useIsEditSelector,
  useOwnerNameSelector,
  useShowFormSelector
} from '../config/redux/ownerProperty/ownerPropertySelector';
import { ownerPropertyAction } from '../config/redux/ownerProperty/ownerPropertySlice';
import DashboardCard from '../components/organism/DashboardCard/DashboardCard.organism';

function OwnerListPage() {
  const { userID } = JSON.parse(localStorage.getItem('dataUser')) || 0;
  const isEdit = useIsEditSelector();
  const ownerName = useOwnerNameSelector();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showForm = useShowFormSelector();

  const handleShowForm = () =>
    dispatch(ownerPropertyAction.setShowForm(!showForm));

  const ADD_OWNER_MUTATION = gql`
    mutation ADD_OWNER_MUTATION(
      $user_id: Int!
      $nama_owner: String!
      $alamat_tinggal: String!
      $nomor_handphone: String!
      $owner_id: String!
    ) {
      insert_owner_property_one(
        object: {
          user_id: $user_id
          nama_owner: $nama_owner
          alamat_tinggal: $alamat_tinggal
          nomor_handphone: $nomor_handphone
          owner_id: $owner_id
        }
      ) {
        nama_owner
      }
    }
  `;

  const DELETE_OWNER_MUTATION = gql`
    mutation DELETE_OWNER_PROPERTY($_eq: String!) {
      delete_owner_property(where: { owner_id: { _eq: $_eq } }) {
        affected_rows
        returning {
          nama_owner
        }
      }
    }
  `;

  const UPDATE_OWNER_MUTATION = gql`
    mutation UPDATE_OWNER_PROPERTY(
      $id: Int!
      $user_id: Int!
      $owner_id: String!
      $nomor_handphone: String!
      $nama_owner: String!
      $alamat_tinggal: String!
    ) {
      update_owner_property_by_pk(
        pk_columns: { id: $id }
        _set: {
          alamat_tinggal: $alamat_tinggal
          nama_owner: $nama_owner
          nomor_handphone: $nomor_handphone
          owner_id: $owner_id
          user_id: $user_id
        }
      ) {
        id
      }
    }
  `;

  const GET_OWNER_SUBSCRIPTION = gql`
    subscription GET_OWNER($_eq: Int!, $_ilike: String!) {
      owner_property(
        where: {
          user_account: { id: { _eq: $_eq } }
          nama_owner: { _ilike: $_ilike }
        }
      ) {
        id
        alamat_tinggal
        nama_owner
        nomor_handphone
        owner_id
        user_id
      }
    }
  `;

  const {
    loading: loadingOwnerSubscription,
    error: errorOwnerSubscription,
    data: dataOwnerSubscription
  } = useSubscription(GET_OWNER_SUBSCRIPTION, {
    variables: {
      _eq: userID,
      _ilike: `%${ownerName}%`
    }
  });

  const totalOwnerProperty = dataOwnerSubscription?.owner_property.length || 0;

  const [
    AddOwnerMutation,
    {
      loading: loadingAddOwnerMutation,
      error: errorAddOwnerMutation,
      data: dataAddOwnerMutation
    }
  ] = useMutation(ADD_OWNER_MUTATION);

  const [
    DeleteOwnerMutation,
    {
      loading: loadingDeleteOwnerMutation,
      error: errorDeleteOwnerMutation,
      data: dataDeleteOwnerMutation
    }
  ] = useMutation(DELETE_OWNER_MUTATION);

  const [
    UpdateOwnerMutation,
    {
      loading: loadingUpdateOwnerMutation,
      error: errorUpdateOwnerMutation,
      data: dataUpdateOwnerMutation
    }
  ] = useMutation(UPDATE_OWNER_MUTATION);

  const formik = useFormik({
    initialValues: {
      id: 0,
      userId: userID,
      namaOwner: '',
      alamatTinggal: '',
      nomorHp: '',
      ownerUuid: `OwPr${uuid_v4()}`
    },
    onSubmit: (formValue) => {
      const { userId, namaOwner, alamatTinggal, nomorHp, ownerUuid } =
        formValue;
      AddOwnerMutation({
        variables: {
          user_id: userId,
          nama_owner: namaOwner,
          alamat_tinggal: alamatTinggal,
          nomor_handphone: nomorHp,
          owner_id: ownerUuid
        }
      });
      formik.resetForm();
    }
  });

  const handleDeleteOwner = (selectedId) => {
    DeleteOwnerMutation({ variables: { _eq: selectedId } });
  };

  const handleEditStatus = (dataOwner) => {
    formik.setValues({
      id: dataOwner.id,
      userId: dataOwner.user_id,
      namaOwner: dataOwner.nama_owner,
      alamatTinggal: dataOwner.alamat_tinggal,
      nomorHp: dataOwner.nomor_handphone,
      ownerUuid: dataOwner.owner_id
    });
    dispatch(ownerPropertyAction.setIsEdit(true));
    handleShowForm();
  };

  const handleChangeEditStatus = () => {
    formik.resetForm();
    dispatch(ownerPropertyAction.setIsEdit(false));
    dispatch(ownerPropertyAction.setShowForm(!showForm));
  };

  const handleUpdateOwner = (newDataOwner, event) => {
    event.preventDefault();
    UpdateOwnerMutation({
      variables: {
        id: newDataOwner.id,
        alamat_tinggal: newDataOwner.alamatTinggal,
        nama_owner: newDataOwner.namaOwner,
        nomor_handphone: newDataOwner.nomorHp,
        owner_id: newDataOwner.ownerUuid,
        user_id: newDataOwner.userId
      }
    });
    dispatch(ownerPropertyAction.setIsEdit(false));
    dispatch(ownerPropertyAction.setShowForm(false));
    formik.resetForm();
  };

  const handleSearchOwner = (event) => {
    const { value } = event.target;
    dispatch(ownerPropertyAction.setOwnerName(value));
  };

  return (
    <>
      <NavbarComponent />
      <main className="mt-28 lg:mt-32 xl:mt-40 px-6 lg:px-18 2xl:px-36">
        <div className="relative mix-blend-overlay">
          <img
            src="./assets/banner/banner-dashboard.svg"
            alt="banner-dashboard"
            className="absolute h-[12rem] w-full object-cover object-center opacity-20 lg:h-[26vh] xl:h-[28vh] md:h-[18vh] rounded-2xl"
          />
          <div className="absolute -z-10 h-[12rem] w-full bg-[#0f3e6a] dark:bg-[#0f3e6a] bg-opacity-95 lg:h-[26vh] xl:h-[28vh] md:h-[18vh] rounded-2xl" />
        </div>
        <div className="px-8 pt-8 pb-16 lg:pb-16 md:pb-22 flex flex-col items-center justify-center">
          <img
            src="./assets/icons/dashboard/material-symbols_man.svg"
            alt="material-symbols_man.svg"
            className="md:w-20 w-16 pb-4"
          />
          <h1 className="text-white text-2xl text-center md:text-3xl xl:text-4xl font-semibold tracking-wider pb-2 lg:pb-4">
            Owner Property List&#39;s
          </h1>
        </div>
        {/* #ADD NEW OWNER CARD region  */}
        {totalOwnerProperty >= 1 ? (
          <>
            <DashboardCard
              cardTitle="Add New Listing Property"
              cardDescription="Anda dapat menambahkan listing baru. Silahkan kembali ke dashboard untuk memulai menambahkan listing"
              cardButtonOnclick={() => navigate('/dashboard')}
              cardButtonContent={
                <>
                  <img
                    src="./assets/icons/dashboard/material-symbols_man.svg"
                    alt="material-symbols_man"
                    className="mr-2 lg:mr-2.5 w-8 lg:w-10"
                  />
                  <p className="text-2xl lg:text-3xl">Kembali ke dashboard</p>
                </>
              }
            />
            <DashboardCard
              cardTitle="Owner Property"
              cardDescription={`Anda telah menambahkan Owner Property (${totalOwnerProperty}). Jika ingin menambahkan owner lagi silahkan klik tombol "Add New Owner" `}
              cardButtonOnclick={() => handleShowForm()}
              cardButtonContent={
                <>
                  <img
                    src="./assets/icons/dashboard/material-symbols_man.svg"
                    alt="material-symbols_man"
                    className="mr-2 lg:mr-2.5 w-8 lg:w-10"
                  />
                  <p className="text-2xl lg:text-3xl">Add New Owner</p>
                </>
              }
            />
          </>
        ) : (
          <DashboardCard
            cardTitle="Owner Property"
            cardDescription="Data Owner Property belum ada. Silahkan menambahkan owner property terlebih dahulu jika ingin mulai menambahkan listing"
            cardButtonOnclick={() => handleShowForm()}
            cardButtonContent={
              <>
                <img
                  src="./assets/icons/dashboard/material-symbols_man.svg"
                  alt="material-symbols_man"
                  className="mr-2 lg:mr-2.5 w-8 lg:w-10"
                />
                <p className="text-2xl lg:text-3xl">Add New Owner</p>
              </>
            }
          />
        )}
        {/* #ADD NEW LISTING CARD endregion  */}
        <div
          className={`${
            showForm ? 'block' : 'hidden'
          } mb-5 bg-gray-50 p-10 rounded-2xl`}
        >
          <h1 className="mb-10 text-center text-2xl">
            {isEdit ? 'Form Edit Owner' : 'Form Add Owner'}
          </h1>
          <form
            onSubmit={
              isEdit
                ? (event) => handleUpdateOwner(formik.values, event)
                : formik.handleSubmit
            }
          >
            <input
              name="userId"
              type="number"
              hidden
              value={formik.values.userId}
              onChange={formik.handleChange}
            />
            <div className="mb-3">
              <InputText
                labelInput="Owner ID"
                inputName="ownerUuid"
                inputType="text"
                changeInput={formik.handleChange}
                value={formik.values.ownerUuid}
              />
            </div>
            <div className="mb-3">
              <InputText
                labelInput="Nama Owner"
                inputName="namaOwner"
                inputType="text"
                changeInput={formik.handleChange}
                value={formik.values.namaOwner}
                placeholderValue="Masukkan nama owner"
              />
            </div>
            <div className="mb-3">
              <InputText
                labelInput="Alamat Tinggal"
                changeInput={formik.handleChange}
                inputName="alamatTinggal"
                inputType="text"
                value={formik.values.alamatTinggal}
                placeholderValue="Masukkan nama owner"
              />
            </div>
            <div className="mb-3">
              <InputText
                labelInput="Nomor HP / Whatsapp"
                changeInput={formik.handleChange}
                inputName="nomorHp"
                value={formik.values.nomorHp}
                inputType="tel"
                placeholderValue="Masukkan nomor handphone"
              />
            </div>
            <div className="flex justify-end pt-2 gap-3">
              <button
                type="submit"
                className="w-full md:w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {isEdit ? 'Update Data' : 'Submit Data Owner'}
              </button>
              <button
                type="button"
                onClick={isEdit ? handleChangeEditStatus : handleShowForm}
                className="w-full md:w-fit text-red-600 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-normal rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                {isEdit ? 'Close Edit Owner' : 'Close Form'}
              </button>
            </div>
          </form>
        </div>
        {/* #ADD NEW LISTING CARD endregion  */}
        <TableProduct
          thead_arr={
            dataOwnerSubscription?.owner_property.length < 1
              ? null
              : [
                  'Nama Owner',
                  'Owner ID',
                  'Alamat Tinggal',
                  'Nomor Handphone',
                  'Action'
                ]
          }
          searchChange={handleSearchOwner}
          searchValue={ownerName}
          searchPlaceholder="Cari owner berdasarkan nama"
          tbody_content={
            <>
              {loadingOwnerSubscription ? (
                <tr>
                  <td className="px-6 py-4">
                    <LoadingData />
                  </td>
                  <td className="px-6 py-4">
                    <LoadingData />
                  </td>
                  <td className="px-6 py-4">
                    <LoadingData />
                  </td>
                  <td className="px-6 py-4">
                    <LoadingData />
                  </td>
                  <td className="px-6 py-4">
                    <LoadingData />
                  </td>
                </tr>
              ) : null}
              {errorOwnerSubscription ? (
                <tr>
                  <td className="px-6 py-4 bg-red-500 text-white">
                    Error Loading Data
                  </td>
                  <td className="px-6 py-4 bg-red-500 text-white">
                    Error Loading Data
                  </td>
                  <td className="px-6 py-4 bg-red-500 text-white">
                    Error Loading Data
                  </td>
                  <td className="px-6 py-4 bg-red-500 text-white">
                    Error Loading Data
                  </td>
                  <td className="px-6 py-4 bg-red-500 text-white">
                    Error Loading Data
                  </td>
                </tr>
              ) : null}
              {dataOwnerSubscription?.owner_property.map((data) => (
                <tr
                  key={parseInt(data.id, 10)}
                  className="text-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 text-gray-900">{data.nama_owner}</td>
                  <td className="px-6 py-4">{data.owner_id}</td>
                  <td className="px-6 py-4">{data.alamat_tinggal}</td>
                  <td className="px-6 py-4">{data.nomor_handphone}</td>
                  <td className="flex flex-col justify-start px-6 py-4">
                    <button
                      type="button"
                      onClick={() => handleEditStatus(data)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-sm px-6 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center gap-4"
                    >
                      <i className="fa-solid fa-pen-to-square" />
                      Edit Data
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 flex items-center justify-between w-max gap-4"
                      onClick={() => handleDeleteOwner(data.owner_id)}
                    >
                      <img
                        src="assets/icons/dashboard/ph_trash-fill.svg"
                        className="h-4"
                        alt="ph_trash-fill.svg"
                      />
                      Delete Owner
                    </button>
                  </td>
                </tr>
              ))}
            </>
          }
        />
      </main>
    </>
  );
}

export default OwnerListPage;
