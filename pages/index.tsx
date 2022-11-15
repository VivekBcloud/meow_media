import Image from 'next/image';
import Link from 'next/link';

const LandingPage = () => {
    return (
        <div className="h-screen w-screen bg-white ">
            <div className="h-full w-full grid  place-items-center  mx-auto max-w-screen-xl p-2">
                <div className="flex flex-col gap-5 items-center justify-center">
                    <div className="text-emerald-600 text-4xl">Hello</div>
                    <div className="flex bg-impact p-5 rounded-lg shadow-2xl">
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
                        <button className="bg-impact px-28 p-3 rounded-lg text-2xl shadow-md hover:text-white ease-in-out duration-100 ">
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
