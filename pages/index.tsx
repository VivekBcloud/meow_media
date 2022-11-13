import Link from 'next/link';

const LandingPage = () => {
    return (
        <div className="h-screen w-screen bg-bg ">
            <div className="h-full w-full grid  place-items-center  mx-auto max-w-screen-xl p-2">
                <div className="flex flex-col gap-5 items-center justify-center">
                    <div className="text-teal-400 text-4xl">Home page WIP</div>
                    <Link href="/signin">
                        <button className="bg-impact px-4 p-2 rounded text-2xl ">
                            sign in
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

LandingPage.setLayout = true;

export default LandingPage;
