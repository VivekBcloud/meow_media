import { useUser } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Link from 'next/link';

const LandingPage = () => {
  const user = useUser();
  console.log('in the body');
  return (
    <div className="h-screen w-screen bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 ">
      <div className="h-full w-full grid  place-items-center  mx-auto max-w-screen-xl p-2">
        <div className="flex flex-col gap-5 items-center justify-center">
          <div className=" text-4xl">Hello</div>
          <div className="flex bg-pink-400 p-5 rounded-lg shadow-2xl">
            <div className="flex aspect-w-1 w-64 h-64 ">
              <Image
                src={'/my_cat.svg'}
                layout="fill"
                alt="cat"
                objectFit="contain"
              />
            </div>
          </div>
          <Link href="/signin">
            <button className="bg-pink-400 px-28 p-3 rounded-lg text-2xl shadow-md hover:text-white ease-in-out duration-100 ">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

LandingPage.setLayout = true;

export default LandingPage;
