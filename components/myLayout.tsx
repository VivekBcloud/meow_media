import { AppProps } from "next/app";
import React, { FC } from "react";
import Navbar from "./navbar";

type Props = {
    children: React.ReactNode;
};

const MyLayout: FC<Props> = ({ children }) => {
    return (
        <div className="max-w-screen max-h-screen">
            <Navbar />
            <div className="mt-16 h-[calc(100vh-4rem)] bg-[#1a1a1a] ">
                {children}
            </div>
        </div>
    );
};

export default MyLayout;
