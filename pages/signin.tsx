import Image from 'next/image';
import React, { useState } from 'react';

import { Provider } from '@supabase/supabase-js';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Signin = () => {
    const supabase = useSupabaseClient();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const [signUpMode, setSignUpMode] = useState(false);

    async function signUpWithEmail() {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        setUser(data);
    }

    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setUser(data);
    }

    async function signInWithOAuth(providerName: Provider) {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: providerName,
            // options: {
            //     redirectTo: "https://example.com/welcome",
            // },
        });
        setUser(data);
    }

    console.log(user);

    return (
        <div className="bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 h-screen grid">
            <div className="w-full lg:w-4/12 px-4 m-auto ">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-purple-300 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                            <h6 className=" text-sm text-gray-500 font-medium">
                                Continue with
                            </h6>
                        </div>
                        <div className="text-center px-4">
                            <button
                                className="bg-white active:bg-gray-50 text-gray-700 font-bold px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md flex w-full  items-center justify-center  ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => signInWithOAuth('github')}
                            >
                                <Image
                                    width={30}
                                    height={30}
                                    alt="gh"
                                    src="/github.svg"
                                />
                                <span className="ml-2">Github</span>
                            </button>
                            {/* <button
                                className="bg-white active:bg-gray-50 text-gray-700  px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => signInWithOAuth("google")}
                            >
                                <Image
                                    width={20}
                                    height={20}
                                    alt="ggle"
                                    src="/google.svg"
                                />
                                <span className="ml-2">Google</span>
                            </button> */}
                        </div>
                        <hr className="mt-1 border-b-1 border-gray-300" />
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <div className="text-gray-500 text-center mb-3 font-bold ">
                            <small>
                                Or {signUpMode ? 'signup' : 'signin'} with
                                credentials
                            </small>
                        </div>
                        <form>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Password"
                                />
                            </div>
                            <div>
                                {!signUpMode && (
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            id="customCheckLogin"
                                            type="checkbox"
                                            className="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                        />

                                        <span className="ml-2 text-sm font-semibold text-gray-600">
                                            Remember me
                                        </span>
                                    </label>
                                )}
                            </div>

                            <>
                                <div className="text-center mt-6">
                                    <button
                                        className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={
                                            signUpMode
                                                ? signUpWithEmail
                                                : signInWithEmail
                                        }
                                    >
                                        {signUpMode ? 'Sign up' : 'Sign in'}
                                    </button>
                                </div>
                                <div className="mt-3 text-center">
                                    {signUpMode
                                        ? 'Already have an account'
                                        : 'Need an account '}
                                    <span
                                        className="underline  px-1 cursor-pointer font-medium hover:text-gray-600 ease-in transition-all duration-100"
                                        onClick={() =>
                                            setSignUpMode((prev) => !prev)
                                        }
                                    >
                                        {signUpMode ? 'Sign in' : 'Sign up'}
                                    </span>
                                </div>
                            </>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

Signin.setLayout = true;

export default Signin;
