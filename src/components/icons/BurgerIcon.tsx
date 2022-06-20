import React from "react";

const BurgerIcon = ({
  width = 48,
  height = 48,
  stroke = "#545454",
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.95 35.95H39.95M7.95 11.95H39.95H7.95ZM7.95 23.95H39.95H7.95Z"
      stroke={stroke}
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default BurgerIcon;
