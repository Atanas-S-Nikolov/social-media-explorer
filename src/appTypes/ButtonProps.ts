export interface ButtonProps extends React.ComponentPropsWithRef<any>, React.HTMLProps<HTMLButtonElement> {
  text: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}
