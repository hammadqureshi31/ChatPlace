import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { firebaseAuth, useFirebase } from '../../firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginPage } from '../../Redux/slices/loginSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from '../../zustand/userStore';
import { useChatStore } from '../../zustand/chatStore';
import { setSignupPage } from '../../Redux/slices/signupSlice';
import { toast } from 'react-toastify';

const Login = () => {
    const firebase = useFirebase();
    const dispatch = useDispatch();
    const [logging, setlogging] = useState(false)
    const { currentUser, isLoading, fetchUserInfo } = useUserStore();
    const { chatId } = useChatStore();
    const signup = useSelector(state => state.signupPage)
    console.log("I am signup state: ",signup)


    useEffect(() => {
        const unSub = onAuthStateChanged(firebaseAuth, async(user) => {
          await fetchUserInfo(user?.uid);
        });
        return () => {
          unSub();
        };
      }, [fetchUserInfo,signup]);

    const loginValidation = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is Required'),
        password: Yup.string().required('Strong password is Required').min(6, 'Password is too short').max(10, 'Password is too long'),
    });

    const handleLogin = async (values) => {
        try {
            await firebase.loginUserWithEmailAndPass(values.email, values.password);
            dispatch(setLoginPage(true));
            toast.success('Login Successfull');
        } catch (error) {
            toast.error(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center pt-14 px-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Welcome Back</h1>
                <Formik initialValues={{ email: '', password: '' }} validationSchema={loginValidation}
                 onSubmit={handleLogin}>
                    {(isSubmitting) => (
                        <Form className="bg-transparent rounded-lg p-6">
                            <Field type="email" name="email" placeholder="Your Email" className="w-full px-4 py-3 mb-1 bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                            <ErrorMessage name="email" component="div" className="text-red-300 text-xs" />

                            <Field type="password" name="password" placeholder="Your Password" className="w-full px-4 py-3 mt-3 mb-1 text-black bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                            <ErrorMessage name="password" component="div" className="text-red-300 text-xs" />

                            <div className="flex items-center justify-between gap-8 mt-4 mb-4">
                                <label htmlFor="rememberMe" className="flex items-center">
                                    <input type="checkbox" id="rememberMe" className="mr-2 leading-tight" />
                                    <span className="text-xs  text-nowrap">Remember me</span>
                                </label>
                                <span className="text-[#5082FC] text-xs  cursor-pointer text-nowrap">
                                    Forgot Password?
                                </span>
                            </div>

                            <button onClick={()=>setlogging((prev)=>!prev)}
                            type="submit" className="w-full px-2 py-2 text-lg text-white bg-[#5082FC] rounded-lg hover:bg-sky-500 focus:outline-none">
                                {logging ? 'Logging...' : 'Log in' }
                            </button>

                            <div className="mt-4 text-center">
                                <span className="text-[#5082FC] text-sm cursor-pointer">Sign in with Google</span>
                            </div>
                        </Form>
                    )}
                </Formik>

                <div className="mt-4 text-center flex flex-col gap-2 px-5">
                    <p className="bg-black/25 p-2 rounded-md">Don't have an account?</p>
                    <span  onClick={()=> dispatch(setSignupPage(false))}
                    className="text-[#5082FC] cursor-pointer text-sm">Sign Up</span>
                </div>
            </div>
        </div>
    );
}

export default Login;
