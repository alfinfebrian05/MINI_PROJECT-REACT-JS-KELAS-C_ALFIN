import React from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';

import { Button, FileInput, Label, TextInput, Textarea } from 'flowbite-react';
import {
  BadgeWcFill,
  CardText,
  CashStack,
  Diagram3Fill,
  DoorClosedFill,
  FileEarmarkArrowUp,
  Fonts,
  GeoAltFill,
  HouseCheckFill,
  HouseFill,
  PeopleFill,
  Rulers,
  TagFill,
  TextareaT
} from 'react-bootstrap-icons';
import { useOwnerDataSelector } from '../config/redux/ownerProperty/ownerPropertySelector';

import {
  useAgentListingData,
  useIsEditListing,
  useIsShowForm,
  useSearchListing,
  useTotalListingSold,
  useTotalListingRent
} from '../config/redux/agentProperty/agentPropertySelector';

import { agentPropertyAction } from '../config/redux/agentProperty/agentPropertySlice';

import {
  InputText,
  LoadingData,
  TableData,
  TableRow
} from '../components/atoms';
import { SelectInput } from '../components/molecule';
import {
  CardForm,
  DashboardCard,
  NavbarComponent,
  PropertyTotalCard,
  RadioFields,
  TableProduct
} from '../components/organism';

function AgentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const agentAction = agentPropertyAction;
  const ownerData = useOwnerDataSelector();
  const showForm = useIsShowForm();
  const searchListingTitle = useSearchListing();
  const isEditListing = useIsEditListing();
  const listingData = useAgentListingData();
  const totalListingSold = useTotalListingSold();
  const totalListingRent = useTotalListingRent();
  const { userID } = JSON.parse(localStorage.getItem('dataUser')) || 0;

  const GET_OWNER_SUBSCRIPTION = gql`
    subscription GET_OWNER($_eq: Int!) {
      owner_property(where: { user_account: { id: { _eq: $_eq } } }) {
        id
        nama_owner
      }
    }
  `;

  const GET_DATA_LISTING_SUBSCRIPTION = gql`
    subscription GET_DATA_LISTING($_eq: Int!, $_ilike: String!) {
      property_listing(
        where: { user_id: { _eq: $_eq }, judullisting: { _ilike: $_ilike } }
        order_by: { id: asc }
      ) {
        tipelisting
        spesifikasilisting
        propertyowner
        listingid
        kategorilisting
        judullisting
        jenislisting
        gambarlisting
        id
        hargalisting
        alamatlisting
        user_id
        status_listing
        kamar_tidur
        kamar_mandi
        luas_bangunan
        luas_tanah
        jenis_sertifikat
      }
    }
  `;

  const ADD_NEW_LISTING_MUTATION = gql`
    mutation ADD_NEW_LISTING(
      $alamatlisting: String!
      $gambarlisting: String!
      $hargalisting: numeric!
      $jenislisting: String!
      $judullisting: String!
      $kategorilisting: String!
      $listingid: String!
      $propertyowner: String!
      $spesifikasilisting: String!
      $tipelisting: String!
      $user_id: Int!
      $status_listing: String!
      $kamar_tidur: Int!
      $kamar_mandi: Int!
      $luas_bangunan: Int!
      $luas_tanah: Int!
      $jenis_sertifikat: String!
    ) {
      insert_property_listing_one(
        object: {
          alamatlisting: $alamatlisting
          gambarlisting: $gambarlisting
          hargalisting: $hargalisting
          jenislisting: $jenislisting
          judullisting: $judullisting
          kategorilisting: $kategorilisting
          listingid: $listingid
          propertyowner: $propertyowner
          spesifikasilisting: $spesifikasilisting
          tipelisting: $tipelisting
          user_id: $user_id
          status_listing: $status_listing
          kamar_tidur: $kamar_tidur
          kamar_mandi: $kamar_mandi
          luas_bangunan: $luas_bangunan
          luas_tanah: $luas_tanah
          jenis_sertifikat: $jenis_sertifikat
        }
      ) {
        judullisting
      }
    }
  `;

  const DELETE_LISTING_MUTATION = gql`
    mutation DELETE_LISTING_BY_ID($_eq: String!) {
      delete_property_listing(where: { listingid: { _eq: $_eq } }) {
        returning {
          judullisting
        }
        affected_rows
      }
    }
  `;

  const UPDATE_DATA_LISTING = gql`
    mutation UPDATE_DATA_LISTING(
      $id: Int!
      $alamatlisting: String!
      $gambarlisting: String!
      $hargalisting: numeric!
      $jenislisting: String!
      $judullisting: String!
      $kategorilisting: String!
      $listingid: String!
      $propertyowner: String!
      $spesifikasilisting: String!
      $tipelisting: String!
      $user_id: Int!
      $status_listing: String!
      $kamar_tidur: Int!
      $kamar_mandi: Int!
      $luas_bangunan: Int!
      $luas_tanah: Int!
      $jenis_sertifikat: String!
    ) {
      update_property_listing_by_pk(
        pk_columns: { id: $id }
        _set: {
          alamatlisting: $alamatlisting
          gambarlisting: $gambarlisting
          hargalisting: $hargalisting
          jenislisting: $jenislisting
          judullisting: $judullisting
          kategorilisting: $kategorilisting
          listingid: $listingid
          propertyowner: $propertyowner
          spesifikasilisting: $spesifikasilisting
          tipelisting: $tipelisting
          status_listing: $status_listing
          user_id: $user_id
          kamar_tidur: $kamar_tidur
          kamar_mandi: $kamar_mandi
          luas_bangunan: $luas_bangunan
          luas_tanah: $luas_tanah
          jenis_sertifikat: $jenis_sertifikat
        }
      ) {
        judullisting
      }
    }
  `;

  const COUNT_LISTING_SOLD = gql`
    subscription CountListingsSold {
      count_property_listings_with_status: property_listing_aggregate(
        where: { status_listing: { _eq: "Terjual" } }
      ) {
        aggregate {
          count
        }
      }
    }
  `;

  const COUNT_LISTING_RENTED = gql`
    subscription CountListingsSold {
      count_property_listings_with_status: property_listing_aggregate(
        where: { status_listing: { _eq: "Tersewa" } }
      ) {
        aggregate {
          count
        }
      }
    }
  `;

  const [AddNewListingMutation] = useMutation(ADD_NEW_LISTING_MUTATION);
  const [DeleteListingMutation] = useMutation(DELETE_LISTING_MUTATION);
  const [UpdateListingMutation] = useMutation(UPDATE_DATA_LISTING);

  const {
    loading: loadingOwnerSubscription,
    error: errorOwnerSubscription,
    data: dataOwnerSubscription
  } = useSubscription(GET_OWNER_SUBSCRIPTION, {
    variables: { _eq: userID },
    onData: ({ data }) =>
      dispatch({
        type: 'ownerProperty/setOwnerData',
        payload: data.data?.owner_property
      })
  });

  const {
    loading: loadingDataListingSubscription,
    error: errorDataListingSubscription,
    data: dataDataListingSubscription
  } = useSubscription(GET_DATA_LISTING_SUBSCRIPTION, {
    variables: { _eq: userID, _ilike: `%${searchListingTitle}%` },
    onData: ({ data }) => {
      dispatch({
        type: 'agentProperty/setListingData',
        payload: data.data?.property_listing
      });
    }
  });

  const {
    data: dataListingSold,
    loading: loadingListingSold,
    error: errorListingSold
  } = useSubscription(COUNT_LISTING_SOLD, {
    onData: ({ data }) => {
      const totalSoldListing =
        data.data?.count_property_listings_with_status?.aggregate?.count;
      dispatch({
        type: 'agentProperty/setListingSold',
        payload: totalSoldListing
      });
    }
  });

  const { loading: loadingRentedListing, error: errorLoadRentedListing } =
    useSubscription(COUNT_LISTING_RENTED, {
      onData: ({ data }) => {
        const totalListingRented =
          data.data?.count_property_listings_with_status?.aggregate?.count;
        dispatch({
          type: 'agentProperty/setListingRent',
          payload: totalListingRented
        });
      }
    });

  const totalOwnerProperty = loadingOwnerSubscription ? (
    <LoadingData />
  ) : (
    ownerData.length
  );

  const totalListing = listingData.length;

  const formListingValidation = Yup.object({
    judulListing: Yup.string().required('Judul listing tidak boleh kosong!'),
    spesifikasiListing: Yup.string().required(
      'Spesifikasi listing tidak boleh kosong!'
    ),
    hargaListing: Yup.string().required('Harga listing tidak boleh kosong!'),
    alamatListing: Yup.string().required('Alamat listing tidak boleh kosong!'),
    propertyOwner: Yup.string().required('Owner Property tidak boleh kosong!'),
    jenisListing: Yup.string().required(
      'Jenis listing tidak boleh kosong! Silahkan pilih salah satu jenis listing'
    ),
    kategoriListing: Yup.string().required(
      'Kategori listing tidak boleh kosong! Silahkan pilih salah satu kategori listing'
    ),
    tipeListing: Yup.string().required(
      'Tipe listing tidak boleh kosong! Silahkan pilih salah satu tipe listing'
    ),
    kamarTidur: Yup.number().min(1, 'Jumlah kamar tidur minimal 1'),
    kamarMandi: Yup.number().min(1, 'Jumlah kamar mandi minimal 1'),
    luasBangunan: Yup.number().min(10, 'Luas bangunan minimal 10 m2'),
    luasTanah: Yup.number().min(10, 'Luas tanah minimal 10 m2'),
    jenisSertifikat: Yup.string().required('Jenis Sertifikat harus dipilih!')
  });

  const priceFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  const formik = useFormik({
    initialValues: {
      id: 0,
      userId: userID.toString(),
      listingID: uuidv4(),
      judulListing: '',
      jenisListing: '',
      kategoriListing: '',
      tipeListing: '',
      spesifikasiListing: '',
      gambarListing: null,
      hargaListing: 0,
      alamatListing: '',
      statusListing: '',
      propertyOwner: '',
      kamarTidur: 0,
      kamarMandi: 0,
      luasBangunan: 0,
      luasTanah: 0,
      jenisSertifikat: ''
    },
    validationSchema: formListingValidation,
    onSubmit: async (values) => {
      try {
        const { data } = await AddNewListingMutation({
          variables: {
            alamatlisting: values.alamatListing,
            gambarlisting: values.gambarListing,
            hargalisting: values.hargaListing,
            jenislisting: values.jenisListing,
            judullisting: values.judulListing,
            kategorilisting: values.kategoriListing,
            listingid: values.listingID,
            propertyowner: values.propertyOwner,
            spesifikasilisting: values.spesifikasiListing,
            tipelisting: values.tipeListing,
            user_id: values.userId,
            status_listing: values.statusListing,
            kamar_tidur: values.kamarTidur,
            kamar_mandi: values.kamarMandi,
            luas_bangunan: values.luasBangunan,
            luas_tanah: values.luasTanah,
            jenis_sertifikat: values.jenisSertifikat
          }
        });
        if (data) {
          alert('Success add listing!');
          formik.resetForm();
          formik.setFieldValue('listingID', uuidv4());
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  const handleShowFormListing = () => {
    dispatch(agentAction.setIsShowForm(!showForm));
    formik.resetForm();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0].name;
    formik.setFieldValue('gambarListing', file);
  };

  const handleDeleteByListingId = (listing_id, judul_listing) => {
    const confirmDelete = window.confirm(
      `Anda yakin ingin menghapus listing "${judul_listing}" ? Listing terhapus tidak dapat dikembalikan!`
    );
    if (confirmDelete) {
      DeleteListingMutation({ variables: { _eq: listing_id } });
    }
  };

  const handleCloseEdit = () => {
    dispatch(agentAction.setIsEditListing(false));
    formik.resetForm();
    handleShowFormListing();
  };

  const handleEditStatus = (dataListingOld) => {
    dispatch(agentAction.setIsShowForm(true));
    dispatch(agentAction.setIsEditListing(true));
    formik.setValues({
      id: dataListingOld.id,
      userId: dataListingOld.user_id,
      listingID: dataListingOld.listingid,
      judulListing: dataListingOld.judullisting,
      jenisListing: dataListingOld.jenislisting,
      kategoriListing: dataListingOld.kategorilisting,
      tipeListing: dataListingOld.tipelisting,
      spesifikasiListing: dataListingOld.spesifikasilisting,
      gambarListing: dataListingOld.gambarlisting,
      hargaListing: dataListingOld.hargalisting,
      alamatListing: dataListingOld.alamatlisting,
      propertyOwner: dataListingOld.propertyowner,
      statusListing: dataListingOld.status_listing,
      kamarTidur: dataListingOld.kamar_tidur,
      kamarMandi: dataListingOld.kamar_mandi,
      luasBangunan: dataListingOld.luas_bangunan,
      luasTanah: dataListingOld.luas_tanah,
      jenisSertifikat: dataListingOld.jenis_sertifikat
    });
  };

  const handleUpdateListing = async (dataNew, event) => {
    event.preventDefault();
    const { data } = await UpdateListingMutation({
      variables: {
        id: dataNew.id,
        alamatlisting: dataNew.alamatListing,
        gambarlisting: dataNew.gambarListing,
        hargalisting: dataNew.hargaListing,
        jenislisting: dataNew.jenisListing,
        judullisting: dataNew.judulListing,
        kategorilisting: dataNew.kategoriListing,
        listingid: dataNew.listingID,
        propertyowner: dataNew.propertyOwner,
        spesifikasilisting: dataNew.spesifikasiListing,
        tipelisting: dataNew.tipeListing,
        status_listing: dataNew.statusListing,
        user_id: dataNew.userId,
        kamar_tidur: dataNew.kamarTidur,
        kamar_mandi: dataNew.kamarMandi,
        luas_bangunan: dataNew.luasBangunan,
        luas_tanah: dataNew.luasTanah,
        jenis_sertifikat: dataNew.jenisSertifikat
      }
    });

    const listingTitleUpdated =
      data?.update_property_listing_by_pk.judullisting;

    if (data) alert(`Success update listing ${listingTitleUpdated}`);

    dispatch(agentAction.setIsEditListing(false));
    formik.resetForm();
  };

  const handleSearchListing = (e) => {
    const listingTitle = e.target.value;
    dispatch(agentAction.setSearchListing(listingTitle));
  };

  const listingTypeObject = [
    {
      id: 0,
      label: 'Rumah',
      value: 'rumah',
      checked: formik.values.tipeListing === 'rumah',
      onChangeEvent: formik.handleChange,
      radioName: 'tipeListing'
    },
    {
      id: 1,
      label: 'Ruko',
      value: 'ruko',
      checked: formik.values.tipeListing === 'ruko',
      onChangeEvent: formik.handleChange,
      radioName: 'tipeListing'
    },
    {
      id: 2,
      label: 'Apartemen',
      value: 'apartemen',
      checked: formik.values.tipeListing === 'apartemen',
      onChangeEvent: formik.handleChange,
      radioName: 'tipeListing'
    },
    {
      id: 3,
      label: 'Tanah',
      value: 'tanah',
      checked: formik.values.tipeListing === 'tanah',
      onChangeEvent: formik.handleChange,
      radioName: 'tipeListing'
    }
  ];
  const thead_listing_array = [
    'Listing ID',
    'Judul Listing',
    'Kategori Listing',
    'Jenis Listing',
    'Tipe Listing',
    'Spesifikasi Listing',
    'Harga Listing',
    'Status Listing',
    'Gambar Listing',
    'Owner Property',
    'Action'
  ];

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
            cardTitle={
              loadingDataListingSubscription ? <LoadingData /> : totalListing
            }
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
            cardTitle={
              loadingOwnerSubscription ? <LoadingData /> : totalOwnerProperty
            }
            cardLabelContent={
              <>
                <img
                  src="./assets/icons/dashboard/peoples-icon.svg"
                  alt="house-icon.svg"
                  className="mr-3"
                />
                Total Owner
              </>
            }
          />
          <PropertyTotalCard
            cardTitle={loadingListingSold ? <LoadingData /> : totalListingSold}
            cardLabelContent={
              <>
                <img
                  src="./assets/icons/dashboard/money-bubble-chat_icon.svg"
                  alt="house-icon.svg"
                  className="mr-3"
                />
                Sold Listing
              </>
            }
          />
          <PropertyTotalCard
            cardTitle={
              loadingRentedListing ? <LoadingData /> : totalListingRent
            }
            cardLabelContent={
              <>
                <img
                  src="./assets/icons/dashboard/key-icon.svg"
                  alt="house-icon.svg"
                  className="mr-3"
                />
                Rented Listing
              </>
            }
          />
        </div>
        {/* #GRID OF CARDS endregion  */}
        {totalOwnerProperty >= 1 ? (
          <>
            <DashboardCard
              cardTitle="Add New Listing"
              cardDescription="Anda dapat menambahkan listing baru. Silahkan kembali ke dashboard untuk memulai menambahkan listing"
              cardButtonOnclick={() => handleShowFormListing()}
              buttonDisabled={!!isEditListing}
              cardButtonContent={
                isEditListing ? (
                  'Tutup form edit listing untuk menambahkan listing'
                ) : (
                  <>
                    <p className="text-2xl lg:text-3xl ml-1 lg:ml-3">
                      Add New Listing
                    </p>
                    <img
                      src="./assets/icons/dashboard/streamline_interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard.svg"
                      alt="material-symbols_man"
                      className="ml-4 lg:ml-4 w-8 lg:w-10"
                    />
                  </>
                )
              }
            />
            {showForm ? (
              <CardForm
                onSubmitForm={
                  isEditListing
                    ? (event) => handleUpdateListing(formik.values, event)
                    : formik.handleSubmit
                }
                formChildren={
                  <div className="px-4 py-3">
                    <div className="mt-1.5 mb-5 flex flex-col lg:flex-row justify-between gap-5">
                      <h1 className="text-2xl">
                        {isEditListing ? 'Edit Listing' : 'Form Listing'}
                      </h1>
                      <div className="flex lg:flex-row items-center gap-3 mb-3">
                        <h4>Listing ID :</h4>
                        <TextInput
                          name="listingID"
                          value={formik.values.listingID}
                          onChange={formik.handleChange}
                          className="rounded-lg lg:w-[17.2rem]"
                          readOnly
                          disabled
                        />
                      </div>
                    </div>
                    <hr className="mb-5" />
                    <div className="grid md:grid-cols-3 md:gap-4 font-medium lg:mb-5">
                      <div className="relative z-0 w-full group mb-2 xl:mb-0">
                        <InputText
                          labelInput="Judul Listing"
                          placeholderValue="Masukkan judul listing"
                          inputName="judulListing"
                          inputType="text"
                          iconInput={Fonts}
                          changeInput={formik.handleChange}
                          value={formik.values.judulListing}
                          errorMessage={formik.errors.judulListing}
                        />
                      </div>
                      <div className="relative z-0 w-full group mb-2 xl:mb-0">
                        <InputText
                          labelInput="Alamat Listing"
                          placeholderValue="Masukkan alamat listing disini"
                          inputName="alamatListing"
                          inputType="text"
                          iconInput={GeoAltFill}
                          changeInput={formik.handleChange}
                          value={formik.values.alamatListing}
                          errorMessage={formik.errors.alamatListing}
                        />
                      </div>
                      <div className="relative z-0 w-full group mb-2 xl:mb-0">
                        <InputText
                          labelInput="Harga Listing"
                          placeholderValue="Masukkan harga listing disini"
                          inputName="hargaListing"
                          inputType="number"
                          iconInput={CashStack}
                          changeInput={formik.handleChange}
                          value={formik.values.hargaListing}
                          errorMessage={formik.errors.hargaListing}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 md:gap-4 font-medium mb-2">
                      <div className="relative z-0 w-full group mb-4 xl:mb-0 align-middle">
                        <SelectInput
                          selectOptions={[
                            'Pilih Kategori Listing',
                            'Dijual',
                            'Disewakan'
                          ]}
                          iconInput={Diagram3Fill}
                          labelSelect="Kategori Listing"
                          selectName="kategoriListing"
                          selectOnChange={formik.handleChange}
                          defaultValueSelect={formik.values.kategoriListing}
                        />
                        <p className="mt-2 text-sm text-red-700 dark:text-red-800">
                          <span className="font-medium">
                            {formik.errors.kategoriListing}
                          </span>
                        </p>
                      </div>
                      <div className="relative z-0 w-full group mb-4 xl:mb-0 align-top">
                        <RadioFields
                          radioFieldsObject={listingTypeObject}
                          radioFieldLabel="Jenis Listing"
                        />
                        <p className="mt-2 text-sm text-red-700 dark:text-red-800">
                          <span className="font-medium">
                            {formik.errors.tipeListing}
                          </span>
                        </p>
                      </div>
                      <div className="relative z-0 w-full group mb-4 xl:mb-0 py-auto">
                        <div className="relative z-0 w-full group mb-4 xl:mb-0 align-middle">
                          <SelectInput
                            selectOptions={[
                              'Pilih Tipe Listing',
                              'Primary',
                              'Secondary',
                              'Exclusive'
                            ]}
                            labelSelect="Tipe Listing"
                            selectName="jenisListing"
                            selectOnChange={formik.handleChange}
                            iconInput={TagFill}
                            defaultValueSelect={formik.values.jenisListing}
                          />
                          <p className="mt-2 text-sm text-red-700 dark:text-red-800">
                            <span className="font-medium">
                              {formik.errors.jenisListing}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 md:gap-4 font-normal lg:mb-3">
                      <div className="relative z-0 w-full group mb-2 xl:mb-0">
                        <div className="mb-2 block">
                          <Label
                            htmlFor="spesifikasiListing"
                            className="flex items-center gap-1.5"
                          >
                            Spesifikasi Listing <TextareaT />
                          </Label>
                        </div>
                        <Textarea
                          placeholder="Masukkan spesifikasi listing disini"
                          name="spesifikasiListing"
                          onChange={formik.handleChange}
                          value={formik.values.spesifikasiListing}
                        />
                        <p className="mt-2 text-sm text-red-700 dark:text-red-800">
                          <span className="font-medium">
                            {formik.errors.spesifikasiListing}
                          </span>
                        </p>
                      </div>
                      <div className="relative z-0 w-full group mb-2 xl:mb-0">
                        <div className="mb-2 block">
                          <Label
                            htmlFor="gambarListing"
                            className="flex items-center gap-1.5"
                          >
                            Gambar Listing <FileEarmarkArrowUp />
                          </Label>
                        </div>
                        <FileInput
                          accept="image/jpeg"
                          id="gambarListing"
                          name="gambarListing"
                          onChange={handleFileChange}
                        />
                        {formik.errors.gambarListing && (
                          <p className="mt-2 text-sm text-red-700 dark:text-red-800">
                            <span className="font-medium">
                              {formik.errors.gambarListing}
                            </span>
                          </p>
                        )}
                      </div>
                      <div className="relative z-0 w-full group mb-2 xl:mb-0">
                        <div className="relative">
                          <SelectInput
                            selectOptions={ownerData.map(
                              (data) => data.nama_owner
                            )}
                            labelSelect="Property Owner"
                            selectName="propertyOwner"
                            iconInput={PeopleFill}
                            selectOnChange={formik.handleChange}
                            defaultValueSelect={formik.values.propertyOwner}
                          />
                        </div>
                        <p className="mt-2 text-sm text-red-700 dark:text-red-800">
                          <span className="font-medium">
                            {formik.errors.propertyOwner}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 md:gap-4 font-normal lg:mb-5">
                      <div className="relative z-0 w-full group mb-2 xl:mb-0">
                        <InputText
                          labelInput="Luas Tanah"
                          inputType="number"
                          iconInput={Rulers}
                          changeInput={formik.handleChange}
                          value={formik.values.luasTanah}
                          inputName="luasTanah"
                          errorMessage={formik.errors.luasTanah}
                        />
                      </div>
                      <div className="relative z-0 w-full group mb-2 xl:mb-0">
                        <InputText
                          labelInput="Luas Bangunan"
                          inputType="number"
                          iconInput={HouseFill}
                          changeInput={formik.handleChange}
                          value={formik.values.luasBangunan}
                          inputName="luasBangunan"
                          errorMessage={formik.errors.luasBangunan}
                        />
                      </div>
                      <div className="relative z-0 w-full group mb-2 xl:mb-0">
                        <div className="relative">
                          <SelectInput
                            selectOptions={['Baru', 'Terjual', 'Tersewa']}
                            labelSelect="Status Listing"
                            selectName="statusListing"
                            selectOnChange={formik.handleChange}
                            defaultValueSelect={formik.values.statusListing}
                            iconInput={HouseCheckFill}
                          />
                        </div>
                        <p className="mt-2 text-sm text-red-700 dark:text-red-800">
                          <span className="font-medium">
                            {formik.errors.statusListing}
                          </span>
                        </p>
                      </div>
                      <div className="relative z-0 w-full group mb-2 xl:mb-0">
                        <InputText
                          labelInput="Jumlah Kamar Mandi"
                          inputType="number"
                          iconInput={BadgeWcFill}
                          changeInput={formik.handleChange}
                          value={formik.values.kamarMandi}
                          inputName="kamarMandi"
                          errorMessage={formik.errors.kamarMandi}
                        />
                      </div>
                      <div className="relative z-0 w-full group mb-2 xl:mb-0">
                        <InputText
                          labelInput="Jumlah Kamar Tidur"
                          inputType="number"
                          iconInput={DoorClosedFill}
                          inputName="kamarTidur"
                          changeInput={formik.handleChange}
                          value={formik.values.kamarTidur}
                          errorMessage={formik.errors.kamarTidur}
                        />
                      </div>
                      <div className="relative z-0 w-full group mb-2 xl:mb-0">
                        <div className="relative">
                          <SelectInput
                            selectOptions={['HM', 'HGB', 'SHGB']}
                            labelSelect="Jenis Sertifikat"
                            selectName="jenisSertifikat"
                            selectOnChange={formik.handleChange}
                            defaultValueSelect={formik.values.jenisSertifikat}
                            iconInput={CardText}
                          />
                        </div>
                        <p className="mt-2 text-sm text-red-700 dark:text-red-800">
                          <span className="font-medium">
                            {formik.errors.jenisSertifikat}
                          </span>
                        </p>
                      </div>
                    </div>
                    <hr className="mt-9 mb-8" />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        {isEditListing ? 'Update Data Listing' : 'Add Listing'}
                      </button>
                      <button
                        type="button"
                        onClick={
                          isEditListing
                            ? handleCloseEdit
                            : handleShowFormListing
                        }
                        className="text-red-600 hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      >
                        {isEditListing
                          ? 'Close Edit Listing'
                          : 'Close Form Listing'}
                      </button>
                    </div>
                  </div>
                }
              />
            ) : null}
            <DashboardCard
              cardTitle="Owner Property"
              cardDescription={
                'Anda telah mendaftarkan Owner Property. Jika ingin mendaftarkan owner lagi silahkan menuju halaman "Manage Owner" '
              }
              cardButtonOnclick={() => navigate('/owner')}
              cardButtonContent={
                <>
                  <p className="text-2xl lg:text-3xl ml-2 lg:ml-5">
                    Manage Owner
                  </p>
                  <img
                    src="./assets/icons/dashboard/material-symbols_man.svg"
                    alt="material-symbols_man"
                    className="ml-3 lg:ml-4 w-8 lg:w-14"
                  />
                </>
              }
            />
          </>
        ) : (
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
        )}
        <TableProduct
          searchPlaceholder="Cari listing berdasarkan judul"
          searchChange={handleSearchListing}
          searchValue={searchListingTitle}
          thead_arr={totalListing === null ? thead_listing_array : null}
          tbody_content={
            loadingDataListingSubscription
              ? listingData.map((data) => (
                  <TableRow>
                    <TableData data={<LoadingData />} />
                    <TableData data={<LoadingData />} />
                    <TableData data={<LoadingData />} />
                    <TableData data={<LoadingData />} />
                    <TableData data={<LoadingData />} />
                    <TableData data={<LoadingData />} />
                    <TableData data={<LoadingData />} />
                    <TableData data={<LoadingData />} />
                    <TableData data={<LoadingData />} />
                    <TableData data={<LoadingData />} />
                    <TableData data={<LoadingData />} />
                  </TableRow>
                ))
              : listingData.map((data) => (
                  <TableRow key={data.id}>
                    <TableData data={data.listingid} />
                    <TableData data={data.judullisting} />
                    <TableData data={data.kategorilisting} />
                    <TableData data={data.tipelisting} />
                    <TableData data={data.jenislisting} />
                    <TableData data={data.spesifikasilisting} />
                    <TableData
                      data={priceFormatter.format(data.hargalisting)}
                    />
                    <TableData data={data.status_listing} />
                    <TableData data={data.gambarlisting} />
                    <TableData data={data.propertyowner} />
                    <TableData
                      className="flex flex-wrap flex-col gap-y-2"
                      data={
                        <>
                          <button
                            type="button"
                            onClick={() => handleEditStatus(data)}
                            className="focus:outline-none text-black bg-yellow-200 hover:bg-yellow-300 dark:hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-400 w-max"
                          >
                            {isEditListing ? 'Edit form opened' : 'Edit'}
                          </button>
                          <Button
                            color="failure"
                            onClick={() => {
                              handleDeleteByListingId(
                                data.listingid,
                                data.judullisting
                              );
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      }
                    />
                  </TableRow>
                ))
          }
        />
      </main>
    </>
  );
}

export default AgentDashboard;
