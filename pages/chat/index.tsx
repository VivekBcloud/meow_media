import React from 'react';
import MyLayout from '../../components/layout/myLayout';

const ChatRoom = () => {
  return (
    <MyLayout>
      <div className="h-[calc(100vh-4rem)]  w-full ">
        <div className="flex flex-col gap-5 h-full mx-auto max-w-screen-xl  p-2 justify-center items-center">
          <div className="font-extrabold text-9xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-orange-500">
            WIP
          </div>
        </div>
      </div>
    </MyLayout>
  );
};

export default ChatRoom;
