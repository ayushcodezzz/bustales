import React from 'react';

const SafeHtml = ({ html, className = '' }) => {
  return (
    <div 
      className={`
        [&>p]:text-[13px] [&>p]:font-normal [&>p]:mb-3 [&>p]:leading-[18px] [&>p]:text-left [&>p]:text-gray-800
        [&>p>strong]:font-semibold [&>p>strong]:text-[13px] [&>p>strong]:text-gray-900
        [&>ul]:list-disc [&>ul]:text-[13px] [&>ul]:font-normal [&>ul]:text-left [&>ul]:leading-[18px] [&>ul]:mb-3 [&>ul]:ml-4 [&>ul]:text-gray-800
        [&>ol]:list-decimal [&>ol]:text-[13px] [&>ol]:ml-4 [&>ol]:font-normal [&>ol]:text-left [&>ol]:leading-[18px] [&>ol]:mb-3 [&>ol]:text-gray-800
        [&>li]:mb-1.5 [&>li]:text-[13px] [&>li]:font-normal [&>li]:text-left [&>li]:leading-[18px] [&>li]:ml-4 [&>li]:text-gray-800
        [&>code]:bg-gray-100 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:font-mono [&>code]:text-[12px] [&>code]:text-gray-800
        [&>img]:mx-auto [&>img]:block [&>img]:my-3 [&>img]:max-w-full [&>img]:h-auto [&>img]:rounded-lg [&>img]:text-center
        [&>p>img]:mx-auto [&>p>img]:block [&>p>img]:my-3 [&>p>img]:max-w-full [&>p>img]:h-auto [&>p>img]:rounded-lg
        [&>figure]:mx-auto [&>figure]:block [&>figure]:my-3 [&>figure]:text-center [&>figure]:max-w-full
        [&>figure>div]:mx-auto [&>figure>div]:block [&>figure>div]:text-center
        [&>figure>div>img]:mx-auto [&>figure>div>img]:block [&>figure>div>img]:max-w-full [&>figure>div>img]:h-auto [&>figure>div>img]:rounded-lg
        [&>figure>a]:mx-auto [&>figure>a]:block [&>figure>a]:text-center
        [&>figure>a>div]:mx-auto [&>figure>a>div]:block [&>figure>a>div]:text-center
        [&>figure>a>div>img]:mx-auto [&>figure>a>div>img]:block [&>figure>a>div>img]:max-w-full [&>figure>a>div>img]:h-auto [&>figure>a>div>img]:rounded-lg
        [&>h3]:text-[15px] [&>h3]:font-semibold [&>h3]:mb-3 [&>h3]:mt-4 [&>h3]:text-gray-900
        [&>h3>a]:text-blue-600 [&>h3>a]:hover:text-blue-700 [&>h3>a]:no-underline [&>h3>a]:hover:underline
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default SafeHtml;