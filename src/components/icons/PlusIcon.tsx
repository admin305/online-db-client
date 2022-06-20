import React from "react";

const PlusIcon = ({
  width = 24,
  height = 24,
  fill = "#545454",
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 12H4M12 20V12V20ZM12 12V4V12ZM12 12H20H12Z"
      stroke={fill}
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

export default PlusIcon;
