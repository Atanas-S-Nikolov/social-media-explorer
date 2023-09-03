import '@styles/utils/Button.css';
import { ButtonProps } from "@appTypes/ButtonProps";

export default function Button({ className, text, startIcon, endIcon, onClick }: ButtonProps) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
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
}
