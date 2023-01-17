import React from "react";
import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";

type InputProps = {
  height: string;
  width?: string;
  Icon: IconType;
  placeholder: string;
  [id: string]: any;
};

export const Input = React.forwardRef<InputProps, any>(
  ({ height = "54px", width = "40%", Icon, placeholder, ...props }, ref) => {
    const [focus, setFocus] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const onBodyClick = (e: any) => {
        if (!inputRef.current?.contains(e.target)) {
          setFocus(false);
        }
      };
      document.body.addEventListener("click", onBodyClick);
    }, []);

    return (
      <div
        className={`border bg-[#F8F8F8] flex items-center gap-3 px-4 focus:border-[#DB302B]`}
        style={{
          height,
          width,
          borderColor: focus ? "#DB302B" : "rgb(209,213,219)",
        }}
        ref={inputRef}
      >
        {Icon ? <Icon className="w-6 h-6" /> : null}
        <div className="bg-gray-200 h-1/2 w-[3px] rounded-lg" />
        <input
          className={`grow !outline-none h-full bg-inherit placeholder:font-light ${
            props.type === "date" ? "font-light" : "font-medium"
          } placeholder-[#858585]`}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          {...props}
          required
          ref={ref}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
