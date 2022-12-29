import Image from 'next/image';
import React from 'react';

import { Provider } from '@supabase/supabase-js';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';

const Signin = () => {
  const supabase = useSupabaseClient();

  async function signInWithEmail(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );

    if (typeof email === 'string' && typeof password === 'string')
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
  }

  async function signInWithOAuth(providerName: Provider) {
    await supabase.auth.signInWithOAuth({
      provider: providerName,
    });
  }
  const signInWithEmailMutation = useMutation(signInWithEmail);

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
                <Image width={30} height={30} alt="gh" src="/github.svg" />
                <span className="ml-2">Github</span>
              </button>
            </div>
            <hr className="mt-1 border-b-1 border-gray-300" />
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div className="text-gray-500 text-center mb-3 font-bold ">
              <small>Or {'signin'} with credentials</small>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                signInWithEmailMutation.mutate(e);
              }}
            >
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
                  name="email"
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
                  name="password"
                  className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>
              <div>
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
              </div>

              <div className="text-center mt-6">
                <button
                  className=" bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                  disabled={signInWithEmailMutation.isLoading}
                >
                  {'Sign in'}
                  {signInWithEmailMutation.isLoading && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="ml-2 inline-block w-5 h-5 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#fc7609"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
              <div className="mt-3 text-center">
                {'Need an account '}
                <Link href="/register">
                  <span className="underline  px-1 cursor-pointer font-medium hover:text-gray-600 ease-in transition-all duration-100">
                    {'Register'}
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Signin.setLayout = true;

export default Signin;
