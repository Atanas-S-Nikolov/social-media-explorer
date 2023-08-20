import '@styles/utils/IconButton.css';
import { IconButtonProps } from "@appTypes/IconButtonProps";

export default function IconButton({ className, icon, variant = 'square', onClick }: IconButtonProps) {
  const btnStyle = variant === 'circle' ? { borderRadius: '100%' } : { borderRadius: 0 }; 

  return (
    <button
      className={`icon_btn ${className}`}
      onClick={onClick}
      style={btnStyle}
    >
      {icon}
    </button>
  );
}
