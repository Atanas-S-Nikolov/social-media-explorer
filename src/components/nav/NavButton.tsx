import "@styles/nav/NavButton.css";
import { ButtonProps } from "@appTypes/ButtonProps";

export default function NavButton({ text, startIcon, endIcon, onClick }: ButtonProps) {
  return (
    <button className="nav_btn" onClick={onClick}>
      <span className="btn_icon start_icon">
        {startIcon}
      </span>
      {text}
      <span className="btn_icon end_icon">
        {endIcon}
      </span>
    </button>
  );
}
