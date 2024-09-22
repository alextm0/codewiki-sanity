import React from 'react';

const BlogPostSkeleton = () => (
  <div className="animate-pulse font-inter w-full max-w-full">
    <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      {/* Title Skeleton */}
      <div className="text-center mb-6 px-4 sm:px-6">
        <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
      </div>

      {/* Image Skeleton */}
      <div className="relative overflow-hidden mb-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-300 h-64 w-full rounded-md"></div>
        </div>
      </div>

      {/* Body Skeleton */}
      <div className="max-w-7xl mx-auto pl-2 pr-6 xl:px-0 sm:mt-8 flex flex-col lg:flex-row">
        {/* Sidebar Skeleton */}
        <div className="lg:w-1/4 lg:mr-8">
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/4"></div>
            <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <main className="lg:w-3/4 mx-auto">
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="h-6 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded w-3/5"></div>
          </div>
        </main>
      </div>
    </div>
  </div>
);

export default BlogPostSkeleton;
