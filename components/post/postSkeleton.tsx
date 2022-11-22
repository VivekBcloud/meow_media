import { PhotoIcon } from '@heroicons/react/24/solid';
import React from 'react';

const PostLoading = () => {
  return (
    <div
      role="status"
      className="p-3 mt-2 rounded  bg-pc  shadow animate-pulse  dark:border-gray-700"
    >
      <div className="flex gap-3 items-center py-2">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-2"></div>
          <div className="w-16 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
      <div className=" flex flex-col gap-1">
        <div className="h-2 w-80 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="py-2">
          <div className="aspect-w-2 aspect-h-1 w-full overflow-hidden rounded-lg">
            <PhotoIcon className="bg-sc text-gray-700" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default PostLoading;
