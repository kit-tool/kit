import * as React from "react";
import { IconProps } from "./types";

export const LogoIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, forwardedRef) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18.86849069595337"
        height="17.221290588378906"
        viewBox="0 0 18.86849069595337 17.221290588378906"
        fill="none"
        {...props}
        ref={forwardedRef}
      >
        <rect
          x="5.9084601402282715"
          y="0"
          width="19.36846012991337"
          height="1.6842141158604298"
          transform="rotate(47.99999615330307 5.9084601402282715 0)"
          rx="0.8421070579302149"
          fill={color}
        ></rect>
        <rect
          x="3.7863545417785645"
          y="5.734718322753906"
          width="12.415297208961658"
          height="1.684215533295608"
          transform="rotate(47.99999640606831 3.7863545417785645 5.734718322753906)"
          rx="0.842107766647804"
          fill={color}
        ></rect>
        <rect
          x="1.2516164779663086"
          y="11.71368408203125"
          width="5.894741925810641"
          height="1.68421624201356"
          transform="rotate(47.99999768015133 1.2516164779663086 11.71368408203125)"
          rx="0.84210812100678"
          fill={color}
        ></rect>
      </svg>
    );
  }
);

export default LogoIcon;
