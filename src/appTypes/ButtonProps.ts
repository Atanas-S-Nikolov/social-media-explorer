export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}
