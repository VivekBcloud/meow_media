import React from 'react';
import MyLayout from '../../components/layout/myLayout';

const Notification = () => {
    return (
        <MyLayout>
            <div className="h-full w-full ">
                <div className="flex flex-col gap-5 h-full mx-auto max-w-screen-xl p-2 text-orange-500 text-lg">
                    <div className="font-extrabold text-5xl text-teal-500">
                        WIP
                    </div>
                </div>
            </div>
        </MyLayout>
    );
};

export default Notification;
