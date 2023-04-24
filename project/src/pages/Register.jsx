/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { InputText } from '../components/atoms';
import { NavbarComponent } from '../components/organism';

function Register() {
  const REGISTER_USER_MUTATION = gql`
    mutation REGISTER_USER(
      $email: String!
      $password: String!
      $phone_number: String!
    ) {
      insert_user_accounts_one(
        object: {
          email: $email
          password: $password
          phone_number: $phone_number
        }
      ) {
        email
      }
    }
  `;

  const [RegisterUser, { data: dataRegisterUser }] = useMutation(
    REGISTER_USER_MUTATION
  );

  const validationRegister = Yup.object({
    email: Yup.string().required('Email wajib diisi!').email(),
    phoneNumber: Yup.string()
      .required('No. Handphone wajib diisi!')
      .matches(/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/g, 'Phone Number must valid!'),
    password: Yup.string()
      .required('Password wajib diisi!')
      .min(8, 'Panjang password harus lebih dari 8 Character'),
    confirmPassword: Yup.string()
      .required('Please retype password')
      .oneOf([Yup.ref('password')], 'Your password dont match')
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationRegister,
    onSubmit: (formValue) => {
      RegisterUser({
        variables: {
          email: formValue.email,
          password: formValue.password,
          phone_number: formValue.phoneNumber
        }
      });
      formik.resetForm();
    }
  });
  console.log({ errors: formik.errors });
  return (
    <>
      <NavbarComponent />
      <div className="mt-32 px-6 2xl:px-24 lg:px-8">
        <div className="pt-4 flex justify-between md:justify-center xl:justify-around 2xl:justify-evenly gap-8 xl:gap-0">
          <img
            src="./assets/banner/banner-register.png"
            alt=""
            className="w-3/4 hidden lg:block lg:w-3/6 lg:object-contain"
          />

          <div className="w-full max-w-lg lg:max-w-lg md:max-w-2xl lg:h-fit p-4 bg-white border border-gray-200 rounded-2xl shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <h5 className="text-xl font-medium text-center text-gray-900 dark:text-white">
                Register Account
              </h5>
              <hr />
              <div className="grid md:grid-cols-2 md:gap-4">
                <div className="relative z-0 w-full group mb-5 xl:mb-0">
                  <InputText
                    inputType="email"
                    labelInput="Email"
                    changeInput={formik.handleChange}
                    value={formik.values.email}
                    errorMessage={formik.errors.email}
                    placeholderValue="Masukkan Email"
                    inputName="email"
                  />
                </div>
                <div className="relative z-0 w-full group">
                  <InputText
                    inputType="tel"
                    labelInput="No. Handphone"
                    changeInput={formik.handleChange}
                    value={formik.values.phoneNumber}
                    errorMessage={formik.errors.phoneNumber}
                    placeholderValue="Masukkan No. Handphone"
                    inputName="phoneNumber"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-4">
                <div className="relative z-0 w-full group mb-5 xl:mb-0">
                  <InputText
                    inputType="password"
                    labelInput="Password"
                    changeInput={formik.handleChange}
                    value={formik.values.password}
                    errorMessage={formik.errors.password}
                    placeholderValue="Masukkan Password"
                    inputName="password"
                  />
                </div>
                <div className="relative z-0 w-full group">
                  <InputText
                    inputType="password"
                    labelInput="Confirm Password"
                    changeInput={formik.handleChange}
                    value={formik.values.confirmPassword}
                    errorMessage={formik.errors.confirmPassword}
                    placeholderValue="Ketikkan Ulang Password"
                    inputName="confirmPassword"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit Account
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                Sudah Punya Akun?
                <a
                  href="/login"
                  className="text-blue-700 hover:underline dark:text-blue-500 ml-1"
                >
                  Login to account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
