import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useSubscription, useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { InputText } from '../components/atoms';
import { NavbarComponent } from '../components/organism';

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const validationLogin = Yup.object({
    email: Yup.string()
      .required('Email wajib diisi!')
      .email(
        'Silahkan isi format email yang benar, seperti : johndoe@mail.com'
      ),
    password: Yup.string()
      .required('Password wajib diisi!')
      .min(8, 'Panjang password harus lebih dari 8 Character')
  });

  const LOGIN_USER_SUBSCRIPTION = gql`
    subscription LOGIN_USER($email_eq: String!, $password_eq: String!) {
      user_accounts(
        where: { email: { _eq: $email_eq }, password: { _eq: $password_eq } }
      ) {
        id
        email
        password
      }
    }
  `;

  const {
    loading: loadingLoginUser,
    error: errorLoginUser,
    data: dataLoginUser
  } = useSubscription(LOGIN_USER_SUBSCRIPTION, {
    variables: {
      email_eq: loginEmail,
      password_eq: loginPassword
    }
  });

  const retr_email = dataLoginUser?.user_accounts
    .map((user) => user.email)
    .toString();

  const retr_password = dataLoginUser?.user_accounts
    .map((user) => user.password)
    .toString();

  const user_id = dataLoginUser?.user_accounts.map((user) => user.id);

  console.log({ retr_email, retr_password });

  const userData = {
    email: retr_email,
    password: retr_password,
    loggedIn: false
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationLogin,
    onSubmit: (formLogin) => {
      setLoginEmail(formLogin.email);
      setLoginPassword(formLogin.password);
      if (
        formLogin.email === retr_email ||
        formLogin.password === retr_password
      ) {
        localStorage.setItem(
          'dataUser',
          JSON.stringify({
            ...userData,
            loggedIn: true,
            userID: parseInt(user_id, 10)
          })
        );
        navigate('/dashboard');
      } else {
        alert('Login Gagal');
        navigate('/login');
      }
      formik.resetForm();
    }
  });
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
                Login Account
              </h5>
              <hr />
              <div className="relative z-0 w-full group">
                <div className="mb-4">
                  <InputText
                    inputType="email"
                    inputName="email"
                    labelInput="Email"
                    changeInput={formik.handleChange}
                    value={formik.values.email}
                    placeholderValue="Masukkan Email"
                    errorMessage={formik.errors.email}
                  />
                </div>
                <div className="mt-0 mb-1">
                  <InputText
                    inputType="password"
                    inputName="password"
                    labelInput="Password"
                    changeInput={formik.handleChange}
                    value={formik.values.password}
                    placeholderValue="Masukkan Password"
                    errorMessage={formik.errors.password}
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
                Belum Punya Akun?
                <a
                  href="/register"
                  className="text-blue-700 hover:underline dark:text-blue-500 ml-1"
                >
                  Daftar disini
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
