import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useSubscription, useMutation } from '@apollo/client';
import { Modal, Button, TextInput } from 'flowbite-react';
import { v4 as uuid_v4 } from 'uuid';
import { InputText } from '../components/atoms';
import { NavbarComponent, TableProduct } from '../components/organism';

function OwnerListPage() {
  const { userID } = JSON.parse(localStorage.getItem('dataUser')) || 0;
  const [ownerUUID, setOwnerUUID] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => setShowForm(!showForm);

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

  const GET_OWNER_SUBSCRIPTION = gql`
    subscription GET_OWNER($_eq: Int!) {
      owner_property(where: { user_account: { id: { _eq: $_eq } } }) {
        id
        alamat_tinggal
        nama_owner
        nomor_handphone
        owner_id
        user_id
      }
    }
  `;

  const DELETE_OWNER_MUTATION = gql`
    mutation DELETE_OWNER_PROPERTY($_eq: uuid!) {
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

  const {
    loading: loadingOwnerSubscription,
    error: errorOwnerSubscription,
    data: dataOwnerSubscription
  } = useSubscription(GET_OWNER_SUBSCRIPTION, { variables: { _eq: userID } });

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
    setIsEdit(!isEdit);
    handleShowForm();
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
    formik.resetForm();
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
        {/* #ADD NEW LISTING CARD region  */}
        <div className="max-w py-8 lg:px-16 md:py-10 md:px-10 bg-gray-100 rounded-xl mb-6 flex-col md:flex-row flex justify-center md:justify-between items-center">
          <div className="text-center md:text-start">
            <h5 className="mb-4 md:mb-6 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Add New Owner
            </h5>
            <p className="mb-6 md:mb-0 font-normal text-md xl:text-md md:text-lg text-gray-700 dark:text-gray-400 w-[24rem] px-10 md:px-0">
              Ingin menambahkan owner property baru? <br /> &#34; Klik Add New
              Owner &#34; Untuk Menambahkan.
            </p>
          </div>
          <Button onClick={() => handleShowForm()} className="pl-3 py-1">
            <p className="text-2xl mr-2">Add New Owner</p>
            <img
              src="./assets/icons/dashboard/material-symbols_man.svg"
              alt="material-symbols_man.svg"
              className="md:w-10 w-8"
            />
          </Button>
        </div>
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
                onClick={isEdit ? handleEditStatus : handleShowForm}
                className="w-full md:w-fit text-red-600 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-normal rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                {isEdit ? 'Close Edit Owner' : 'Close Form'}
              </button>
            </div>
          </form>
        </div>
        {/* #ADD NEW LISTING CARD endregion  */}
        <TableProduct
          thead_arr={[
            'Nama Owner',
            'Owner ID',
            'Alamat Tinggal',
            'Nomor Handphone',
            'Action'
          ]}
          tbody_content={
            <>
              {loadingOwnerSubscription && (
                <tr>
                  <td className="text-center px-6 py-3 bg-gray-100 z-50 absolute w-full text-md flex flex-row items-center justify-center gap-3">
                    Loading Owner...
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              )}
              {errorOwnerSubscription && (
                <tr>
                  <td className="text-center px-6 py-3 bg-gray-100 z-50 absolute w-full">
                    Loading Owner Error
                  </td>
                </tr>
              )}
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
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-sm px-6 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-between"
                    >
                      <i className="fa-solid fa-pen-to-square" />
                      Edit Data
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 flex items-center justify-between"
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
