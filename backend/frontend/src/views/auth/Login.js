import React, {Fragment} from "react";
import { Link, useHistory } from "react-router-dom";
//forms
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { toast } from "react-toastify";
import { postRequest } from "commonapi";
import {setauth} from "Redux/authReducer" 
import {useDispatch} from 'react-redux'

function SuccessToast({ message }) {
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title">{message}</h6>
        </div>
      </div>
    </Fragment>
  );
}

export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
  const registerUser = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(16).required()
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange", resolver: yupResolver(registerUser) });

  const onSubmit = async (dataMain) => {
    console.log(dataMain)
    const response = await postRequest({sub_url: '/login', dataMain})
    console.log(response)
    toast.success(<SuccessToast message={response.message} />, { hideProgressBar: true })
    if (response.status === true) { 
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      localStorage.setItem('userData', JSON.stringify(response.data.userData))
      dispatch(setauth({
        isAuth: true,
        isAdmin : response.data.userData.role === 'admin' ? true : false
      }))
      
      history.push('/dashboard')
    } 
    
  }
  return (
    <>
    <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                     {...register('email', { required: true })}
                      className={classnames('input border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150', { 'is-invalid': errors && errors?.email })}
                      placeholder="Email"
                    />
                     {errors && errors?.email && <p>Please enter a valid email</p>}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      {...register('password', { required: true })}
                      className={classnames('input border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150', { 'is-invalid': errors && errors?.user_name })}
                      placeholder="Password"
                    />
                    {errors && errors?.password && <p>Please enter a valid password</p>}
                  </div>

                  <div className="text-center mt-6 flex buttonAlign">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign in
                    </button>
                    <Link to="/signup"
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Sign up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      </section>
      </main>
    </>
  );
}
