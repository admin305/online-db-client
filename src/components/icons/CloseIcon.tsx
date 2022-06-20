import React from 'react';

const CloseIcon = ({
  width = 24,
  height = 24,
  fill = '#545454',
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.75 7.34375L17.6563 6.25L12.5 11.4063L7.34375 6.25L6.25 7.34375L11.4063 12.5L6.25 17.6563L7.34375 18.75L12.5 13.5937L17.6563 18.75L18.75 17.6563L13.5937 12.5L18.75 7.34375Z"
        fill={fill}
      />
    </svg>
  );
};

export default CloseIcon;
