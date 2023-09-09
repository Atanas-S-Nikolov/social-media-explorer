import '@styles/utils/Button.css';

import { forwardRef, Ref } from "react";

import { ButtonProps } from "@appTypes/ButtonProps";

const Button = forwardRef(({ className, text, startIcon, endIcon, onClick }: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  return (
    <button className={`btn ${className}`} onClick={onClick} ref={ref}>
      {
        startIcon
          ? <span className="btn_icon start_icon">
              {startIcon}
            </span>
          : null
      }
      {text}
      {
        endIcon
          ? <span className="btn_icon end_icon">
              {endIcon}
            </span>
          : null
      }
    </button>
  )
})

Button.displayName = "Button";
export default Button;
